require('dotenv').config();
const express = require('express');
const helmet = require('helmet'); 
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const { errorMiddleware, notFound } = require('./middleware/errorMiddleware'); 

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');


connectDB();


const app = express();


app.use(helmet()); 
app.use(express.json()); 
app.use(cors()); 


app.get('/', (req, res) => {
  res.json({ message: 'Portfolio & Blog API is running!' });
});


app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogPostRoutes); 
app.use('/api/blog', commentRoutes);
app.use('/api/contact', messageRoutes);
app.use(notFound); 
app.use(errorMiddleware); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});