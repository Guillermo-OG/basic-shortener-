import { Router } from 'express';
import { TestController } from '../controllers';

export class TestRouter {
    public readonly router: Router;
    private readonly controller: TestController;
    constructor() {
        this.router = Router();
        this.controller = new TestController();
        this.config();
    }

    private config(): void {
        this.router.get('/', this.controller.test);
    }
}
