let express = require("express")
let router = express.Router();
let User = require("../Models/User.js")
let updateUser = require("../Models/user_update.js")
let jwt = require("jsonwebtoken")





router.post("/Authentication", async (req, res) => { //ovo ce biti ruta kojom useEffect provjerava da li korisnik ima token i ako imda da li je validan, 
                                                     //ukoliko jeste validan vraca korisnika koji se spasava u user state na frontendu

    try {
        console.log("Authentication reached")
        console.log(req.headers.authorization)
        let token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        if(decoded) {
         console.log("Token decoded successfully")

         try {
            let userAuth = await User.findById(decoded.id)
            res.json(userAuth)

         } catch(e){


         }

        }


       

    } catch(e) {

        console.log(e.message);
        res.status(500).json({ error: e.message }) 
    }

})





router.post("/register", async (req, res) => {

    try {
        let newUser = new User(req.body);
        let savedUser = await newUser.save(); 
        res.status(201).json(savedUser);

    } catch(e) {

        console.log(e.message);
        res.status(500).json({ error: e.message })
    }

})

router.post("/login", async(req, res) => {
let {email, password} = req.body
try{
    let user = await User.findOne({email}) 
    if(user) {
        if(password === user.password) {
            console.log("User found, password correct")
            const token = jwt.sign({id: user._id}, process.env.SECRETKEY);
            res.json({user, token})
        } else {
            console.log("Incorrect password")
            res.status(400).send("user not found")  
        }
       
    } else {
        console.log("USer not found!")
        res.status(400).send("user not found")  

}
}catch(error){
    console.log(error.message) 
}


})



//ovdje treba middleware

router.get("/getusers", async(req,res)=>{
let data = await User.find();
if(data && data.length > 0) {
 res.json(data)
} else {
    res.send("Request failed, users not found")
}

})


router.put("/userupdate", async(req, res) => {
    console.log("request recieved!")

    try {
        let {_id} = req.body
        let editedUser = await User.findByIdAndUpdate(_id, req.body, { new: true })
  
        if (!editedUser ) {
           return res.status(404).json({ message: "Edit failed" });
        } else { res.json(editedUser ) }
     }
     catch (e) {
        return res.status(404).json({ message: "Edit failed" });
  
     }



})


router.delete("/deleteuser/:id", async (req, res) => {


    try {
       let { id } = req.params
       let deletedUser = await User.findByIdAndDelete(id)
       res.json(deletedUser)
       if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
       }
    }
    catch (e) {
       console.log(e.message)
 
    }
 })


module.exports = router;