import * as express from "express";
import * as functions from "firebase-functions";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("Hey there2!"));
exports.app = functions.https.onRequest(app);
