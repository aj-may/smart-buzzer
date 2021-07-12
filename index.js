const express = require('express');
const Gpio = require('onoff').Gpio;
const delay = require('delay');
const app = express();
const port = 3000;

let pin;

if (Gpio.accessible) {
  pin = new Gpio(8, 'out');
} else {
  pin = {
    write: async function(value) {
      console.log(`Set GPIO: ${value}`);
    },
  };
}

app.get('/buzz', async (req, res) => {
  try {
    await pin.write(1);
    await delay(500);
    await pin.write(0);
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
