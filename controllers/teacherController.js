const Teacher = require('../models/teacher');
const Group = require('../models/group');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');


// Example controller functions
exports.renderAllTeachers = async (req, res) => {
  try {
    let teachersArray = await Teacher.find();
    let teachers = await Promise.all(teachersArray.map(async (teacher) => {
      let groups = await Group.find({_id: teacher.group});
      return { teacher, groups };
    }));
    // res.json(students);
    console.log(teachers)
    res.render( "teachers", {teachers} )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // try {
  //   const teachers = await Teacher.find();
  //   console.log(teachers)
  //   res.render('teachers', { teachers });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};
exports.getTeacherById = async (req, res) => {
  try {
    const _id = req.params.id
    const teachers = await Teacher.find({_id});
    console.log(teachers)
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createTeacher = async (req, res) => {
  try {
    let teacherData = req.body
    const teacher = new Teacher(teacherData);
    await teacher.save();
    // console.log('Teacher created successfully:', teacher);
    res.json({status: true, message: "L'enseignant enregistrée avec succès"})

  } catch (error) {
    console.error('Error creating teacher:', error);
  }
};
exports.editTeacher = async (req, res) => {
  try {
    let studentData = req.body
    let _id = req.params.id
    
    const updatedTeacher = await Teacher.findByIdAndUpdate(_id, req.body, {new: true})
    console.log("updated teacher ")
    console.log(updatedTeacher )
    // res.json({ state: true, msg: "alright" })
    res.json({status: true, message: "L'enseignant modifié avec succès"})

    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error updateing teacher:', error);
  }
};


// exports.addPaymentTeacher = async (req, res) => {

//   try {
//     let teacherData = req.body
    
//     const teacher = await Teacher.findById(teacherData._id)
//     teacher.salary.push({date : req.body.date , amount : req.body.amount })
//     teacher.save()

//     // res.json({ state: true, msg: "alright" })
//     res.status(200).json({status: true, message: "Paiement de l'enseignant enregistré avec succès"})

//     // console.log('Student created successfully:', tudent);
//   } catch (error) {
//     console.error('Error updateing teacher:', error);
//   }

// };







const TEMPLATE_PATH = path.resolve(__dirname, '../templates/template.docx');

exports.addPaymentTeacher = async (req, res) => {
  const teacherId = req.body._id;
  const paymentEntry = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ status: false, message: 'Teacher not found' });
    }

    // Add payment details to teacher record
    teacher.salary.push({ date: paymentEntry.date, amount: paymentEntry.amount, groupId: paymentEntry.groupId, paymentType: paymentEntry.payType });
    await teacher.save();

    // Generate MS Word document for payment proof
    const templateContent = fs.readFileSync(TEMPLATE_PATH, 'binary');
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip);

    // Get group name from groupId
    let group = await Group.findById(paymentEntry.groupId);
    if (!group) {
      return res.status(404).json({ status: false, message: 'Group not found' });
    }

    // Fill the template with payment data
    doc.setData({
      serialnumber: new Date().toISOString().slice(0, 19).replace('T', ' '),
      firstname: teacher.firstname,
      lastname: teacher.lastname,
      datetime: paymentEntry.date,
      installmentname: "دفعة أستاذ",
      installmenttype: paymentEntry.payType,
      groupname: group.name,
      installmentvalue: paymentEntry.amount
    });

    try {
      doc.render();
    } catch (error) {
      console.error('Error rendering document:', error);
      return res.status(500).json({ status: false, message: 'Error generating payment proof document.' });
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Send the generated file as a downloadable response
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="payment_proof_${teacherId}.docx"`
    });

    res.send(buffer);

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ status: false, message: 'Error processing payment.' });
  }
};





















































exports.deleteTeacher = async (req, res) => {
  try {
    let _id = req.params.id
    const deletedUser = await Teacher.findByIdAndDelete(_id);
    console.log('Deleted User:', deletedUser);
    res.status(200).json({status: true, message: "Enseignant supprimé avec succès"})

  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


exports.exportXls = async (req, res) => {
  try {
    const rows = await Teacher.find({ _id: { $in: req.body } }).lean(); // Use lean() to get plain JavaScript objects

        if (rows.length === 0) {
            console.log("no rows server")
            return res.status(404).send('No rows found for selected IDs.');
        }
        console.log("rows server")

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'Selected Rows');

        const filePath = './public/selected_rows.xlsx';
        XLSX.writeFile(wb, filePath);

        res.download(filePath, 'selected_rows.xlsx', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error exporting data.');
            }
            fs.unlinkSync(filePath); // Delete the temporary file after download
        });


  } catch (error) {
    console.error('Error creating Teacher:', error);
  }
};

exports.getTeacherWithGroupsById = async (req, res) => {
  try {
    // console.log()
    let teacher = await Teacher.findById(req.params.id);
    let groups = await Group.find({_id: teacher.group});
    res.json({teacher, groups} );
    // res.render( "students", {studet, groups} )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};