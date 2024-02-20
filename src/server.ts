import express, { Express } from 'express';
import Database from './config/database';
import env from './config/env';
import { HealthRouter, ShortenerRouter } from './routes';
import { TestRouter } from './routes/test.routes';

class Server {
    private app: Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(env.SERVER_PORT);
    }

    public async start(): Promise<void> {
        await this.config();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    private async config(): Promise<void> {
        await Database.getInstance().start();
        this.app.use(express.text());
        this.app.use(express.json());
        this.routes();
        console.log(env);
    }

    private routes(): void {
        this.app.use('/health', new HealthRouter().router);
        this.app.use('/test', new TestRouter().router);
        this.app.use('/short', new ShortenerRouter().router);
    }
}

export default new Server();
