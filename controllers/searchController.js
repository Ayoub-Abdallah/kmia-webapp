const Student = require('../models/student');
const Group = require('../models/group');
const XLSX = require('xlsx');
const fs = require('fs');
const Teacher = require('../models/teacher');

exports.searchStudent = async (req, res) => {
  try {
    const { query, category } = req.query;
    let studentsArray = [];

    switch (category) {
      case "name":
        studentsArray = await Student.find({
          $or: [
            { firstname: query },
            { lastname: query }
          ]
        });
        break;
        
      case "group":
        try {
          const group = await Group.findOne({ name: query });
          
          if (!group) {
            return res.status(404).send('Group not found');
          }
          
          studentsArray = await Student.find({ group: group._id.toString() });
        } catch (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        break;
        
      case "phone":
        try {
          studentsArray = await Student.find({ phone: query });
        } catch (error) {
          console.error(error);
          return res.status(500).send('Server error');
        }
        break;
        
      default:
        console.log("The default in switch case of student search");
        return res.status(400).send('Invalid search category');
    }

    let students = await Promise.all(studentsArray.map(async (student) => {
      let groups = await Group.find({ _id: student.group });
      return { student, groups };
    }));

    console.log("searched students: ")
    console.log(students)
    // res.render("students", { students });
    res.json(students);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



///////////////////////////////////////////////////////////////////////



exports.searchTeacher = async (req, res) => {
  try {
    const { query, category } = req.query;
    let studentsArray = [];

    switch (category) {
      case "name":
        studentsArray = await Teacher.find({
          $or: [
            { firstname: query },
            { lastname: query }
          ]
        });
        console.log("studentsArray")
        console.log(studentsArray)
        break;
        
      case "group":
        try {
          const group = await Group.findOne({ name: query });
          
          if (!group) {
            return res.status(404).send('Group not found');
          }
          
          studentsArray = await Teacher.find({ group: group._id.toString() });
        } catch (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        break;
        
      case "phone":
        try {
          studentsArray = await Teacher.find({ phone: query });
        } catch (error) {
          console.error(error);
          return res.status(500).send('Server error');
        }
        break;
        
      default:
        console.log("The default in switch case of student search");
        return res.status(400).send('Invalid search category');
    }

    // let students = await Promise.all(studentsArray.map(async (student) => {
    //   let groups = await Group.find({ _id: student.group });
    //   return { student, groups };
    // }));

    console.log("searched students: ")
    console.log(studentsArray)
    const students = studentsArray
    // res.render("students", { students });
    res.json( students );


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