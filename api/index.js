import express from "express";
import connectDB from "../config/db.js"

import authRoutes from '../routes/user.route.js'
import bookRoutes from "../routes/book.route.js"
import orderRoutes from "../routes/order.route.js"
import aiRoutes from "../routes/ai.route.js"

const app = express();

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {
    res.send("Bookstore api is running!");
});

app.use('/api/auth', authRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/ai', aiRoutes)


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
