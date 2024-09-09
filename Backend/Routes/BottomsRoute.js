let express = require("express")
let router = express.Router();
let BottomsSchema = require("../Models/bottoms_schema.js");
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
     let decoded = jwt.verify(        token, process.env.SECRETKEY);
    if(decoded) {
      console.log(decoded)
      next();
    } else{console.log("Token failed")}

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


router.post("/bottoms",verifyUser, async (req, res) => {

   try {
      let newdata = new BottomsSchema(req.body);
      let saveddata = await newdata.save();
      res.json(saveddata);

   }
   catch (e) {


   }
})

router.delete("/deletebottoms/:id",verifyAdmin, async (req, res) => {


   try {
      let { id } = req.params
      let newdata = await BottomsSchema.findByIdAndDelete(id)
      res.json(newdata)
      if (!newdata) {
         return res.status(404).json({ message: "Article not found" });
      }
   }
   catch (e) {
      console.log(e.message)

   }
})

router.put("/editbottom",verifyAdmin, async (req, res) => {


   try {
      let id = req.body._id
      let newdata = await BottomsSchema.findByIdAndUpdate(id, req.body, { new: true })

      if (!newdata) {
         return res.status(404).json({ message: "Edit failed" });
      } else { res.json(newdata) }
   }
   catch (e) {
      return res.status(404).json({ message: "Edit failed" });

   }
})


router.get("/getbottoms", async (req, res) => {

   try {
      let newdata = await BottomsSchema.find();
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})


router.get("/getdetails", async (req, res) => {
   let { id } = req.query
   try {
      let newdata = await BottomsSchema.findById(id);
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})







router.get("/getbottomslimit", async (req, res) => {

   try {
      let newdata = await BottomsSchema.find().limit(6);
      res.json(newdata)
   }
   catch (e) {


   }
})






module.exports = router;
