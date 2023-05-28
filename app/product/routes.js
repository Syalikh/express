const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');
const connection = require('../../config/mysql');
const { error } = require('console');

router.get('/barang', (req, res) => {
    connection.connect();
    connection.query({
        sql: 'SELECT * FROM barang',
    }, (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: 'failed to fetch data'
            });
        }else {
            res.send({
                status: 'success',
                response: result
            });
        }
    })
});

router.get('/barang/:id', (req, res) => {
    res.json({
        id: req.params.id
    });
});

router.post('/barang/', upload.single('image'), (req, res) => {
    const {id, nama, harga, jumlah} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target);
        // res.json({
        //     name,
        //     price,
        //     stock,
        //     price,
        //     image
    
        // });

        res.sendFile(target);
    }
});


// router.get('/:category/:tag', (req, res) => {
//     const {category, tag} = req.params;
//     res.json({category, tag});
// });


module.exports = router