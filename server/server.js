import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/user.routes.js';
import ownerRouter from './routes/owner.routes.js';
import bookingRouter from './routes/booking.routes.js';


// Intialise the express app
const app = express();

// Connecting to the database
await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('Server is running')
})

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/booking',bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})