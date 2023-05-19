// api/run.js
import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


const fetchData = async(searchTerm) => {
    
const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

const browser = await puppeteer.launch({
  executablePath,
  args: edgeChromium.args,
  headless: false,
})

const page = await browser.newPage()
await page.goto('https://github.com')
  
  
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
      result: 'Error. Could not generate a poem.'
    })
  }


}
