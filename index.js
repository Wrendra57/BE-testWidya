/* eslint-disable no-undef */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// eslint-disable-next-line no-unused-vars
const cors = require("cors");


// SWAGGER

const upload = require("./helpers/fileUploadCloudinary");
const authController = require("./controllers/authController");
const productContoller = require("./controllers/productController");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Midleware
const middleware = require("./middlewares/auth");

// API USER
app.post("/auth/register", authController.registermember);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currentUser);


// API Product
app.post(
  "/product",
  middleware.authenticate,
  upload.single("picture"),
  productContoller.create
);

app.get("/product", productContoller.getAllProducts);
app.get("/product/:id", productContoller.getDetailProdcut);
app.get(
  "/productbyseller",
  middleware.authenticate,
  productContoller.getDetailBySeller
);
app.put(
  "/product/:id",
  middleware.authenticate,
  upload.single("picture"),
  productContoller.updateProduct
);
app.delete(
  "/product/:id",
  middleware.authenticate,
  productContoller.deleteProductById
);
app.put(
  "/product/status/:id",
  middleware.authenticate,
  productContoller.updateStatusProduct
);

// API Documentation

// server setup
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

module.exports = { server, app };
