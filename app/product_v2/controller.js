const Product = require("./model");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");


const index = async (req, res) => {
  const { search } = req.query;

  try {
    let result;
    if (search) {
      result = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else {
      result = await Product.findAll();
    }

    res.send(result);
  } catch (e) {
    res.send(e);
    return _response(res);
  }
};
const view = async (req, res) => {
  try {
    const result = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return _response(res);
  }
};


const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
      return _response(res);
    }
  }
};

const update = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;

  try {
    let imageUrl = null;
    if (image) {
      const target = path.join(__dirname, "../../uploads", image.originalname);
      fs.renameSync(image.path, target);
      imageUrl = `http://localhost:3000/public/${image.originalname}`;
    }

    const result = await Product.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Product not found" });
    }

    result.users_id = parseInt(users_id);
    result.name = name;
    result.price = price;
    result.stock = stock;
    result.status = status;
    if (imageUrl) {
      result.image_url = imageUrl;
    }

    await result.save();

    return res.json(result);
  } catch (err) {
    console.error(err);
    return _response(res);
  }
};

const destroy = async (req, res) => {
  try {
    const result = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    await result.destroy();
    res.status(204).end();
  } catch (e) {
    res.send(e);
    return _response(res);
  }
};

const _response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        response: error,
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
