const router = require('express').Router();
let Resep = require('../models/resep.model');

router.route('/').get((req, res) => {
    Resep.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const nama = req.body.nama;
    const deskripsi = req.body.deskripsi;
    const gambar = req.body.gambar;

    const newResep = new Resep({
        nama, deskripsi, gambar
    });

    newResep.save()
        .then(() => res.json('Resep bertambah!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Resep.findById(req.params.id)
        .then(resep => res.json(resep))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Resep.findByIdAndDelete(req.params.id)
        .then(() => res.json('Resep berhasil dihapus.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    Resep.findById(req.params.id)
        .then(resep => {
            resep.nama = req.body.nama;
            resep.deskripsi = req.body.deskripsi;
            resep.gambar = req.body.gambar;
            resep.save()
                .then(() => res.json('Resep berhasil diubah!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;