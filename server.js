/*
  NodeJS es6 BoilerPlate
 */

import app from './src/app'

app.listen(80, function () {
  console.log(`Listening on port 80. Started ${new Date().toString()}`);
});
