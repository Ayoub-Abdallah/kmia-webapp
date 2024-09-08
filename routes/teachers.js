const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../authMiddleware');

// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);

router.get('/', teacherController.renderAllTeachers);
router.post('/add-teacher', teacherController.createTeacher);
router.post('/export', teacherController.exportXls);
router.get('/groups/:id', teacherController.getTeacherWithGroupsById);
router.get('/:id', teacherController.getTeacherById);
router.post('/edit/:id', teacherController.editTeacher);
router.delete('/:id', teacherController.deleteTeacher);
router.post('/add-payment', teacherController.addPaymentTeacher);


// router.get('/', studentController.getAllStudents); 
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
