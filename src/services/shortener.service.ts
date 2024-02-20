import { UrlModel } from '../models/url.model';
import shortid from 'shortid';
import validUrl from 'valid-url';
import env from '../config/env';
import axios from 'axios';
import cheerio from 'cheerio';

export class ShortenerService {
    private static instance: ShortenerService;

    private constructor() {}

    public static getInstance(): ShortenerService {
        if (!ShortenerService.instance) {
            ShortenerService.instance = new ShortenerService();
        }
        return ShortenerService.instance;
    }

    public async createShortUrl(originalUrl: string): Promise<any> {
        if (!validUrl.isUri(originalUrl)) {
            throw new Error('Invalid URL');
        }

        const shortUrlCode = shortid.generate();
        const shortUrl = `${env.BASE_URL}/${shortUrlCode}`;

        let title: string | undefined;
        try {
            const response = await axios.get(originalUrl);
            const $ = cheerio.load(response.data);
            title = $('title').text();
        } catch (error) {
            console.error('Error crawling URL:', error);
        }

        const url = await UrlModel.findOne({ originalUrl });
        if (url) {
            return url;
        } else {
            const newUrl = await UrlModel.create({ originalUrl, shortUrl, shortUrlCode, title });
            return newUrl;
        }
    }

    public async getOriginalUrl(shortUrlCode: string): Promise<string | null> {
        const url = await UrlModel.findOne({ shortUrlCode });
        if (url) {
            url.accessCount += 1;
            await url.save();
            return url.originalUrl;
        } else {
            return null;
        }
    }

    public async getTopUrls(limit: number = 100): Promise<any[]> {
        return UrlModel.find().sort({ accessCount: -1 }).limit(limit);
    }
}
