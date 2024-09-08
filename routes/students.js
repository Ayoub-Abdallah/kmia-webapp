const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const certificationController = require('../controllers/certificationController');
const authMiddleware = require('../authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);

router.get('/', studentController.renderAllStudents);

router.post('/add-student', studentController.createStudent);
router.post('/export', studentController.exportXls);
router.get('/:id', studentController.getStudentById);
router.post('/edit/:id', studentController.editStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/groups/:id', studentController.getStudentWithGroupsById);
router.post('/presence', studentController.addPresence);
router.post('/payment', studentController.addPayment);
router.post('/inscription/:id', studentController.inscription);
router.post('/uninscription/:id', studentController.uninscription);
router.post('/upload-template', upload.single('template'), certificationController.certification);


// router.get('/', studentController.getAllStudents); 
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
