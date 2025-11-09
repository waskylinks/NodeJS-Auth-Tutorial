require('dotenv').config();

const express = require('express');
const app = express();

const connectToDB = require('./Database/database');
connectToDB();

//Middlewares
app.use(express.json());

const authRoutes = require('./Routes/auth-routes');

const homeRoutes = require('./Routes/home-routes');

const adminRoutes = require('./Routes/admin-routes');

const uploadImageRoutes = require('./Routes/image-routes');


app.use('/api/auth', authRoutes);

app.use('/api/home', homeRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/image', uploadImageRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})



