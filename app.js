const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const { ensureAuthenticated, ensureRole } = require('./authMiddleware'); // Adjust the path as necessary


app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB

const DB_LINK = "mongodb+srv://admin:B7aK8Xynkmob1nbu@cluster0.vcvjrbg.mongodb.net/MY1DB?retryWrites=true&w=majority&appName=Cluster0"

const LOCAL_LINK = 'mongodb://127.0.0.1:27017/MassinissaAcademy'

mongoose.connect(LOCAL_LINK).
    then(() => {
        console.log("connected to database Massinissa Academy");
})


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'abcd',
  resave: false,
  saveUninitialized: false, // Important to set this to false
  cookie: { secure: false, httpOnly: true } // Set secure to true in production
}));
// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes');
const adminRoutes = require('./routes/admins');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const courseRoutes = require('./routes/courses');
const paymentRoutes = require('./routes/payments');
const inscriptionRoutes = require('./routes/inscriptions');
const billRoutes = require('./routes/bills');
// const authRoutes = require('./routes/auth');
const groupsRoutes = require('./routes/groups');
const classroomsRoutes = require('./routes/classes');

const financeRoutes = require('./routes/finance');
const attendanceRoutes = require('./routes/attendance');
const settingsRoutes = require('./routes/settings');
const loginRoutes = require('./routes/login');
const searchRoutes = require('./routes/search');


// app.use('/', indexRoutes);
app.use('/admin',ensureAuthenticated, ensureRole(['superadmin', "admin"]), indexRoutes);
app.use('/admins',ensureAuthenticated, ensureRole(['superadmin']), adminRoutes);
app.use('/students',ensureAuthenticated, ensureRole(['superadmin', "admin"]), studentRoutes);
app.use('/teachers',ensureAuthenticated, ensureRole(['superadmin', "admin"]), teacherRoutes);
app.use('/groups',ensureAuthenticated, ensureRole(['superadmin', "admin"]), groupsRoutes);
app.use('/classrooms', ensureAuthenticated, ensureRole(["superadmin", "admin"]), classroomsRoutes);
app.use('/finance',ensureAuthenticated, ensureRole(['superadmin']), financeRoutes);
app.use('/attendance', ensureAuthenticated, ensureRole(['superadmin', "admin"]), attendanceRoutes);
app.use('/settings',ensureAuthenticated, ensureRole(['superadmin', "admin"]), settingsRoutes);
app.use('/login', loginRoutes);
app.use('/login/logout', loginRoutes);
app.use('/search', searchRoutes);

/////////////////////////////////////////////////////////

app.use('/courses',  courseRoutes);
app.use('/payments', paymentRoutes);
app.use('/inscriptions', inscriptionRoutes);
app.use('/bills', billRoutes);
// app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)})