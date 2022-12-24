import * as express from "express";
import * as functions from "firebase-functions";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("Hello world 789!"));
exports.app = functions.https.onRequest(app);
