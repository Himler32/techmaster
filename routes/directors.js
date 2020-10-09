const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const Directors = require("../Model/Director");
const mongoose = require('mongoose') 

/* GET home page. */
// router.get("/", function (req, res, next) {
//    res.render("index", { title: "Xursand" });
// });

// router.post("/", function (req, res, next) {
//    const director = new Directors(req.body);
//    const promise = director.save();

//    promise.then((data) => res.json(data)).catch((err) => console.log(err));
// });

// router.get("/:director_id", function (req, res, next) {

//    const promise = Directors.findById(req.params.director_id);

//    promise
//    .then((data) => res.json(data))
//    .catch((err) => console.log(err));
// });

// router.get("/getall", function (req, res, next) {
//    const promise = Directors.find({});
//    promise
//       .then((data) => {
//          res.json(data);
//       })
//       .catch((err) => console.log(err));
// });

// ===========================   L O O K   U P==================================
// router.get("/:director_id", function (req, res, next) {
//    const promise = Directors.aggregate([
//       {
//          $match: {
//             _id: mongoose.Types.ObjectId(req.params.director_id),
//          },
//       },
//       {
//          $lookup: {
//             from: "movies", // ulanadigan database collection   // from bn as boshqa boshqa bolsin
//             localField: "_id",
//             foreignField: "director_id",
//             as: "Films",
//          },
//       },
//       {
//          $unwind: {
//             path: "$Films",
//          },
//       },
//       {
//          $group: {
//             _id: {
//                _id: "$_id",
//                name: "$name",
//                surname: "$surname",
//                bio: "$bio",
//             },
//             Films: {
//                $push: "$Films",
//             },
//          },
//       },
//       {
//          $project: {
//             _id: "$_id._id",
//             name: "$_id.name",
//             surname: "$_id.surname",
//             Films: "$Films",
//          },
//       },
//    ]);

//    promise.then((data) => res.json(data)).catch((err) => console.log(err));
// });

router.put("/:director_id", function (req, res, next) {
   const promise = Directors.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      { new: true },
   );
   promise.then((data) => res.json(data)).catch((err) => console.log(err));
});

router.delete("/:director_id", function (req, res, next) {
   const promise = Directors.findByIdAndRemove(req.params.director_id);
   promise.then((data) => res.json(data)).catch((err) => console.log(err));
});

router.get("/:director_id/best10", (req, res, next) => {
   const promise = Directors.aggregate([
      {
         $match:{
            _id: mongoose.Types.ObjectId(req.params.director_id),
         },
      },
      {
         $lookup: {
            from: "movies",
            localField: "_id",
            foreignField: "director_id",
            as: "Films",
         },
      },
      {
         $unwind: {
            path: "$Films", // kino borlari chiqarradi
         },
      },
      {
         $sort: {
            "Films.imdb_score": -1,
         },
      },
      {
         $limit: 2,
      },
      {
         $group: {
            _id: {
               _id: "$_id",
            },
            Films: {
               $push: "$Films",
            },
         },
      },
      {
         $project: {
            _id: false,
            Films: "$Films",
         },
      },
   ]);

   promise.then((data) => res.json(data)).catch((err) => console.log(err));
});


module.exports = router;
