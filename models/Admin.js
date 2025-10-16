import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ism kiritilishi shart"],
  },
  email: {
    type: String,
    required: [true, "Email kiritilishi shart"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Parol kiritilishi shart"],
    minlength: 6,
  },
}, { timestamps: true });

// Parolni xeshlash
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Parolni solishtirish metodi
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
