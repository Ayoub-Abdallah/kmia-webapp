const Group = require('../models/group');

// Example controller functions
exports.RenderAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.render("groups", {groups});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    let groupData = req.body
    const group = new Group(groupData);
    await group.save();
    console.log('group created successfully:', group);
    res.status(200).json({status: true, message: "Groupe enregistré avec succès"})

  } catch (error) {
    console.error('Error creating group:', error);
  }
};
exports.getGroupById = async (req, res) => {
  try {
    const _id = req.params.id
    const groups = await Group.find({_id});
    console.log(groups)
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllGroups = async (req, res) => {
  try {
    // const _id = req.params.id
    const groups = await Group.find();
    console.log(groups)
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editGroup = async (req, res) => {
  try {

    let _id = req.params.id
    
    const updatedGroup = await Group.findByIdAndUpdate(_id, req.body, {new: true})
    console.log("updated teacher ")
    console.log(updatedGroup)
    // res.json({ state: true, msg: "alright" })
    res.status(200).json({status: true, message: "Groupe modifié avec succès"})

    // console.log('Student created successfully:', tudent);
  } catch (error) {
    console.error('Error updateing teacher:', error);
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    let _id = req.params.id
    const deletedGroup = await Group.findByIdAndDelete(_id);
    console.log('Deleted User:', deletedGroup);
    res.status(200).json({status: true, message: "Groupe supprimé avec succès"})
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};