function getJSON() {
    return new Promise(resolve => {
        const request = require('request');

        let url = "https://randomuser.me/api";
        
        let options = { json: true };
        var string;
        request(url, options, (error, res, body) => {
            if (error) {
                resolve(error)
            };
        
            if (!error && res.statusCode == 200) {
                // do something with JSON, using the 'body' variable
                string = body.results[0].picture.large;
                console.log('from requestHTTP', string);
            };
            resolve(string);
        });
    });
  }
  
  async function asyncCall() {
    console.log('calling getJSON()');
    const result = await getJSON();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();