var express = require("express");
const Users = require("../Model/Users");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/* GET users listing. */
/* GET home page. */
 router.get("/", function (req, res, next) {
    res.send("KALLA SAHIFA SHU bella ciao");
 });


router.post("/register", function (req, res, next) {
   const { username, password } = req.body;

   bcrypt.hash(password, 10, (err, hash) => {
      const user = new Users({
         username,
         password: hash,
      });

      const promise = user.save();
      promise.then((data) => res.json(data)).catch((err) => console.log(err));
   });
});

router.post("/autentificate", (req, res, next) => {
   const { username, password } = req.body;
   Users.findOne({ username }, (err, user) => {
      if (err) throw err;

      if (!user) {
         res.json({
            status: "TOPILMADI",
            message: "BUNAQA FOYDALANUVCHI TOPILMADI ROYHATDAN O'TING",
         });
      } else {
         bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
               res.json({
                  status: "PAROLING XATO ",
                  message: "SIZNING PAROLINGIZ XATO",
               });
            } else {
               const payload = { username };
               const token = jwt.sign(payload, req.app.get("api_secret_key"), {
                  expiresIn: 7200,
               });

               res.json({
                  status: true,
                  token,
               });
            }
         });
      }
   });
});

// router.post("/authenticate", (req, res, next) => {
//   const { username, password } = req.body;
//   Users.findOne({ username }, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//       res.json({
//         status: "Topilmadi",
//         message:
//           "Foydalanuvchi topilmadi iltimos royxatdan oting || adminga murojat qiling",
//       });
//     }
//     else {
//       bcrypt.compare(password, user.password).then((resul) => {
//         if (!resul) {
//           res.json({
//             status: "Parolingiz xato",
//             message: "Sizning parolingiz xato",
//           });
//         }

//         else {
//           // token berish
//           const payload = { username };
//           const token = jwt.sign(payload, req.app.get("api_secret_key"), {
//             expiresIn: 720, // 12 soat
//           });

//           res.json({
//             status: true,
//             token,
//           });
//         }
//       });
//     }
//   });
// });

module.exports = router;
