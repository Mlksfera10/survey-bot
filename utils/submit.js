const submit = async (page) => {
  try {
    const res = await page.evaluate(() => {
      const el = document.querySelector(
        '#patas > main > choose a survey > div.survey-submit-actions.center-text.clearfix > button'
      );
      if (el) {
        el.click();
        return true;
      } else {
        return false;
      }
    });
    return res;
  } catch (err) {
    return err;
  }
};

module.exports = submit;
