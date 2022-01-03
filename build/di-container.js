"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const posts_service_1 = require("./logic/posts.service");
const posts_repository_1 = require("./data/posts.repository");
const db_service_1 = require("./data/db.service");
const inversify_1 = require("inversify");
exports.container = new inversify_1.Container({
    defaultScope: 'Singleton'
});
exports.container.bind(db_service_1.DBService).toSelf();
exports.container.bind(posts_repository_1.PostsRepository).toSelf();
exports.container.bind(posts_service_1.PostsService).toSelf();
