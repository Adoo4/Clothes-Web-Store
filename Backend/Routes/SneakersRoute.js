let express = require("express")
let router = express.Router();
let SneakersSchema = require("../Models/sneakers_schema.js");
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


router.post("/sneakers", verifyUser, async (req, res) => {

   try {
      let newSneakers = new SneakersSchema(req.body);
      let savedSnakers = await newSneakers.save();
      res.json(savedSnakers);

   }
   catch (e) {


   }
})

router.delete("/deletesneakers/:id",verifyAdmin, async (req, res) => {


   try {
      let { id } = req.params
      let deletedSneaker = await SneakersSchema.findByIdAndDelete(id)
      res.json(deletedSneaker)
      if (!deletedSnaker) {
         return res.status(404).json({ message: "Sneaker not found" });
      }
   }
   catch (e) {
      console.log(e.message)

   }
})

router.put("/editsneaker",verifyAdmin, async (req, res) => {


   try {
      let id = req.body._id
      let editedSneaker = await SneakersSchema.findByIdAndUpdate(id, req.body, { new: true })

      if (!editedSneaker) {
         return res.status(404).json({ message: "Edit failed" });
      } else { res.json(editedSneaker) }
   }
   catch (e) {
      return res.status(404).json({ message: "Edit failed" });

   }
})


router.get("/getsneakers", async (req, res) => {

   try {
      let savedSnakers = await SneakersSchema.find();
      res.json(savedSnakers)
   }
   catch (e) {
      console.log(e.message)

   }
})


router.get("/getdetails", async (req, res) => {
   let { id } = req.query
   try {
      let savedSnakers = await SneakersSchema.findById(id);
      res.json(savedSnakers)
   }
   catch (e) {
      console.log(e.message)

   }
})







router.get("/getsneakerslimit", async (req, res) => {

   try {
      let savedSnakers = await SneakersSchema.find().limit(6);
      res.json(savedSnakers)
   }
   catch (e) {


   }
})






module.exports = router;
