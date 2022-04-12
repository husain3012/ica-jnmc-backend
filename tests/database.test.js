require("dotenv").config();
const db = require("../utils/database");
test("database", () => {
  expect(db).toBeTruthy();
  expect(db.sync).toBeTruthy();
});
