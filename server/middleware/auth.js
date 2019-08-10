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
          console.log("the sesh",sesh);
          req.session.hash = sesh.hash;
          res.cookies.shortlyid = {value: sesh.hash};
          return req;
        })
        .then((request) => {
          console.log('req', !!request.session.cookies);
            if (!request.session.cookies) {

            } else {
              console.log('hash', request.session.cookies.shortlyid.value);
              models.Sessions.get({hash: request.session.cookies.shortlyid.value})
              .then((session) => {
                console.log('session1', session);
              })

            }


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

