// Mengimpor modul Mongoose
const mongoose = require("mongoose");

// Membuat schema untuk model "File"
const fileSchema = new mongoose.Schema({
  // Path tempat file disimpan
  path: {
    type: String,
    required: true, // Wajib ada
  },
  // Nama asli file
  originalName: {
    type: String,
    required: true, // Wajib ada
  },
  // Password untuk melindungi file (opsional)
  password: String,
  // Jumlah unduhan file
  downloadCount: {
    type: Number,
    default: 0, // Nilai default jika tidak disediakan
  },
});

// Membuat model "File" berdasarkan schema yang telah dibuat
const File = mongoose.model("File", fileSchema);

// Mengekspor model "File" untuk digunakan dalam aplikasi lainnya
module.exports = File;
