let express = require("express")
let router = express.Router();
let AccessoriesSchema = require("../Models/accessories_schema");



//******************************CRUD RUTE***********************************


router.post("/accessories", async (req, res) => {

   try {
      let newdata = new AccessoriesSchema(req.body);
      let saveddata = await newdata.save();
      res.json(saveddata);

   }
   catch (e) {


   }
})

router.delete("/deleteaccessories/:id", async (req, res) => {


   try {
      let { id } = req.params
      let newdata = await AccessoriesSchema.findByIdAndDelete(id)
      res.json(newdata)
      if (!newdata) {
         return res.status(404).json({ message: "Article not found" });
      }
   }
   catch (e) {
      console.log(e.message)

   }
})

router.put("/editaccessory", async (req, res) => {


   try {
      let id = req.body._id
      let newdata = await AccessoriesSchema.findByIdAndUpdate(id, req.body, { new: true })

      if (!newdata) {
         return res.status(404).json({ message: "Edit failed" });
      } else { res.json(newdata) }
   }
   catch (e) {
      return res.status(404).json({ message: "Edit failed" });

   }
})


router.get("/getaccessories", async (req, res) => {

   try {
      let newdata = await AccessoriesSchema.find();
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})


router.get("/getdetails", async (req, res) => {
   let { id } = req.query
   try {
      let newdata = await AccessoriesSchema.findById(id);
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})







router.get("/getaccessorieslimit", async (req, res) => {

   try {
      let newdata = await AccessoriesSchema.find().limit(6);
      res.json(newdata)
   }
   catch (e) {


   }
})






module.exports = router;
