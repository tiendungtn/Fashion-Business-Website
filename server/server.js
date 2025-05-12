const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // Middleware ghi log HTTP request
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes'); 

dotenv.config(); // Load .env file

connectDB(); 

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Log request ở chế độ dev
}
app.use(cors()); // Cho phép request từ domain khác (React frontend)
app.use(express.json()); // Cho phép đọc req.body dạng JSON
app.use(express.urlencoded({ extended: true })); // Cho phép đọc req.body dạng form data

// Mount Routes
app.get('/', (req, res) => { // Route test
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes); 

// Error Handling Middlewares (phải đặt sau cùng)
app.use(notFound); // Bắt lỗi 404
app.use(errorHandler); // Bắt các lỗi khác

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});