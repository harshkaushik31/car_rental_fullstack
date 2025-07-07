import { Car } from "../models/car.model.js";
import Booking from "../models/booking.model.js";

// Function to check avalablity of a Car at any given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
    });

    return bookings.length === 0;
};


// API to check Availablity of Cars for the given Date and location
export const checkAvailabilityOfCar = async(req,res) => {
    try{

        const {location,pickupDate,returnDate} = req.body
        
        // fetch all available cars for a given location
        const cars = await Car.find({
            location,
            isAvailable: true
        })

        // check car availablity for the given date range using promise
        const availableCarsPromise = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id,pickupDate,returnDate)
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromise)
        availableCars = availableCars.filter(car => car.isAvailable === true)

        return res.status(200).json({
            success: true,
            availableCars
        });

    }catch(error){
        console.log(error.message);
        return res.status(400).json({success: false, message: error.message})
    }
} 

// API to create Booking
export const createBooking = async (req, res) => {
    try {
        
        const{_id} = req.user
        const {car, pickupDate, returnDate} = req.body

        const isAvailable = await checkAvailability(car,pickupDate,returnDate);

        if(!isAvailable){
            return res.json({success: false, message: 'Car is Not available'})
        }

        const carData = await Car.findById(car)

        // Calculate price based on pickup date and return date
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))

        const price = carData.pricePerDay * noOfDays;

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})

        res.status(200).json({success: true, message: 'Booking Created'});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({success: false, message: error.message})
    }
}

//API to List user Bookings
export const getUserBookings = async (req, res) => {
    try{

        const { _id } = req.user;

        const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });

        res.status(200).json({ success: true, bookings });

    }catch(error){
        console.log(error.message);
        return res.status(400).json({success: false, message: error.message})
    }
}

// API to get Owner bookings
export const getOwnerBookings = async (req, res) => {
    try{

        if(req.user.role !== 'owner'){
            return res.status(400).json({success: false, message: 'Unauthorized Access'})
        }


        const { _id } = req.user;

        const bookings = await Booking.find({ owner: _id }).populate('car user').select("-user.password").sort({ createdAt: -1 });

        res.status(200).json({ success: true, bookings });

    }catch(error){
        console.log(error.message);
        return res.status(400).json({success: false, message: error.message})
    }
}

// API to change the Booking status
export const changeBookingStatus = async (req, res) => {
    try{

        const { _id } = req.user;

        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.status(400).json({success: false, message: 'Unauthorized Access'})
        }

        booking.status = status;
        await booking.save();

        return res.status(200).json({success: true, message: 'Status Updated'})
        
    }catch(error){
        console.log(error.message);
        return res.status(400).json({success: false, message: error.message})
    }
}