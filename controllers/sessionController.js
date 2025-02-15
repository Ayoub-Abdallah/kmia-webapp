const Group = require("../models/group");
const Sessions = require("../models/Sessions");

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

exports.createSession = async (req, res) => {
  console.log("createSession")
    try{
      const session = new Sessions(req.body);
      await session.save();
      res.status(201).json(session);
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  };

  exports.getWeekly = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);

        const sessions = await Sessions.find({
            startDate: { $lte: endDate },
            $expr: {
                $lt: [
                    { $dateDiff: { startDate: "$startDate", endDate: endDate, unit: "month" } },
                    "$months"
                ]
            }
        }).exec();

        res.json(sessions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// exports.getWeekly = async (req, res) => {
//   try {
//     // Calculate current week dates
//     const startOfWeek = new Date();
//     startOfWeek.setHours(0, 0, 0, 0);
//     startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
//     console.log("startOfWeek")
//     console.log(startOfWeek)
//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(endOfWeek.getDate() + 7);
//     console.log("endOfWeek")
//     console.log(endOfWeek)
//     // Fetch sessions within this date range
//     const sessions = await Sessions.find({
//         startDate: {
//             $gte: startOfWeek,
//             $lt: endOfWeek
//         }
//     }).exec();
//     console.log("weekly sessions")
//     console.log(sessions)
//     res.json(sessions);
// } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
// }
// }
