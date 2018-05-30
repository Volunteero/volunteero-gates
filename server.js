// Used to start the site server
const express = require('express');
var cookieParser = require('cookie-parser')
const path = require('path');
const serveStatic = require('serve-static');

app = express();
app.use(cookieParser());
app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
});
app.use("/", serveStatic(path.join(__dirname, '/dist')))
// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 5000;

app.listen(port);
console.log('server started ' + port);