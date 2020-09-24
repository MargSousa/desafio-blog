const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req,res) => {
  res.send("Hello ...");
})

app.listen(port, (err) => {
  if(err) {
    console.log(err, "Not connected!")
  } else {
    console.log(`Listening on port ${port}...`);
  }
});