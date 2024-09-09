let express = require("express")
let router = express.Router();
let TopsSchema = require("../Models/tops_schema.js");
let jwt = require('jsonwebtoken');
let User = require("../Models/User.js")

//********************MIDDLEWARE******************************************* */

// Verifikacija korisnika
let verifyUser = (req, res, next) => {
   console.log(req.headers.authorization)
   try {
      let token = req.headers.authorization?.slice(7);
      if (!token) {
         return res.status(403).json({ message: "No token provided" });
      }
      console.log("test kljuc")
      console.log(process.env.SECRETKEY)
      let decoded = jwt.verify(token, process.env.SECRETKEY);
      if (decoded) {
         console.log(decoded)
         next();
      } else { console.log("Token failed") }

   } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
   }
};

// Verifikacija Admina
let verifyAdmin = async (req, res, next) => {
   try {
      let token = req.headers.authorization?.slice(7);
      let decoded = jwt.verify(token, process.env.SECRETKEY);
      let user = await User.findById(decoded.id);

      if (!user || user.role !== 'admin') {
         return res.status(403).json({ message: "Unauthorized. Admin access only" });
      }
      req.user = user;
      next();
   } catch (e) {
      return res.status(403).json({ message: "Admin authorization failed" });
   }
};




//******************************CRUD RUTE***********************************


router.post("/tops",verifyUser, async (req, res) => {

   try {
      let newdata = new TopsSchema(req.body);
      let saveddata = await newdata.save();
      res.json(saveddata);

   }
   catch (e) {


   }
})

router.delete("/deletetops/:id",verifyAdmin, async (req, res) => {


   try {
      let { id } = req.params
      let newdata = await TopsSchema.findByIdAndDelete(id)
      res.json(newdata)
      if (!newdata) {
         return res.status(404).json({ message: "Article not found" });
      }
   }
   catch (e) {
      console.log(e.message)

   }
})

router.put("/edittop",verifyAdmin, async (req, res) => {


   try {
      let id = req.body._id
      let newdata = await TopsSchema.findByIdAndUpdate(id, req.body, { new: true })

      if (!newdata) {
         return res.status(404).json({ message: "Edit failed" });
      } else { res.json(newdata) }
   }
   catch (e) {
      return res.status(404).json({ message: "Edit failed" });

   }
})


router.get("/gettops", async (req, res) => {

   try {
      let newdata = await TopsSchema.find();
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})


router.get("/getdetails", async (req, res) => {
   let { id } = req.query
   try {
      let newdata = await TopsSchema.findById(id);
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})







router.get("/gettopslimit", async (req, res) => {

   try {
      let newdata = await TopsSchema.find().limit(6);
      res.json(newdata)
   }
   catch (e) {


   }
})






module.exports = router;
