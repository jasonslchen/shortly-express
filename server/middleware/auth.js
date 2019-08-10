const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // req.cookies req.cookies.username
  // console.log(!!req.cookies);
//  if(Object.keys(req.cookies).length === 0) {
  // console.log('in', req.cookies.username);
  models.Sessions.create()
    .then((session) => {
      // console.log('is there any session?', session.insertId);
      req.session = session;
      models.Sessions.get({id: session.insertId})
        .then((sesh) => {
          req.session.hash = sesh.hash;
          res.cookies.shortlyid = {value: sesh.hash};
        })
        .then(() => {
          next();
        });
    })
    .catch(() => {
      console.log(':( ');
    });
  //  }

  // .then(())

  // .then(() => {
  //   next();
  // })

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

