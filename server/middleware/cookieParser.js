const parseCookies = (req, res, next) => {

  if (req.headers.cookie){
    let string = JSON.parse(`"${req.headers.cookie}"`);

    let cookieSplitter = string.split(';').map((string) => string.trim().split('=')).forEach((tuple) => {
      req.cookies[tuple[0]] = tuple[1];
    });
  } else {
    req.cookies = {};
  }
  next();

};

//take req.headers.cookie string
//parse


module.exports = parseCookies;