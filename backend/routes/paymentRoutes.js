const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const db = require("../config/db"); // make sure this path is correct

/* CREATE RAZORPAY ORDER */

router.post("/create-order", async (req, res) => {

try {

const { amount } = req.body;

if (!amount) {
return res.status(400).json({ error: "Amount is required" });
}

/* Razorpay expects amount in paise */

const options = {
amount: amount, 
currency: "INR",
receipt: "receipt_" + Date.now()
};

const order = await razorpay.orders.create(options);

res.json(order);

} catch (error) {

console.error("Create Order Error:", error);

res.status(500).json({
error: "Failed to create Razorpay order"
});

}

});


/* VERIFY PAYMENT */

router.post("/verify-payment", async (req, res) => {

try {

const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
order_id
} = req.body;

if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
return res.status(400).json({ error: "Invalid payment data" });
}

/* CREATE SIGNATURE */

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
.update(body)
.digest("hex");

/* VERIFY SIGNATURE */

if (expectedSignature === razorpay_signature) {

/* UPDATE DATABASE */

try {

await db.query(
"UPDATE orders SET payment_status='Paid', payment_id=? WHERE id=?",
[razorpay_payment_id, order_id]
);

} catch (dbError) {

console.error("DB Update Error:", dbError);

}

/* SUCCESS RESPONSE */

res.json({
success: true,
message: "Payment verified"
});

} else {

res.status(400).json({
success: false,
message: "Invalid signature"
});

}

} catch (error) {

console.error("Verify Payment Error:", error);

res.status(500).json({
error: "Payment verification failed"
});

}

});

module.exports = router;