const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const connectDB = require('./config/db.js');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes.js');

dotenv.config({ path: "backend/config/.env" });
connectDB();

app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)

var __dirname = path.resolve()


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})
module.exports = app
