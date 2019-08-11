const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create()
      .then((sessionRow) => {
        return models.Sessions.get({id: sessionRow.insertId})
          .then((row) => {
            req.session = {hash: row.hash};
            res.cookies.shortlyid = {value: row.hash};
            next();
          });
      });
  } else {
    req.session = {hash: req.cookies.shortlyid};
    models.Sessions.get({hash: req.cookies.shortlyid})
      .then(({ userId }) => {
        req.session.userId = userId;
        models.Users.get({id: userId})
          .then((user) => {
            if (user) {
              req.session.user = {username: user.username};
            }
            next();
          });
      })
      .catch(() => {
        models.Sessions.create()
          .then((sessionRow) => {
            return models.Sessions.get({id: sessionRow.insertId})
              .then((row) => {
                req.session = {hash: row.hash};
                res.cookies.shortlyid = {value: row.hash};
                next();
              });
          });
      });

  }
};

// };
