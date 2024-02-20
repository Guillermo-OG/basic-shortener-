import mongoose, { Document } from 'mongoose';

export interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    shortUrlCode: string;
    accessCount: number;
    title?: string;
    createdAt?: Date;
}

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    shortUrlCode: { type: String, required: true, unique: true },
    accessCount: { type: Number, required: true, default: 0 },
    title: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const UrlModel = mongoose.model<IUrl>('Url', urlSchema);
