import { DBService } from './db.service';
import { injectable } from "inversify";
import { IPost } from '../data/Post';

@injectable()
export class PostsRepository {
    constructor(private readonly _dbContext: DBService) {}

    async all(): Promise<Array<IPost>> {
        return await this._dbContext.post.find({});
    }

    async findOne(id: string) {
        return this._dbContext.post.findOne({ url: id });
    }

    async create({ 
        title, 
        url, 
        content, 
        image 
    }: { 
        title: string, 
        url: string, 
        content: string, 
        image: string 
    }) {
        return this._dbContext.post.create({ title, url, content, image });
    }

    async updateOne(post: any, payload: any) {
        post.title = payload.title;
        post.image = payload.image;
        post.content = payload.content;
        post.updatedAt = payload.updatedAt;
        return post.save();
    }

    async deleteOne(id: string){
        await this._dbContext.post.deleteOne({ _id: id });
    }
}