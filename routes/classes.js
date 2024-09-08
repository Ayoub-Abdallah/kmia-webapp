const express = require('express');
const router = express.Router();
const ClassroomController = require('../controllers/classroomController');
const authMiddleware = require('../authMiddleware');

// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);

router.get('/', ClassroomController.renderAllClassrooms);

router.post('/add-classroom', ClassroomController.createClassroom);
router.get('/:id', ClassroomController.getClassById);
router.post('/edit/:id', ClassroomController.editClass);
router.delete('/:id', ClassroomController.deleteClass);

// router.get('/', studentController.getAllStudents); 
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
