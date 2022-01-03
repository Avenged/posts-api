import "reflect-metadata";
import "./web/controllers/posts.controller";
import "./web/controllers/users.controller";
import { App } from './web/application';

console.clear();

export async function bootstrap() {
    new App().setup();
}

bootstrap();