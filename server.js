// Used to start the site server
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const serveStatic = require('serve-static');
const RedirectService = require('./shared/RedirectService');

app = express();
app.use(cookieParser());

// Token cookie control
app.get('/', function (req, res, next) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);
  const tokenCookie = req.cookies.token;
  console.log(typeof tokenCookie);
  if (typeof tokenCookie === 'string' && tokenCookie !== '') {
    const rs = new RedirectService();
    const url = rs.getUrl('CLIENT_APP', { key: 'token', value: tokenCookie });
    console.info(`Redirecting to ${url}`);
    if (url !== '') {
      res.redirect(url);
      return;
    }
  }
  next();
  return;
});

// 
app.use("/", serveStatic(path.join(__dirname, '/dist')))
// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})

const port = process.env.PORT || 5000;

app.listen(port);
console.log('server started ' + port);