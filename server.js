
const express = require("express");
const sgMail = require("@sendgrid/mail"); 
const dotenv = require("dotenv");

dotenv.config();

const app = express();


sgMail.setApiKey(process.env.API_key);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", async (req, res) => {
    const userEmail = req.body.email;

    const msg = {
        to: userEmail, 
        from: "rudra182ff@gmail.com", 
        subject: "Welcome to DEV@Deakin!",
        text: "Thank you for subscribing to our Daily Insider newsletter.",
        html: "<strong>Thank you for subscribing to our Daily Insider newsletter.</strong>",
    };

    try {
        
        const response = await sgMail.send(msg);
        console.log(response[0].statusCode);
        res.status(200).send("Successfully subscribed! Check your inbox.");

    } catch (error) {
        console.error(error);
        res.status(500).send("There was an error sending the email.");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});