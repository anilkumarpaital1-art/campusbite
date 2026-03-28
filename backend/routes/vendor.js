const express = require("express")
const router = express.Router()
const db = require("../config/db")

/* REGISTER VENDOR */

router.post("/register", async (req,res)=>{

const { restaurantName, ownerName, email, phone, password, address } = req.body
try{

await db.query(
"INSERT INTO vendors (canteenName, ownerName, email, phone, password, address) VALUES (?,?,?,?,?,?)",
[restaurantName, ownerName, email, phone, password, address]
)

res.json({
success:true,
message:"Vendor Registered Successfully"
})

}
catch(err){
  console.log("REGISTER ERROR:", err);   // 🔥 important

  res.json({
    success:false,
    message: err.message   // 👈 show real error
  })
}

})

/* LOGIN VENDOR */

router.post("/login", async (req,res)=>{

const { email,password } = req.body

console.log("BODY:", req.body);

try{

const [rows] = await db.query(
"SELECT * FROM vendors WHERE email=? AND password=?",
[email,password]
)

if(rows.length === 0){

return res.json({
success:false,
message:"Invalid Credentials"
})

}

res.json({
success:true,
message:"Login Successful",
vendor:rows[0]
})

}
catch(err){

console.log(err)

res.json({
success:false,
message:"Login Failed"
})

}

})

module.exports = router