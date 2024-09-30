const Student = require('../models/student');
const Group = require('../models/group');
const XLSX = require('xlsx');
const fs = require('fs');
const Teacher = require('../models/teacher');

exports.searchStudent = async (req, res) => {
  try {
    const { query, category } = req.query;
    let studentsArray = [];

    const regexQuery = new RegExp(query, 'i'); // Create a case-insensitive regex for partial matching

    switch (category) {
      case "name":
        studentsArray = await Student.find({
          $or: [
            { firstname: regexQuery },
            { lastname: regexQuery }
          ]
        });
        break;
        
      case "group":
        try {
          const group = await Group.find({ name: regexQuery });
          console.log("founded group: " + regexQuery)
          console.log(group)

          if (!group) {
            return res.status(404).send('Group not found');
          }
          const groupIds = group.map(group => group._id);

          // Find students whose group array contains any of the group IDs
          studentsArray = await Student.find({ group: { $in: groupIds } });
        } catch (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        break;
        
      case "phone":
        try {
          studentsArray = await Student.find({ phone: regexQuery });
        } catch (error) {
          console.error(error);
          return res.status(500).send('Server error');
        }
        break;
        
      default:
        console.log("The default in switch case of student search");
        return res.status(400).send('Invalid search category');
    }

    // Fetch group details for each student
    let students = await Promise.all(studentsArray.map(async (student) => {
      let groups = await Group.find({ _id: student.group });
      return { student, groups };
    }));

    console.log("searched students: ");
    console.log(students);
    // Return the results as JSON
    res.json(students);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////////////////////////////////////////////////


exports.searchTeacher = async (req, res) => {
  try {
    const { query, category } = req.query;
    let teachersArray = [];

    // Create a case-insensitive regex for partial matching
    const regexQuery = new RegExp(query, 'i');

    switch (category) {
      case "name":
        teachersArray = await Teacher.find({
          $or: [
            { firstname: regexQuery },
            { lastname: regexQuery }
          ]
        });
        break;
        
      case "group":
        try {
          // Find groups that match the query
          const groups = await Group.find({ name: regexQuery });

          if (groups.length === 0) {
            return res.status(404).send('No groups found');
          }

          // Extract group IDs from the found groups
          const groupIds = groups.map(group => group._id);

          // Find teachers whose group array contains any of the group IDs
          teachersArray = await Teacher.find({ group: { $in: groupIds } });
        } catch (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        break;
        
      case "phone":
        try {
          teachersArray = await Teacher.find({ phone: regexQuery });
        } catch (error) {
          console.error(error);
          return res.status(500).send('Server error');
        }
        break;
        
      default:
        console.log("The default in switch case of teacher search");
        return res.status(400).send('Invalid search category');
    }
    let teachers = await Promise.all(teachersArray.map(async (teacher) => {
      let groups = await Group.find({ _id: teacher.group });
      return { teacher, groups };
    }));

    console.log("searched teachers: ");
    console.log(teachers);
    res.json(teachers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Example controller functions
// exports.searchStudent = async (req, res) => {
//   try {
//     const {query, category} = req.query

//     switch (category) {
//         case "name":
//             const students = await Student.find({
//                 $or: [
//                   { firstname: query },
//                   { lastname: query }
//                 ]
//               });
//             // res.json(students);
//           res.render( "students", {students} )

//           break;
//         case "group":
//             try {
//                 // Find the group by name to get the ID
//                 const group = await Group.find({ name: query });
//                 // console.log("grouppp")
//                 console.log(group)
            
//                 if (!group) {
//                   return res.status(404).send('Group not found');
//                 }
            
//                 // Find students signed up to this group by group ID
//                 const students = await Student.find({ group: group._id.toString() });
            
//                 // res.json(students);
//     res.render( "students", {students} )

//               } catch (err) {
//                 console.error(err);
//                 res.status(500).send('Server error');
//               }
//           break;
//         case "phone":
//             try {
//                 const students = await Student.find({phone: query});
//                 // res.json(students);
//     res.render( "students", {students} )

//             } catch (error) {
                
//             }
           
//           break;
//         // Add more cases as needed
//         default:
//           console.log("The default in switch case of student search");
//           // Code to execute if expression doesn't match any case
//       }
   
    
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };