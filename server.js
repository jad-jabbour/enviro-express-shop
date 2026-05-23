require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/dbConn');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();
const PORT = process.env.PORT || 3500;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

app.use(verifyJWT);
app.use('/dashboard', require('./routes/dashboardRoutes'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) return res.render('404', { title: '404 Not Found' });
  if (req.accepts('json')) return res.json({ error: '404 Not Found' });
  res.type('txt').send('404 Not Found');
});

app.use(errorHandler);

async function startServer() {
  if (process.env.USE_MONGO === 'true') {
    await connectDB();
  } else {
    console.log('MongoDB disabled: running with local demo data.');
  }
  app.listen(PORT, () => console.log(`Enviro server running at http://localhost:${PORT}`));
}

startServer().catch(err => {
  console.error('Server startup failed:', err.message);
  process.exit(1);
});
