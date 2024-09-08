const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../authMiddleware');

// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);

router.get('/students', searchController.searchStudent);
router.get('/teachers', searchController.searchTeacher);
// router.get('/groups', searchController.searchGroups);
// router.get('/classrooms', searchController.searchClassrooms);
// router.get('/admins', searchController.searchAdmins);



// router.get('/', studentController.getAllStudents); 
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
