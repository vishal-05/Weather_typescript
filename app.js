"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    console.log(req.body.cityN);
    const query = req.body.cityN;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=273642005d7c7525f2659fd11ad4ac2d&units=metric";
    https_1.default.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weather_data = JSON.parse(data);
            const temp = weather_data.main.temp;
            const desc = weather_data.weather[0].description;
            const icon = weather_data.weather[0].icon;
            res.write("<h1> Today's weather is: " + desc + "</h1>");
            res.write("<h4>The temperature in " + query + " is: " + temp + " degree Celsius.</h4>");
            const url1 = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<img src=" + url1 + ">");
            res.send();
        });
    });
});
app.listen(8888, function () {
    console.log("Server started on 8888.");
});
