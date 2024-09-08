// authMiddleware.js

const Admin = require('./models/admin'); // Adjust the path as necessary

// Middleware for ensuring authentication
const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// Middleware for checking user roles
const ensureRole = (roles) => {
  return async (req, res, next) => {
    if (req.session.user) {
      try {
        const admin = await Admin.findById(req.session.user._id);
        console.log("admin:")
        console.log(admin)
        console.log("roles")
        console.log(admin.roles)
        console.log("needed roles: ")
        console.log(roles)
        if (!admin) {
          return res.status(403).send('Forbidden');
        }
        if (roles.includes(admin.roles)) { //
          return next();
        } else {
          return res.status(403).send('Forbidden');
        }
      } catch (error) {
        return res.status(500).send('Internal Server Error');
      }
    } else {
      res.redirect('/login');
    }
  };
};

module.exports = { ensureAuthenticated, ensureRole };
