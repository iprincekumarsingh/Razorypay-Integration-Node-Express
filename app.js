const express = require("express");
const Razorpay = require("razorpay");
const app = express();
app.use(express.static("./public"));
app.use(express.json());

app.post("/order", async (req, res) => {
    const amount = req.body.amount;

    var instance = new Razorpay({
        key_id: "rzp_test_jHO9jAlFxspPlb",
        key_secret: "IuktqSAh5lv1CAq0v7Uoziem",
    });

    var options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
    };

    // instance.orders.create({
    //     amount: amount * 100,
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //         key1: "value3",
    //         key2: "value2",
    //     },
    // });

    const myOrder = await instance.orders.create(options);

    res.status(201).json({
        message: "Order created",
        order: myOrder,
        amount
    });
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
module.exports = app;
