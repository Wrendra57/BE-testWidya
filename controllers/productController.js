const productService = require("../services/productService");

const create = async (req, res) => {
  const { productName, category, price, description } = req.body;
  const { status, status_code, message, data } = await productService.create({
    productName,
    category,
    price,
    description,
    createdBy: req.user.id,
    image: req.file,
    status: "available",
    idSeller: req.user.id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllProducts = async (req, res) => {
  const { status, status_code, message, data } = await productService.getAll();
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getDetailProdcut = async (req, res) => {
  const { id } = req.params;
  const { status, status_code, message, data } = await productService.getById({
    id,
  });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
const getDetailBySeller = async (req, res) => {
  const { status, status_code, message, data } =
    await productService.getByIdSeller({
      id: req.user.id,
    });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, category, price, description } = req.body;

  const { status, status_code, message, data } = await productService.update({
    productName,
    price,
    category,
    description,
    id: id,
    image: req.file,
    updatedBy: req.user.id,
  });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const { status, status_code, message, data } =
    await productService.deleteById({
      id,
      userId: req.user.id,
    });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
const updateStatusProduct = async (req, res) => {
  const { id } = req.params;
  const { status, status_code, message, data } =
    await productService.updateStatusProduct({
      id,
      userId: req.user.id,
    });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  create,
  getAllProducts,
  getDetailProdcut,
  deleteProductById,
  updateProduct,
  getDetailBySeller,
  updateStatusProduct,
};
