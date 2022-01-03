import { Schema, model } from 'mongoose';

export interface IPost extends Document {
    title: string,
    url: string,
    content: string,
    image: string,
    createdAt: Date,
    updatedAt: Date,
}

export const postSchema = new Schema({
    title: { type: String, required: true, },
    url: { type: String, required: true, unique: true, lowercase: true, },
    content: { type: String, required: true, },
    image: { type: String, required: false, },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
});

export type Post = typeof postSchema;