var express = require('express');
var router = express.Router();


function get_reviews() {
  return [
    {
      name: 'James Fernando', photo_path: 'uploads/testi_01.png', position: 'Manager of Racer',
      quote: 'Wonderful Support!',
      review:
          'They have got my project on time with the competition with a sed highly skilled, ' +
          'and experienced & professional team.',
    },
    {
      name: 'Jacques Philips', photo_path: 'uploads/testi_02.png', position: 'Designer',
      quote: 'Awesome Services!',
      review:
          'Explain to you how all this mistaken idea of denouncing pleasure ' +
          'and praising pain was born and I will give you completed.',
    },
    {
      name: 'Venanda Mercy', photo_path: 'uploads/testi_03.png', position: 'Newyork City',
      quote: 'Great & Talented Team!', review:
          'The master-builder of human happines no one rejects, dislikes avoids ' +
          'pleasure itself, because it is very pursue pleasure.',
    },
  ];
}


/* GET reviews listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(get_reviews(), null, 3));
});

module.exports = router;
