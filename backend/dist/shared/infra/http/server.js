"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var ora_1 = __importDefault(require("ora"));
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
require("../typeorm");
require("../../container");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (error, request, response, _) {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
app.listen(process.env.PORT || 3333, function () {
    ora_1.default('server running').succeed();
});
