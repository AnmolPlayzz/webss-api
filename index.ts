import express, {Express, NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();
import puppeteer, { Browser } from "puppeteer";
const keyListRaw: string | undefined = process.env.API_KEY
let keyList: string[];
const APIBlocking: number = Number(process.env.API_BLOCKING)

if (keyListRaw) {
    keyList = keyListRaw.split(",");
} else {
    console.log("[⚠] WARNING: No generated API key found.");
}
const app: Express = express();

let browser: Browser;

puppeteer.launch({
    timeout: 0,
    args: ['--no-sandbox'],
}).then(data => browser=data)


function waitFor(time: number): Promise<void>{
    return new Promise((resolve)=>{
        setTimeout(resolve, time);
    });
}
const PORT: string | undefined = process.env.PORT;

const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth: string | undefined = req.headers['authorization']
    console.log(auth)
    if (APIBlocking===1) {
        if (auth) {
            const key = auth.split(' ')[1]
            if(keyList.filter((actualKey: string): boolean => actualKey === key)) {
                next()
            } else {
                res.status(403).send('Error: Unauthorized.');
            }
        } else {
            res.status(403).send('Error: Unauthorized.');
        }
    }else{
        next()
    }
}

app.use(express.json(),apiMiddleware);

app.post("/screenshot", async (request: Request, response: Response) => {
    console.log(request.body)
    const { url,wait }: {
        url: string,
        wait: number,
    } = request.body
    console.log(url, wait)
    try {

        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1,
        });
        await page.goto(url);
        await waitFor(wait)
        const screenshotBuffer = await page.screenshot()
        response.set('Content-Type', 'image/png');
        response.status(200).send(screenshotBuffer)
    } catch (error) {
        console.error('Error taking screenshot:', error);
        response.status(500).json({
            error: "Failed to fetch screenshot",
        })
    }
});

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});