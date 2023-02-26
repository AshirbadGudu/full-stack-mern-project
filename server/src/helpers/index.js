const fs = require("fs");
const setupRoutes = (app) => {
  fs.readdir("src/routes", (err, files) => {
    if (err) throw err;
    files.forEach((filename) => {
      const route = filename.split(".")[0];
      const path = `../routes/${route}.routes`;
      app.use(`/api/v1/${route}`, require(path));
    });
  });
};

module.exports = {
  setupRoutes,
};
