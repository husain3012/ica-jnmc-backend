const db = require("../utils/database");
test("database", () => {
  console.log(process.env.DATABASE_URL);
  expect(db).toBeTruthy();
  expect(db.sync).toBeTruthy();
});
