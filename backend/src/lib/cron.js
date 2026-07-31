import { CronJob } from 'cron';
import http from "node:http";
import https from "node:https";


const job = new CronJob ("*/14 * * * *", function() {
    const base = process.env.FRONTEND_URL;
    if (!base) return;
    const url = new URL("/health", base).href;
    const client = url.startsWith("https:") ? https : http;

    client
       .get(url, (res) => {
          if (res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("GET request failed with status code:", res.statusCode);
       })
       .on("error", (e) => console.error("Error sending GET request:", e.message));
});
       export default job;