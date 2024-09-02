let express = require("express")
let router = express.Router();
let TopsSchema = require("../Models/tops_schema");



//******************************CRUD RUTE***********************************


router.post("/tops", async (req, res) => {

   try {
      let newdata = new TopsSchema(req.body);
      let saveddata = await newdata.save();
      res.json(saveddata);

   }
   catch (e) {


   }
})

router.delete("/deletetops/:id", async (req, res) => {


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

router.put("/edittop", async (req, res) => {


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
