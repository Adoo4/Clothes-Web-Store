let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let { config } = require("dotenv");

let userRoute = require("./Routes/UserRoute")
let sneakerRoute = require("./Routes/SneakersRoute")
let topsRoute = require("./Routes/TopsRoute")
let bottomdRoute = require("./Routes/BottomsRoute")
let accessories = require("./Routes/AccessoriesRoute")
let cart = require("./Routes/CartRoute")
let allproducts = require("./Routes/AllProductsRoute")
let purchased = require("./Routes/PurchaseRoute")


config();

let server = express();

server.use(express.json());
server.use(cors());

//Routes
server.use("/user", userRoute);

//postaviti middleware
server.use("/sneakers", sneakerRoute);
server.use("/tops", topsRoute);
server.use("/bottoms", bottomdRoute)
server.use("/accessories", accessories)
server.use("/cart", cart)
server.use("/allproducts", allproducts)
server.use("/purchased", purchased)

let connectDb = async () => {
    try {
        await mongoose.connect(process.env.DBCONNECTION);
        server.listen(process.env.PORT || 8282, () => console.log(`****SERVER RUNNING****
    Server running on port: ${process.env.PORT}`))
    } catch (e) {
        console.log("Unable to run server, " + e.message)


    }
}
connectDb();