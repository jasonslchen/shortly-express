const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  return models.Sessions.create()
    .then((session) => {
      // console.log('is there any session?', session.insertId);
      req.session = session;
      models.Sessions.get({id: session.insertId})
        .then((sesh) => {
          // console.log("the sesh",sesh);
          req.session.hash = sesh.hash;
          res.cookies.shortlyid = {value: sesh.hash};
          // console.log("out", req);
          return req;
        })
        .then((request) => {
          // console.log('big boss', request);
          if (!!request.cookies) {
            // console.log('typeof', (request.cookies.shortlyid))
            // console.log('insertID', request.cookies.shortlyid);
            models.Sessions.get({hash: request.cookies.shortlyid})
            .then((value) => {
              req.session.userId = value.userId;
              req.session.user = {};
              req.session.user.username = value.user.username;
              // console.log('returned', value);
              // console.log('userId', req.session);
              // console.log('user', value.user.username);
              // console.log('user', req.session)
            })
            .then(() => {
              next();
            })

          }
          // models.Sessions.get({id: request.session.insertId})
          // .then((value) => {
          //   console.log('return', value);
          // })
        })
        .then(() => {
          next();
        });
    })
    .catch(() => {
      console.log(':( ');
    });
  //  }
 //have to refactor code
 //put alot if if statements and elses to account for if userid and stuff is there
  // .then(())

  // .then(() => {
  //   next();
  // })

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

