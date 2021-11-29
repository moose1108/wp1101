import express from "express";
import cors from "cors";
import router from "./routes/api.js";
import "./mongo.js";
const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})

