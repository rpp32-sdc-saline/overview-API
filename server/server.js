const makeApp = require("./app");
const { pool } = require("./db");
const port = 3000;

const app = makeApp(pool);

app.listen(port, () => console.log(`listening on port ${port}`));
