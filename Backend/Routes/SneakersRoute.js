let express = require("express")
let router = express.Router();
let SneakersSchema = require("../Models/sneakers_schema.js");


//******************************CRUD RUTE***********************************


router.post("/sneakers", async (req, res) => {

   try {
      let newSneakers = new SneakersSchema(req.body);
      let savedSnakers = await newSneakers.save();
      res.json(savedSnakers);

   }
   catch (e) {


   }
})

router.delete("/deletesneakers/:id", async (req, res) => {


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

router.put("/editsneaker", async (req, res) => {


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
