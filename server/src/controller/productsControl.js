import { v4 as uuidv4 } from "uuid";

const products = [];

export const getProducts = async (_, res) => {
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ massage: "product not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { imagePath, title, category, price, description } = req.body;

    if (!imagePath || !title || !category || !price || !description) {
      return res.status(400).json({ error: "not all fields are filled in" });
    }

    let newProduct = { id: uuidv4(), imagePath, title, price, description };

    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = products.findIndex((p) => p.id === req.params.id);

    if (!productId) {
      return res.status(404).json({ error: "product not found" });
    }

    users.splice(productId, 1);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const editProduct = async (req, res) => {
  const productId = req.params;

  try {
    let product = products.find((p) => p.id === productId);

    if (!product) {
      return res
        .status(404)
        .json({ error: `Can't find product with id: ${productId}` });
    }

    Object.keys(req.body).forEach((e) => {
      let productKey = req.body[e];

      if (productKey) {
        product[e] = productKey;
      }
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};
