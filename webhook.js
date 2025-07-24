// webhook.js
import express from "express";
import { exec } from "child_process";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
    // أمان: تأكد أن البوش من GitHub
    if (!req.body || !req.body.ref) {
        return res.status(400).send("Bad Request: Missing ref in body");
    }
    const branch = req.body.ref;
    if (branch !== "refs/heads/main") return res.sendStatus(200);

    exec("./deploy.sh", (err, stdout, stderr) => {
        if (err) {
            console.error(stderr);
            return res.status(500).send("Deploy failed : " + stderr);
        }
        console.log(stdout);
        res.send("✅ Deployed!");
    });
});

app.listen(3003, () => console.log("🚀 Webhook server running on port 3003"));
