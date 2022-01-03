import { PostsService } from './logic/posts.service';
import { PostsRepository } from './data/posts.repository';
import { DBService } from './data/db.service';
import { Container } from 'inversify';

export const container = new Container({
    defaultScope: 'Singleton'
});

container.bind(DBService).toSelf();
container.bind(PostsRepository).toSelf();
container.bind(PostsService).toSelf();