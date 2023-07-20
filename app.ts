import express, { Request, Response } from "express";
import https from "https";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req: Request, res: Response) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req: Request, res: Response) {
  console.log(req.body.cityN);
  const query: string = req.body.cityN;
  const url: string =
    "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=273642005d7c7525f2659fd11ad4ac2d&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weather_data: any = JSON.parse(data);
      const temp: number = weather_data.main.temp;
      const desc: string = weather_data.weather[0].description;
      const icon: string = weather_data.weather[0].icon;
      res.write("<h1> Today's weather is: " + desc + "</h1>");
      res.write(
        "<h4>The temperature in " + query + " is: " + temp + " degree Celsius.</h4>"
      );
      const url1: string =
        "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + url1 + ">");
      res.send();
    });
  });
});

app.listen(8888, function() {
  console.log("Server started on 8888.");
});
