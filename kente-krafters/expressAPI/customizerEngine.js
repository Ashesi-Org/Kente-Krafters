const express = require('express');
const router = express.Router();


router.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/customizeFabricView', (req, res) => {
  res.render('customizeFabricView', { /* any data you want to pass to the template */ });
});

module.exports = router;