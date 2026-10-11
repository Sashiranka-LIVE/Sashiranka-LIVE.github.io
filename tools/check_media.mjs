import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();

for (const path of ['/video/hero-bg.mp4', '/video/contact-bg.mp4']) {
  await page.goto('http://127.0.0.1:5173' + path);
  const info = await page.evaluate(() => {
    const v = document.querySelector('video');
    if (!v) return { noVideo: true };
    return { w: v.videoWidth, h: v.videoHeight, d: v.duration };
  });
  console.log(path, info);
}

await browser.close();
