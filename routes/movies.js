var express = require("express");
const { find } = require("../Model/Movies");
const Movies = require("../Model/Movies");
var router = express.Router();

/* GET home page. */
//

// CREATE A NEW MOVIE =======
router.post("/", function (req, res, next) {
   //  const { title, category, country, year, director, imdb_score } = req.body;

   //  const movie = new Movies({
   //     title: title,
   //     category: category,
   //     country: country,
   //     year: year,
   //     director: director,
   //     imdb_score: imdb_score,
   //  });

   const movie = new Movies(req.body);

   const promise = movie.save();

   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => {
         console.log(err);
      });
});



router.get("/", function (req, res, next) {
   const promise = Movies.find({});
   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => console.log(err));
});

router.get("/:movie_id", function (req, res, next) {
   const promise = Movies.findById(req.params.movie_id);
   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => console.log(err));
});

router.put("/:movie_id", function (req, res, next) {
   const promise = Movies.findByIdAndUpdate(req.params.movie_id, req.body);
   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => console.log(err));
});
router.delete("/:movie_id", function (req, res, next) {
   const promise = Movies.findByIdAndDelete(req.params.movie_id);
   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => console.log(err));
});

router.get("/top/top10", function (req, res, next) {
   const promise = Movies.find({}).limit(3).sort({ imdb_score: -1 });
   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => console.log(err));
});

router.get("/between/:start_year/:end_year", function (req, res, next) {
   const { start_year, end_year } = req.params;
   const promise = Movies.find({
      year: { $gte: start_year, $lte: end_year },
   });
   promise
      .then((data) => {
         res.json(data);
      })
      .catch((err) => console.log(err));
});

module.exports = router;
