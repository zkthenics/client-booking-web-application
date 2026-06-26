const express = require('express');
const path = require('path');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const bookingRoutes = require('./routes');
app.use('/', bookingRoutes);

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Cinema server running on http://localhost:${PORT}`);
});