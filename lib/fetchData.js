import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'


export default async function fetchData(){

    const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

    const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

    const browser = await puppeteer.launch({
        executablePath,
        args: edgeChromium.args,
        headless: false,
    })

    const page = await browser.newPage()
    await page.goto('https://github.com');

    await browser.close();

    return 'Done';
}