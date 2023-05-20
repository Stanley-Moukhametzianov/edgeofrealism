// api/run.js
import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


const fetchData = async (searchTerm) => {

  var returnObj = '';

    try {

  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE


  const browser = await puppeteer.launch({
    executablePath,
    args: [
      ...edgeChromium.args,
      '--disable-accelerated-2d-canvas',
      '--single-process',
      '--disable-gpu',
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-setuid-sandbox',
      '--disable-speech-api',
      '--disable-sync',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain',
      '--window-size=1920,1080',
        '--headless'
      ]
    ,
    headless: false,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  })


      const page = (await browser.pages())[0];



      // Array of third-party domains to block
      const blockedDomains = [
        'https://pagead2.googlesyndication.com',
        'https://creativecdn.com',
        'https://www.googletagmanager.com',
        'https://cdn.krxd.net',
        'https://adservice.google.com',
        'https://cdn.concert.io',
        'https://z.moatads.com',
        'https://cdn.permutive.com',
        'https://googlesyndication.com',
      ];
      await page.setRequestInterception(true);


      page.on('request', (request) => {
        const url = request.url();
        if (blockedDomains.some((d) => url.startsWith(d))) {
          request.abort();
        } else {
          request.continue();
        }
      });

      //End blocking domains

      await page.goto('https://dream.ai/create');

      await page.waitForXPath('//*[@id="blur-overlay"]/div/div[2]/div[1]/div[1]/div/div[2]/div[1]/div[1]/input');


      await page.type('input', 'Rain');



        const elements = await page.$x('//*[@id="blur-overlay"]/div/div[2]/div[1]/div[2]/button');
        await elements[0].click();


        await page.waitForXPath('//*[@id="blur-overlay"]/div/div[2]/div[2]/div[1]/div/div/div[1]/div/div/div/div[4]/img')

        returnObj = await page.evaluate(() => {
          const el = document.querySelectorAll('img');
          return el[el.length - 1].src;

        });

      console.log(returnObj);

      await browser.close();
      

    } catch (e) {
      console.log(e);
    }

  return returnObj;
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