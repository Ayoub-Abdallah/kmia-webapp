const Admin = require('../models/admin');
const bcrypt = require('bcrypt'); 

// Show login page
exports.getLogin = (req, res) => {
  res.render('login');
};

// Handle login

exports.handleLogin = async (req, res) => {
  try {
    const { firstname, password } = req.body;

    // Find the user in the database
    const user = await Admin.findOne({ firstname: firstname });

    if (user) {
      // Compare the hashed password
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Store user session
        req.session.user = { username: user.firstname, roles: user.roles, _id: user._id };
        console.log("Successfully logged in");

        // Redirect to the admin page upon successful login
        res.json({ msg: "success" });
      } else {
        console.log("Invalid password");
        res.status(401).json({ msg: "Invalid username or password" });
      }
    } else {
      console.log("User not found");
      res.status(401).json({ msg: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).send("Error logging in");
  }
}


// Handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
