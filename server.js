let app = require('./app');
let port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log("Listening on port " + port);
});