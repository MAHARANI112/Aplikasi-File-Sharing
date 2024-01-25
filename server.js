// Menggunakan dotenv untuk konfigurasi variabel lingkungan
require("dotenv").config()

// Menggunakan beberapa modul seperti multer untuk mengelola file uploads,
// mongoose untuk menghubungkan ke database MongoDB,
// bcrypt untuk hashing password, dan model File untuk berinteraksi dengan koleksi file di database
const multer = require("multer")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const File = require("./models/File")

// Menggunakan Express untuk membuat aplikasi web
const express = require("express")
const app = express()

// Menggunakan body-parser agar dapat mengakses data yang dikirim melalui formulir HTML
app.use(express.urlencoded({ extended: true }))

// Mengkonfigurasi multer untuk menangani file uploads
const upload = multer({ dest: "uploads" })

// Menghubungkan ke database MongoDB menggunakan URL yang disimpan di variabel lingkungan
mongoose.connect(process.env.DATABASE_URL)

// Mengatur template engine EJS
app.set("view engine", "ejs")

// Mengatur route untuk halaman utama
app.get("/", (req, res) => {
  res.render("index")
})

// Mengatur route untuk meng-handle proses upload file
app.post("/upload", upload.single("file"), async (req, res) => {
  // Menyimpan informasi file yang diunggah
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  }

  // Jika password diatur, hash password dan tambahkan ke data file
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10)
  }

  // Membuat entri baru di koleksi File dengan data file yang diunggah
  const file = await File.create(fileData)

  // Menampilkan halaman utama dengan link ke file yang diunggah
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` })
})

// Mengatur route untuk menangani permintaan download file
app.route("/file/:id").get(handleDownload).post(handleDownload)

// Fungsi asinkron untuk menangani proses download file
async function handleDownload(req, res) {
  // Mencari file berdasarkan ID yang diberikan dalam URL
  const file = await File.findById(req.params.id)

  // Jika file memiliki password, validasi password
  if (file.password != null) {
    // Jika password tidak disertakan dalam permintaan, tampilkan halaman password
    if (req.body.password == null) {
      res.render("password")
      return
    }

    // Membandingkan password yang dimasukkan dengan password yang disimpan
    if (!(await bcrypt.compare(req.body.password, file.password))) {
      // Jika password tidak cocok, tampilkan halaman password dengan pesan error
      res.render("password", { error: true })
      return
    }
  }

  // Menambahkan jumlah unduhan dan menyimpan perubahan ke dalam database
  file.downloadCount++
  await file.save()
  console.log(file.downloadCount)

  // Mengirim file untuk diunduh ke pengguna
  res.download(file.path, file.originalName)
}

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
