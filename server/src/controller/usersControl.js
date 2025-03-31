import { v4 as uuidv4 } from "uuid";

const users = [];

export const getUsers = async (_, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ massage: "user not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "not all fields are filled in" });
    }

    let newUser = { id: uuidv4(), name, email, password };

    users.push(newUser);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = users.findIndex((v) => v.id === req.params.id);

    if (userId === -1) {
      return res.status(404).json({ error: "user not found" });
    }

    users.splice(userId, 1);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};

export const editUser = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = users.find((v) => v.id === userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: `Can't find user with id: ${userId}` });
    }

    Object.keys(req.body).forEach((e) => {
      let userKey = req.body[e];

      if (userKey) {
        user[e] = userKey;
      }
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);
  }
};
