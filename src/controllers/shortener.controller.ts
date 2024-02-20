import { NextFunction, Request, Response } from 'express';
import { ShortenerService } from '../services/shortener.service';

export class ShortenerController {
    public async shortenUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
        const service = ShortenerService.getInstance();
        try {
            const { originalUrl } = req.body;
            const shortUrl = await service.createShortUrl(originalUrl);
            res.status(201).json({ shortUrl });
        } catch (error) {
            next(error);
        }
    }

    public async redirectToOriginalUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
        const service = ShortenerService.getInstance();
        try {
            const { shortUrl } = req.params;
            const originalUrl = await service.getOriginalUrl(shortUrl);
            if (originalUrl) {
                res.redirect(originalUrl);
            } else {
                res.status(404).json({ message: 'URL not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    public async getTopUrls(_req: Request, res: Response, next: NextFunction): Promise<void> {
        const service = ShortenerService.getInstance();
        try {
            const topUrls = await service.getTopUrls();
            res.status(200).json(topUrls);
        } catch (error) {
            next(error);
        }
    }
}
