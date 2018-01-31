const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const login = require('./routes/login');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');
const upload = require('./routes/upload');
const logout = require('./routes/logout');

const publicPath = path.join(__dirname, '../public');
const app = express();

app.use(express.static(publicPath));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.message = req.flash('message');
  res.locals.login = req.flash('login');
  res.locals.logout = req.flash('logout');
  next();
});

app.use('/login', login);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/logout', logout);
app.use('/upload', upload);

app.get('/about', (req, res) => {
  res.send('This is from about.');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});