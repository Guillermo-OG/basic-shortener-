import { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
// import { AuthMiddleware } from '../middleware';

export class HealthRouter {
    public readonly router: Router;
    // private readonly authMiddleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        // this.authMiddleware = new AuthMiddleware();
        this.config();
    }

    private config(): void {
        // this.router.use(this.authMiddleware.authenticate);

        this.router.get('/', (_req: Request, res: Response, next: NextFunction) => {
            try {
                const dbConnected = !!mongoose.connection?.host;
                let status = 200,
                    message = 'Database connected';

                if (!dbConnected) {
                    status = 500;
                    message = 'Database not connected';
                }
                res.status(status).json({
                    database: message,
                });
            } catch (error) {
                next(error);
            }
        });
    }
}
