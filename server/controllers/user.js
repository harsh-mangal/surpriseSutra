// controllers/user.js
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, "surprisesutra@12345", {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, user: { _id: user._id }, });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Get user by ID
export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password"); // remove password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ Update user info (name, email, password)
export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add a new address
export const addAddress = async (req, res) => {
  const userId = req.params.id;
  const newAddress = req.body; // {street, city, state, zip, country, isDefault}

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If isDefault is true, reset other addresses
    if (newAddress.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({ message: "Address added successfully", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update an existing address
export const updateAddress = async (req, res) => {
  const userId = req.params.id;
  const { index, address } = req.body; // index of address in addresses array, address object with new data

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (index < 0 || index >= user.addresses.length)
      return res.status(400).json({ message: "Invalid address index" });

    // If isDefault is true, reset other addresses
    if (address.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses[index] = { ...user.addresses[index]._doc, ...address };
    await user.save();

    res.status(200).json({ message: "Address updated successfully", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete an address
export const deleteAddress = async (req, res) => {
  const userId = req.params.id;
  const { index } = req.body; // index of address to delete

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (index < 0 || index >= user.addresses.length)
      return res.status(400).json({ message: "Invalid address index" });

    user.addresses.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

