import Achievement from "../models/Achievement.js";

// 🔹 Barcha loyihalarni olish
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: "Yutuqlarni olishda xatolik", error: error.message });
  }
};

// 🔹 Yangi loyiha qo‘shish
export const createAchievement = async (req, res) => {
  try {
    const { title, github, siteUrl, about, image } = req.body;

    if (!title || !github || !siteUrl || !about || !image) {
      return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring" });
    }

    const achievement = await Achievement.create({ title, github, siteUrl, about, image });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: "Yangi yutuq qo‘shishda xatolik", error: error.message });
  }
};

// 🔹 Loyiha ma’lumotini yangilash
export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Achievement.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Loyiha topilmadi" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Yutuqni yangilashda xatolik", error: error.message });
  }
};

// 🔹 Loyihani o‘chirish
export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Achievement.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Loyiha topilmadi" });
    }

    res.status(200).json({ message: "Loyiha o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "O‘chirishda xatolik", error: error.message });
  }
};
