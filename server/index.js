import "dotenv/config";
import db from "./DB/config.js";
import app from "./app.js";

db()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
