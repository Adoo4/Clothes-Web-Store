let express = require("express")
let router = express.Router();
let PurchaseSchema = require("../Models/purchased_articles_schema");



//******************************CRUD RUTE***********************************




router.post("/post", async (req, res) => {


   try {
      let newdata = new PurchaseSchema(req.body);
      let saveddata = await newdata.save();


      res.json(saveddata);

   } catch (e) {
      console.error(e);
      res.status(500).send('Server error');
   }
});



router.delete('/delete-by-user/:userId', async (req, res) => {
   try {
     let { userId } = req.params;
 
     
     let deletedDocument = await Purchase.findOneAndDelete({ user: userId });
 
     if (!deletedDocument) {
       return res.status(404).json({ message: 'Document not found' });
     }
 
     res.status(200).json({ message: 'Document deleted successfully', deletedDocument });
   } catch (e) {
     console.error(e.message);
     res.status(500).json({ error: e.message });
   }
 });











router.post("/get", async (req, res) => {
   try {
      let {user} = req.body
      let newdata = await PurchaseSchema.find({ user: user }).populate('items.productId', "name brand price color imageUrl");
      res.json(newdata);
   }
   catch (e) {
      console.log(e.message);
      res.status(500).json({ error: e.message });
   }
});











module.exports = router;