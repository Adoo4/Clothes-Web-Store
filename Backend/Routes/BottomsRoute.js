let express = require("express")
let router = express.Router();
let BottomsSchema = require("../Models/bottoms_schema");



//******************************CRUD RUTE***********************************


router.post("/bottoms", async (req, res) => {

   try {
      let newdata = new BottomsSchema(req.body);
      let saveddata = await newdata.save();
      res.json(saveddata);

   }
   catch (e) {


   }
})

router.delete("/deletebottoms/:id", async (req, res) => {


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

router.put("/editbottom", async (req, res) => {


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
