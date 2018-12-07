
const puppeteer = require('puppeteer');
const APP = "http://localhost:8080/";

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({
        //headless: false,
        //slowMo: 40,
        //args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});
  
afterAll(() => {
    browser.close();
});

describe("Acceptance testing, 100% decision coverage", () => {
    test("True path through the if-statement", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '185');
        await page.click("#kg");
        await page.type("#kg", '85');
        await page.select("[data-testid=gender-selector]", "female");
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);
        
        const mainTitleText = await page.$eval("strong[data-testid=bmi]", el => el.textContent);
        expect(mainTitleText).toEqual("24.84");
    });

    test("False path through the if-statement", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '0');
        await page.click("#kg");
        await page.type("#kg", '85');
        await page.select("[data-testid=gender-selector]", "female");
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);
        
        const mainTitleText = await page.$eval("h1[data-testid=landingPageTitle]", el => el.textContent);
        expect(mainTitleText).toEqual("BMI - Calculator");
    });
  });

describe("Acceptance testing, 100% condition coverage", () => {

});

describe("Test driven development, BMI Categories", () => {
    test("Testing the Underweight category", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '41');
        await page.select("[data-testid=gender-selector]", "female");
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=bmi-category]", el => el.textContent);
        expect(categoryText).toEqual("Underweight");
    });

    test("Testing the Healthy weight category", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '50');
        await page.select("[data-testid=gender-selector]", "female");
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=bmi-category]", el => el.textContent);
        expect(categoryText).toEqual("Healthy weight");
    });

    test("Testing the Overweight category", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '60');
        await page.select("[data-testid=gender-selector]", "female");
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=bmi-category]", el => el.textContent);
        expect(categoryText).toEqual("Overweight");
    });

    test("Testing the Obese category", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "female");
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=bmi-category]", el => el.textContent);
        expect(categoryText).toEqual("Obese");
    });
});

describe("Test driven development, Waist-to-hip ratio", () => {
    test("Testing normal weight waist to hip ratio for women", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "female");
        await page.click("#waist");
        await page.type("#waist", '79');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=waist-to-hip-ratio]", el => el.textContent);
        expect(categoryText).toEqual("Normal weight");
    });

    test("Testing over-weight waist to hip ratio for women", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "female");
        await page.click("#waist");
        await page.type("#waist", '82');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=waist-to-hip-ratio]", el => el.textContent);
        expect(categoryText).toEqual("Over-weight");
    });
    
    test("Testing obesity waist to hip ratio for women", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "female");
        await page.click("#waist");
        await page.type("#waist", '85');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=waist-to-hip-ratio]", el => el.textContent);
        expect(categoryText).toEqual("Obesity");
    });

    test("Testing normal weight waist to hip ratio for men", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "male");
        await page.click("#waist");
        await page.type("#waist", '89');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=waist-to-hip-ratio]", el => el.textContent);
        expect(categoryText).toEqual("Normal weight");
    });

    test("Testing over-weight waist to hip ratio for men", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "male");
        await page.click("#waist");
        await page.type("#waist", '95');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=waist-to-hip-ratio]", el => el.textContent);
        expect(categoryText).toEqual("Over-weight");
    });

    test("Testing obesity waist to hip ratio for men", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "male");
        await page.click("#waist");
        await page.type("#waist", '100');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const categoryText = await page.$eval("strong[data-testid=waist-to-hip-ratio]", el => el.textContent);
        expect(categoryText).toEqual("Obesity");
    });

    test("Testing the default value of the gender dropdown", async () => {
        await page.goto(APP);
        await page.waitForSelector(".panel-body");
        await page.click("#cm");
        await page.type("#cm", '150');
        await page.click("#kg");
        await page.type("#kg", '70');
        await page.select("[data-testid=gender-selector]", "choose");
        await page.click("#waist");
        await page.type("#waist", '100');
        await page.click("#hip");
        await page.type("#hip", '100');
        await Promise.all([
            page.click("input[type=submit]"),
            page.waitForNavigation()
        ]);

        const mainTitleText = await page.$eval("h1[data-testid=landingPageTitle]", el => el.textContent);
        expect(mainTitleText).toEqual("BMI - Calculator");
    });
});

/*
Men	            Women
< 0.90	        < 0.80	        normal weight
0.90 to 0.99	0.80 to 0.84	over-weight
1.0+	        0.85+	        obesity
*/
