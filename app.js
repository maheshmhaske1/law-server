const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const db = require('./config/database.js');
const userRoutes = require('./routes/user.routes.js');
const generalRoutes = require('./routes/general.routes.js');
const enquiryRoutes = require('./routes/enquiry.routes.js');
const informationRoutes = require('./routes/info.routes.js');
const servicesRoutes = require('./routes/services.routes.js');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const aboutRoutes = require('./routes/about.routes.js');
const courseRoutes = require('./routes/course.routes.js');

// Establishing the Database connection
db.connect();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

// Public
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  '/uploads/thumbnails',
  express.static(__dirname + '/uploads/thumbnails')
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny'));

// Routes
app.use(userRoutes);
app.use('/g', generalRoutes);
app.use('/enquiries', enquiryRoutes);
app.use('/information', informationRoutes);
app.use('/services', servicesRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/about', aboutRoutes);
app.use('/courses', courseRoutes);

module.exports = app;
