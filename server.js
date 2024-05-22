import express from 'express';
import mongoose from 'mongoose';
// import clientRoutes from './routes/client.js';
// import categorieclientRoutes from './routes/categorieclient.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'E-MLIHA';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());

// app.use('/client', clientRoutes);
// app.use('/categorieclient', categorieclientRoutes);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
