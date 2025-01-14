const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://blogAdmin:enesadmin@blogcluster.hmrwt.mongodb.net/newsletterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Create Schema and Model
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Routes
app.post("/subscribe", async (req, res) => {
    const { email } = req.body;
    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: "Subscribed successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Email already subscribed." });
        } else {
            res.status(500).json({ message: "Error subscribing." });
        }
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
