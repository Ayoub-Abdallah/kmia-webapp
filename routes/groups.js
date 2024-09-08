const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../authMiddleware');

// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);

router.get('/', groupController.RenderAllGroups);
router.get('/get', groupController.getAllGroups);
router.post('/add-group', groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.post('/edit/:id', groupController.editGroup);
router.delete('/:id', groupController.deleteGroup);


// router.get('/', studentController.getAllStudents); 
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
