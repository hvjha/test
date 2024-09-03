const http = require("http");
const server = http.createServer();
const getSubstrings = require("./utils/stringformatting.js");
const TimeStory = require("./utils/TimeStory");
const httpGetRequest = require("./utils/httpGet.js");
const port = process.argv[2] || '8080';

server.on("request", async (req, res) => {
    try {
        if (req.url === '/getTimeStories' && req.method === 'GET') {
            const html = await httpGetRequest("https://www.time.com");
            let substrings = await getSubstrings(html);
            let data = [];

            for (let htmlsubstring of substrings) {
                const story = new TimeStory(htmlsubstring);
                data.push({
                    title: story.getTitle(),
                    link: story.getLink()
                })
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                msg: 'The requested URL was not found',
                code: 404
            }))
            res.end();
        }
    }
    catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            msg: 'Encountered Server Error',
            code: 500
        }))
        res.end();
    }
})

server.listen(port, async () => {
    console.log(`Listening at port ${port}`);
    console.log(`Visit http://localhost:${port}/getTimeStories`);
})
