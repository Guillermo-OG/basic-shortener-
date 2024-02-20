import { Router } from 'express';
import { ShortenerController } from '../controllers';

export class ShortenerRouter {
    public readonly router: Router;
    private readonly controller: ShortenerController;
    constructor() {
        this.router = Router();
        this.controller = new ShortenerController();
        this.config();
    }

    private config(): void {
        this.router.post('/shorten', this.controller.shortenUrl);
        this.router.get('/top', this.controller.getTopUrls);
        this.router.get('/:shortUrl', this.controller.redirectToOriginalUrl);
    }
}
