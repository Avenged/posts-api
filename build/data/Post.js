"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
exports.postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, },
    url: { type: String, required: true, unique: true, lowercase: true, },
    content: { type: String, required: true, },
    image: { type: String, required: false, },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
});
