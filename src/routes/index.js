/*
  Includes All routes
 */


const CommonRoutes = app => {
  app.get('/', function (req, res) {
    res.send("Api response")
  });
};

export {
  CommonRoutes
}
