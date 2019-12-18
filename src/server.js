import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserModel from './models/UserModel.js';

// mongo db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect('mongodb+srv://아이디:비밀번호@경로', {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root context
app.get('/', (req, res, next) => {
  UserModel.find({})
    .then(data => {
      console.log('data : ', data);
    })
    .catch(error => {
      console.log('error: ', error);
      next(error);
    });
  res.status(200).end('Express Server Start Port 3000');
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('ERROR');
});

app.listen(3000, () => console.log('Express Server Start Port 3000'));
