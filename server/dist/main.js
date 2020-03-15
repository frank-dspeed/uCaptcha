"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
app.use(express_1.default.json({
    limit: "128kb"
}));
var api_1 = __importDefault(require("./routes/api"));
app.use("/api", api_1.default);
var fetchImagesJob_1 = require("./helpers/fetchImagesJob");
app.listen(8080, function () {
    fetchImagesJob_1.fetchImagesJob.start();
    // fetchImages({radius: 1000});
    console.log("Server started");
    console.log("=========================================================");
});
