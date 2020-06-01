// urls de mi pagina principal, url de los slash acerca de o about

const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index.hbs');
});

module.exports = router;

