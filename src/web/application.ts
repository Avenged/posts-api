import express from 'express';
import { DBService } from '../data/db.service';
import { container } from '../di-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from './lib/abstract-application';
import passport from 'passport';
import passportMiddleware from '../web/middlewares/passport';

export class App extends Application {
    async setup() {
        const _db = container.get(DBService);
        await _db.connect();

        const server = new InversifyExpressServer(container);
        server.setConfig((app) => {
            app.use(express.json());
            app.use(passport.initialize());
            passport.use(passportMiddleware);
        });
    
        const app = server.build();

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
        });
    }
}