"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./config/dbConnection");
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => {
    (0, dbConnection_1.connectDB)();
    console.log(`Server listening on port ${port}!`);
});
//# sourceMappingURL=App.js.map