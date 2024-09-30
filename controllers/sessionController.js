const Group = require("../models/group");

exports.getSessions = async (req, res) => {
    try {
      const _id = req.params.id
      const groups = await Group.find();
      console.log(groups)
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };