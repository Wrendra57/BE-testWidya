/* eslint-disable no-undef */
const productRepository = require("../repositories/productRepository");
const cloudinary = require("../config/cloudinary");

class productService {
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
    try {
      if (!productName) {
        return {
          status: false,
          status_code: 400,
          message: "Nama Product wajib di isi!",
          data: null,
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Harga Product wajib di isi!",
          data: null,
        };
      }

      if (!category) {
        return {
          status: false,
          status_code: 400,
          message: "Kategori product wajib di isi!",
          data: null,
        };
      }
      if (!image) {
        return {
          status: false,
          status_code: 400,
          message: "image mobil wajib di isi!",
          data: null,
        };
      }
      if (!createdBy) {
        return {
          status: false,
          status_code: 400,
          message: "Silahkan login kembali!",
          data: null,
        };
      }
      if (!idSeller) {
        return {
          status: false,
          status_code: 400,
          message: "Silahkan login kembali!",
          data: null,
        };
      }
      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "description  wajib di isi!",
          data: null,
        };
      }
      if (!status) {
        return {
          status: false,
          status_code: 400,
          message: "status  wajib di isi!",
          data: null,
        };
      }

      // Upload file to cloudinary
      const fileToUpload = image;

      const fileBase64 = fileToUpload.buffer.toString("base64");
      const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

      const uploadImage = await cloudinary.uploader.upload(
        file,
        (err, result) => {
          if (err) {
            res
              .status(400)
              .send(`Gagal mengupload file ke cloudinary: ${err.message}`);
            return;
          }

          return result;
        }
      );

      const createProduct = await productRepository.create({
        idSeller,
        productName,
        price,
        category,
        description,
        image: uploadImage.url,
        status,
        createdBy,
      });

      return {
        status: true,
        status_code: 201,
        message: "Product Created ",
        data: createProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getAll() {
    try {
      const getAllProduct = await productRepository.getAll();
      return {
        status: true,
        status_code: 200,
        message: "Find all products success",
        data: getAllProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getById({ id }) {
    try {
      const getDetailProduct = await productRepository.getByID({ id });

      if (!getDetailProduct) {
        return {
          status: false,
          status_code: 400,
          message: "Products tidak ditemukan!",
          data: null,
        };
      }
      return {
        status: true,
        status_code: 200,
        message: "Get product by ID success",
        data: getDetailProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
  static async getByIdSeller({ id }) {
    try {
      const getDetailProduct = await productRepository.getProductSeller({ id });
      if (!getDetailProduct) {
        return {
          status: false,
          status_code: 400,
          message: "Products tidak ditemukan!",
          data: null,
        };
      }
      return {
        status: true,
        status_code: 200,
        message: "Get product by ID success",
        data: getDetailProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
  static async update({
    productName,
    price,
    category,
    description,
    image,
    id,
    updatedBy,
  }) {
    try {
      const getProduct = await productRepository.getByID({ id });

      if (!getProduct) {
        return {
          status: false,
          status_code: 400,
          message: "Cars tidak ditemukan!",
          data: null,
        };
      }
      if (!productName) {
        return {
          status: false,
          status_code: 400,
          message: "Nama Product wajib di isi!",
          data: null,
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Harga Product wajib di isi!",
          data: null,
        };
      }

      if (!category) {
        return {
          status: false,
          status_code: 400,
          message: "Kategori product wajib di isi!",
          data: null,
        };
      }
      if (!image) {
        return {
          status: false,
          status_code: 400,
          message: "image mobil wajib di isi!",
          data: null,
        };
      }
      if (!updatedBy) {
        return {
          status: false,
          status_code: 400,
          message: "Silahkan login kembali!",
          data: null,
        };
      }
      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "description  wajib di isi!",
          data: null,
        };
      }

      // Upload file to cloudinary
      const fileToUpload = image;

      const fileBase64 = fileToUpload.buffer.toString("base64");
      const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

      const uploadImage = await cloudinary.uploader.upload(
        file,
        (err, result) => {
          if (err) {
            res
              .status(400)
              .send(`Gagal mengupload file ke cloudinary: ${err.message}`);
            return;
          }

          return result;
        }
      );

      const updateCar = await productRepository.updateByID({
        productName,
        price,
        category,
        description,
        image: uploadImage.url,
        id,
        updatedBy,
      });
      return {
        status: true,
        status_code: 200,
        message: "Update car success",
        data: updateCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async deleteById({ id, userId }) {
    try {
      const getProduct = await productRepository.getByID({ id });
      if (!getProduct) {
        return {
          status: false,
          status_code: 400,
          message: "Product tidak ditemukan!",
          data: null,
        };
      }
      const deleteProduct = await productRepository.deleteById({ id, userId });
      return {
        status: true,
        status_code: 200,
        message: "Delete product success",
        data: deleteProduct,
      };
    } catch {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
  static async updateStatusProduct({ id, userId }) {
    try {
      const getProduct = await productRepository.getByID({ id });

      if (!getProduct) {
        return {
          status: false,
          status_code: 400,
          message: "Product tidak ditemukan!",
          data: null,
        };
      }

      const updated = await productRepository.updateStatusProduct({
        id,
        userId,
      });

      return {
        status: true,
        status_code: 200,
        message: "update status product success",
        data: updated,
      };
    } catch {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
}

module.exports = productService;
