// api/run.js
import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


const fetchData = async (searchTerm) => {

    try {

  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

  console.log('1');

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })

  console.log('2');

  const page = await browser.newPage()
  await page.goto('https://github.com')

      await browser.close();
      

    } catch (e) {
      console.log(e);
    }

  return 'Done';
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
      result: e
    })
  }


}