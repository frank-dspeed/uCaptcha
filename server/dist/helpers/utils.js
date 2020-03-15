"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function randomBytes(length) {
    var bytes = crypto_1.default.randomBytes(length);
    var chars = [];
    for (var i = 0; i < length; i++) {
        chars.push(alphabets[bytes[i] % alphabets.length]);
    }
    return chars.join("");
}
exports.randomBytes = randomBytes;
