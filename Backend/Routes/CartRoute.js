let express = require("express")
let router = express.Router();
let CartSchema = require("../Models/cart_schema");




//******************************CRUD RUTE***********************************




router.post("/post", async (req, res) => {
   try {
      let newdata = new CartSchema(req.body);
      let saveddata = await newdata.save();


      res.json(saveddata);

   } catch (e) {
      console.error(e);
      res.status(500).send('Server error');
   }
});


// Update cart items
router.put("/update", async (req, res) => {
   try {
     // Extract user ID, productId, and quantity from the request body
     let { user, items } = req.body;
 
     // Ensure the user ID and productId are provided
     if (!user || !items.productId) {
       return res.status(400).json({ message: "User ID and Product ID are required" });
     }
 
     // Find the cart by user ID and check if the product already exists
     let updatedCart = await CartSchema.findOneAndUpdate(
       { user, 'items.productId': items.productId }, // Find cart with matching productId
       { $set: { 'items.$.quantity': items.quantity } }, // Update the quantity if product exists
       { new: true } // Return the updated document
     );
 
     // If no cart was found with the productId, push the new item to the items array
     if (!updatedCart) {
       let newCart = await CartSchema.findOneAndUpdate(
         { user },  // Find the cart by user ID
         {
           $push: {
             items: {
               productId: items.productId,
               quantity: items.quantity
             }
           }
         },
         {
           new: true, // Return the updated document
           upsert: true // Create the cart if it doesn't exist
         }
       );
 
       return res.json(newCart); // Send the updated cart with the new item added
     }
 
     // If the cart was found and updated, return it
     return res.json(updatedCart);
 
   } catch (error) {
     console.error("Update error:", error.message);
     return res.status(500).json({ message: "An error occurred while updating the cart" });
   }
 });
 








router.get("/get", async (req, res) => {
   try {

      let newdata = await CartSchema.find().populate('items.productId');
      res.json(newdata);
   }
   catch (e) {
      console.log(e.message);
      res.status(500).json({ error: e.message });
   }
});


router.post("/getcart", async (req, res) => {
   let userId = req.body.userId;

   try {
      
       let userCart = await CartSchema.findOne({ user: userId })
           .populate("items.productId", "name brand price color imageUrl"); 

       if (!userCart) {
           return res.status(404).json({ message: "Cart not found" });
       }

       res.json(userCart);
   } catch (e) {
       console.error(e.message);
       return res.status(500).json({ message: "Error fetching cart" });
   }
});



router.post("/getusercart", async (req, res) => {
   let userId = req.body.userId;

   try {
      // Find the cart for the given userId
      let userCart = await CartSchema.findOne({ user: userId });
      
      // If no cart exists, create a new one
      if (!userCart) {
         let newCart = new CartSchema({
            user: userId,
            items: []
         });
         
         let savedCart = await newCart.save();
         


         return res.status(201).json(savedCart);
      } else {
         
         return res.status(200).json(userCart);
      }
   } catch (e) {
      console.error(e.message);
      return res.status(500).json({ message: "Error fetching or creating cart" });
   }
});

router.put("/deletecartitems", async (req, res) => {
   let { id } = req.body
   let {userId} = req.body

   try {
     


      let newdata = await CartSchema.findOneAndUpdate({user: userId}, {$pull: {items:{productId: id}}},  { new: true })
      
      if (!newdata) {
         return res.status(404).json({ message: "Article not found" });
      }
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})


router.delete('/delete-by-user/:userId', async (req, res) => {
   try {
     let { userId } = req.params;
 
     // Find and delete the document by user property
     let deletedDocument = await CartSchema.findOneAndDelete({ user: userId });
 
     if (!deletedDocument) {
       return res.status(404).json({ message: 'Document not found' });
     }
 
     res.status(200).json({ message: 'Document deleted successfully', deletedDocument });
   } catch (e) {
     console.error(e.message);
     res.status(500).json({ error: e.message });
   }
 });



/*
router.put("/editaccessory", async (req, res) => {


   try {
      let id = req.body._id
      let newdata = await CartSchema.findByIdAndUpdate(id, req.body, { new: true })

      if (!newdata) {
         return res.status(404).json({ message: "Edit failed" });
      } else { res.json(newdata) }
   }
   catch (e) {
      return res.status(404).json({ message: "Edit failed" });

   }
})





router.get("/getdetails", async (req, res) => {
   let { id } = req.query
   try {
      let newdata = await CartSchema.findById(id);
      res.json(newdata)
   }
   catch (e) {
      console.log(e.message)

   }
})







router.get("/getaccessorieslimit", async (req, res) => {

   try {
      let newdata = await CartSchema.find().limit(6);
      res.json(newdata)
   }
   catch (e) {


   }
}) 

*/




module.exports = router;
