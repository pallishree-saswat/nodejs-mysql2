const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

//enable swagger
app.use("/docs", require("./swagger/swaggerRoute"));

//define routes
app.use("/api/v1", require("./routes/courseRoutes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
