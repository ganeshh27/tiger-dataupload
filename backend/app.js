const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const cors = require('cors');
const productController = require('./controllers/productController/products');
const uploadController = require('./controllers/uploadController/upload');

require('dotenv').config();

const dbConnection = process.env.MONGO_URI;
const app = express();

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => {
    console.log(err);
    throw new Error('db connection failed');
  });

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/');
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

const PORT = process.env.PORT || 3001;

function initApiRouter() {
  const apiRouter = express.Router();

  apiRouter.get('/products', productController.getProducts);
  apiRouter.put('/products', productController.updateProduct);
  apiRouter.post('/getfilteredproducts', productController.getFilteredProducts);
  apiRouter.post(
    '/upload',
    upload.single('uploadfile'),
    uploadController.dbLoad
  );

  return apiRouter;
}

app.use(initApiRouter());
// start server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
