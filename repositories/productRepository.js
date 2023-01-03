const { Products } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class productRepository {
  static async create({
    idSeller,
    productName,
    price,
    category,
    description,
    image,
    status,
    createdBy,
  }) {
    const createdProduct = await Products.create({
      idSeller,
      productName,
      price,
      category,
      description,
      image,
      status,
      createdBy,
    });
    return createdProduct;
  }

  static async getAll() {
    const getAllProduct = await Products.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null,
        },
        status: {
          [Op.eq]: "available",
        },
      },
    });
    return getAllProduct;
  }
  static async getProductSeller({ id }) {
    const getProductBySeller = await Products.findAll({
      where: {
        idSeller: id,
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });
    return getProductBySeller;
  }
  static async getByID({ id }) {
    const getProduct = await Products.findOne({
      where: {
        id: id,
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });
    return getProduct;
  }

  static async updateByID({
    productName,
    price,
    category,
    description,
    image,
    id,
    updatedBy,
  }) {
    const updateProduct = await Products.update(
      {
        productName,
        price,
        category,
        image,
        description,
        updatedBy,
      },
      { where: { id } }
    );
    return updateProduct;
  }

  static async deleteById({ id, userId }) {

    const deleteProduct = await Products.update(
      {
        deletedAt: new Date().getTime(),
        deletedBy: userId,
        status: "notAvailable",
      },
      { where: { id } }
    );
    return deleteProduct;
  }
  static async updateStatusProduct({ id, userId }) {
    const updateStatus = await Products.update(
      {
        updatedBy: userId,
        status: "notAvailable",
      },
      { where: { id } }
    );
    return updateStatus;
  }
}

module.exports = productRepository;
