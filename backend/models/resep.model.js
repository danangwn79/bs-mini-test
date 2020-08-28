const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resepSchema = new Schema({
  nama: { type: String, required: true },
  deskripsi: { type: String, required: true },
  gambar: { type: String, required: false },
}, {
  timestamps: true,
});

const Resep = mongoose.model('Resep', resepSchema);

module.exports = Resep;