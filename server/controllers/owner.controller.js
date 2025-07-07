import imagekit from "../configs/imagekit.js";
import { User } from "../models/user.model.js";
import { Car } from "../models/car.model.js";
import fs from 'fs';
import Booking from "../models/booking.model.js";
import { raw } from "express";

// API to change role of user
export const changeRoleToOwner = async(req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id,{role: "owner"})
        return res.status(200).json({success: true,message: 'Now you can list cars'})
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({success: false,message: error.message})
    }
}

// API to list car
export const addCar = async(req,res)=>{
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file;
        
        // Upload Image to Imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // Optimise though imagekit URL Transformation
        var optimizedImageURL = imagekit.url({
        path :response.filePath,
        transformation : [
            {width : '1280'}, // width resising
            {quality: 'auto'}, // Auto Compression
            {format: 'webp'} // Convert to modern format
        ]});

        const image = optimizedImageURL;
        await Car.create({...car, owner: _id, image})
        
        return res.status(200).json({success: true, message: "Car Added"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success: false,message: error.message})
    }
}

//API to list owner car
export const getOwnerCars = async (req,res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})

        return res.status(200).json({success: true,cars})
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success: false,message: error.message})
    }
}

//API to toggle car availablity
export const toogleCarAvailablity = async (req,res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body

        const car = await Car.findById(carId)

        // Checking if the car belongs to the user or not
        if(car.owner.toString() !== _id.toString()){
            return res.status(400).json({success: false, message: "Unauthorized request"});
        }

        car.isAvailable = !car.isAvailable
        await car.save()

        return res.status(200).json({success: true, message:"Availablity toggled"})

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success: false,message: error.message})
    }
}


// API to delete a car
export const deleteCar = async(req,res) =>{
    try {
        const {_id} = req.user;
        const {carId} = req.body

        const car = await Car.findById(carId)

        // Checking if the car belongs to the user or not
        if(car.owner.toString() !== _id.toString()){
            return res.status(400).json(c);
        }

        car.owner = null;
        car.isAvailable = false;

        await car.save()

        return res.status(200).json({success: true, message:"Car Removed"})


    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success: false,message: error.message})
    }
}

// API to get Dashboard Data 
export const getDashboardData = async (req,res) => {
    try{
        const{_id, role} = req.user;

        if(role != 'owner'){
            return res.status(400).json({success: false, message: "Unauthorized request"})
        }
        
        const cars = await Car.find({owner: _id})

        const bookings = await Booking.find({owner: _id}).populate('car').sort({ createdAt: -1 });

        const pendingBooking = await Booking.find({owner: _id, status: "pending"})
        const completedBooking = await Booking.find({owner: _id, status: "confirmed"})
        

        //Calculate monthly reveneue
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc,booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars: cars.length,
            totalBooking: bookings.length,
            pendingBooking: pendingBooking.length,
            completedBooking: completedBooking.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }

        return res.status(200).json({success: true,dashboardData})

    }catch(error){
        console.log(error.message)
        return res.status(400).json({success: false,message: error.message})
    }
}

//API to update user image
export const updateUserImage = async (req,res) => {
    try {
        const {_id} = req.user;
        
        const imageFile = req.file;
        
        // Upload Image to Imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // Optimise though imagekit URL Transformation
        var optimizedImageURL = imagekit.url({
        path :response.filePath,
        transformation : [
            {width : '1280'}, // width resising
            {quality: 'auto'}, // Auto Compression
            {format: 'webp'} // Convert to modern format
        ]});

        const image = optimizedImageURL;

        await User.findByIdAndUpdate(_id,{image});

        res.status(200).json({success: true, message: "Image Updated"})

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success: false,message: error.message}) 
    }
}