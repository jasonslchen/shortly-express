const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  return models.Sessions.create()
    .then((session) => {
      req.session = session;
      return req.session;
    })
    .then((sessin) => {
      models.Sessions.get({id: sessin.insertId})
        .then((sesh) => {
          // if(Object.keys(req.cookies).length === 0) {
          sessin.hash = sesh.hash;
          res.cookies = {shortlyid: {value: sesh.hash}};
          // }s
        })
        .then(() => {
          if (Object.keys(req.cookies).length !== 0) {
            // console.log('ck', req.cookies)
            models.Sessions.get({hash: req.cookies.shortlyid})
              .then((value) => {
                console.log('val', value);
                if (!req.session.user) {
                  req.session.user = {};
                  if (value.userId !== null) {
                    console.log('user', req.session.user);
                    req.session.userId = value.userId;
                    req.session.user.username = value.user.username;
                  }
                } else {
                  next();
                }
              });
          } else {
            next();
          }
        });
    });
};
//       .catch(() => {
//         console.log('no user id');
//         // next();
//       });
//   }
// })
// .then(() => {
//   next();
// })
// .catch(() => {
//   console.log('err');
//   // next();
// });

// .then(() => {
//   next();
// })
// .catch(() => {
//   next();
// })
//     .catch(() => {
//       console.log('userId not found');
//       next();
//     });
// .catch(() => {
//   console.log(':( ');

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

