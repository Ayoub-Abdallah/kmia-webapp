const Student = require('../models/student');
const Group = require('../models/group');
const XLSX = require('xlsx');
const fs = require('fs');

const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// Example controller functions
exports.renderAllStudents = async (req, res) => {
  try {
    let studentsArray = await Student.find();
    let students = await Promise.all(studentsArray.map(async (student) => {
      let groups = await Group.find({_id: student.group});
      return { student, groups };
    }));
    // res.json(students);
    console.log(students)
    res.render( "students", {students} )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const _id = req.params.id
    const students = await Student.find({_id});
    console.log(students)
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    let studentData = req.body
    const student = new Student(studentData);
    await student.save();
    res.status(200).json({status: true, message: "Étudiant créé avec succès"})
    // console.log('Student created successfully:', student);
  } catch (error) {
    console.error('Error creating student:', error);
  }
};
exports.editStudent = async (req, res) => {
  try {
    let studentData = req.body
    let _id = req.params.id
    
    const updatedStudent = await Student.findByIdAndUpdate(_id, req.body, {new: true})
    console.log("updated student ")
    console.log(updatedStudent )
    res.status(200).json({status: true, message: "Étudiant modifié avec succès"})

    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error creating student:', error);
  }
};
exports.inscription = async (req, res) => {
  try {
    let _id = req.params.id
    const insStudent = await Student.findById(_id)
    insStudent.inscription = true
    insStudent.save()
    res.status(200).json({status: true, message: "Inscription enregistré avec succès"})
    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error creating student:', error);
  }
};
exports.uninscription = async (req, res) => {
  try {
    let _id = req.params.id
    const insStudent = await Student.findById(_id)
    insStudent.inscription = false
    insStudent.save()
    res.status(200).json({status: true, message: "Inscription supprimé avec succès"})
    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error creating student:', error);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    let _id = req.params.id
    const deletedUser = await Student.findByIdAndDelete(_id);
    // console.log('Deleted User:', deletedUser);
    res.status(200).json({status: true, message: "Étudiant supprimé avec succès"})

  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


exports.exportXls = async (req, res) => {
  try {
    const rows = await Student.find({ _id: { $in: req.body } }).lean(); // Use lean() to get plain JavaScript objects

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
    console.error('Error creating student:', error);
  }
};

exports.getStudentWithGroupsById = async (req, res) => {
  try {
    // console.log()
    let student = await Student.findById(req.params.id);
    let groups = await Group.find({_id: student.group});
    res.json({student, groups} );
    // res.render( "students", {studet, groups} )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPresence = async (req, res) => {
  let studentId = req.body._id
  // res.json({status: true, message: "Présence de l'étudiant enregistrée avec succès"})
  let presenceEntry = req.body.presenceData
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    student.presence.push(presenceEntry);
    await student.save();
    // return student;
    res.json({status: true, message: "Présence de l'étudiant enregistrée avec succès"})

  } catch (error) {
    throw error;
  }
};










var sn = 0

const TEMPLATE_PATH = path.resolve(__dirname, '../templates/template.docx');
exports.addPayment = async (req, res) => {
  const studentId = req.body._id;
  const paymentEntry = req.body.paymentData;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ status: false, message: 'Student not found' });
    }

    let paymentExists = false;
    let existingPayment = {};

    // Check if the student has an existing payment group (for partial payments)
    student.payment.forEach((payment) => {
      if (payment.groupId === paymentEntry.groupId) {
        paymentExists = true;
        existingPayment = payment;
      }
    });

    // If the payment group exists, add the new payment
    if (paymentExists) {
      existingPayment.payed.push({ date: paymentEntry.date, value: paymentEntry.value });
    } else {
      // Otherwise, add a new payment group
      const { groupId, date, value, total } = paymentEntry;
      student.payment.push({
        groupId,
        total,
        payed: [{ date, value }]
      });
    }

    await student.save();

    // Generate MS Word document for proof of all payments (dynamic)
    // const templatePath = TEMPLATE_PATH;
    const templateContent = fs.readFileSync(TEMPLATE_PATH, 'binary');
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip);

    // Set the student data and their payment history
    const paymentsData = student.payment.map(payment => ({
      groupId: payment.groupId,
      total: payment.total,
      payed: payment.payed.map(p => `Date: ${p.date}, Value: ${p.value} DA`).join('\n')
    }));

    // Fill the template with dynamic data
    const now = new Date();
    console.log("the student is: ")
    console.log(student)
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    // let groups = await Group.find({_id: student.group});
    let group = await Group.findById(paymentEntry.groupId);
    sn = sn + 1
    doc.setData({
      serialnumber: sn,
      firstname: student.firstname,
      lastname: student.lastname,
      datetime: paymentEntry.date,
      installmentname: "دفعة طالب",
      installmenttype: "دفعة بالتقسيط",
      groupname: group.name,
      installmentvalue: paymentEntry.value
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
      'Content-Disposition': `attachment; filename="payment_proof_${studentId}.docx"`
    });

    res.send(buffer);

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ status: false, message: 'Error processing payment.' });
  }
};












/*
exports.addPayment = async (req, res) => {
  let studentId = req.body._id
  let paymentEntry = req.body.paymentData
  console.log(studentId)
  console.log(paymentEntry)
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    let exist = false
    e = {}
    await Promise.all(student.payment.map(async element => {
      if(element.groupId == paymentEntry.groupId){
        exist = true
        e = element
      }
    }))
    if(exist){
      e.payed.push({date: paymentEntry.date, value: paymentEntry.value})
      await student.save()
      // res.json(student);
    res.status(200).json({status: true, message: "Paiement de l'étudiant enregistré avec succès"})
      

      return
    }
    console.log(student)
    const { groupId,date, value,total } = paymentEntry
    student.payment.push({
      groupId,
      total,
      payed: [{
        date, value
      }]
    });
    await student.save();
    // res.json(student);
    res.status(200).json({status: true, message: "Paiement de l'étudiant enregistré avec succès"})

  } catch (error) {
    throw error;
  }
};
*/
