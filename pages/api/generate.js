const chromium = require('chrome-aws-lambda');



const fetchData = async(searchTerm) => {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = (await browser.pages())[0];

    //End blocking domains

    await page.goto('https://dream.ai/create');

  

  await browser.close();
  
    return 'done';
}




export default async function handler(req, res) {
  try {

    const data = req.body;

    const imageURls = await fetchData(data)
  
    res.status(200).json({
      result: [imageURls],
    })

    

  } catch (e) {
    res.status(500).json({
      result: 'Error. Could not generate a poem.'
    })
  }


}
