const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;connection.once('open', () => {
  console.log("Database MongoDBMongoDB berhasil terkoneksi");
})

const resepsRouter = require('./routes/reseps');
app.use('/reseps', resepsRouter);

app.listen(port, () => {
    console.log(`Server berjalan di port : ${port}`);
});