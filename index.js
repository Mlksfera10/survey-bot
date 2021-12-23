const URL = https://offers.cpx-research.com/index.php?app_id=7639&ext_user_id=fsid-2138633-186bb0442a';
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { question_1, question_2, submit } = require('./utils');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/fill', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    const result = {
      question_1: await question_1(page),
      question_2: await question_2(page),
      submitted: await submit(page),
    };
    console.log(result);
    // Close headless chrome
    await browser.close();

    // Send response
    return res.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
});
