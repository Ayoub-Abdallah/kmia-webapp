const bcrypt = require('bcrypt');
const Admin = require('../models/admin')

// Example controller functions
exports.renderAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    console.log(admins)
    res.render('admins', { admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAdminById = async (req, res) => {
  try {
    const _id = req.params.id
    const admins = await Admin.find({_id});
    console.log(admins)
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createadmin = async (req, res) => {
  try {
    let adminData = req.body;

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ firstname: adminData.firstname });
    if (existingAdmin) {
      return res.status(400).json({ msg: 'Admin user already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10); // 10 is the salt rounds
    adminData.password = hashedPassword;

    const admin = new Admin(adminData);
    await admin.save();

    console.log('Admin created successfully:', admin);
    res.status(200).json({status: true, message: "Admin créé avec succès"})
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ msg: 'Error creating admin' });
  }
};

exports.editadmin = async (req, res) => {
  try {
    let studentData = req.body
    let _id = req.params.id
    
    const updatedadmin = await Admin.findByIdAndUpdate(_id, req.body, {new: true})
    console.log("updated admin ")
    console.log(updatedadmin )
    res.status(200).json({status: true, message: "Admin modifié avec succès"})
    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error updateing admin:', error);
  }
};

exports.deleteadmin = async (req, res) => {
  try {
    let _id = req.params.id
    const deletedUser = await Admin.findByIdAndDelete(_id);
    res.status(200).json({status: true, message: "Admin supprimé avec succès"})
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
