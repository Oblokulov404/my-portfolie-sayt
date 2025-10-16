import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Sayt nomi kiritilishi kerak"],
  },
  github: {
    type: String,
    required: [true, "GitHub linki kiritilishi kerak"],
  },
  siteUrl: {
    type: String,
    required: [true, "Sayt manzili (URL) kiritilishi kerak"],
  },
  about: {
    type: String,
    required: [true, "Loyiha haqida qisqacha tavsif yozilishi kerak"],
  },
  image: {
    type: String,
    required: [true, "Rasm manzili (URL) kiritilishi kerak"],
  },
}, { timestamps: true });

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
