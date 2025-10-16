import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Token yaratish
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Admin ro‘yxatdan o‘tishi
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Bu email allaqachon mavjud" });
    }

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

// Admin tizimga kirishi
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email va parol kiritilishi kerak" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Email yoki parol noto‘g‘ri" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email yoki parol noto‘g‘ri" });
    }

    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
