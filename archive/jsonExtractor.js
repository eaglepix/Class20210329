const debug = require('debug')('jsonExtractor');

const https = require('https');

let url = "https://randomuser.me/api/";
// https://www.reddit.com/r/popular.json
var picture;

https.get(url, (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            // do something with JSON
            picture = json.results[0].picture.large;
            console.log('res-inner:', picture);

        } catch (error) {
            console.error(error.message);
        };
    });
}).on("error", (error) => {
    console.error(error.message);
});

console.log(picture);

