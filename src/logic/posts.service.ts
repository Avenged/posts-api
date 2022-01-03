import { PostsRepository } from '../data/posts.repository';
import { injectable } from "inversify";
import { IPost } from '../data/Post';

@injectable()
export class PostsService {
    constructor(private readonly _postsRepo: PostsRepository){}

    public async all(): Promise<Array<IPost>> {
        const users = await this._postsRepo.all();
        return users;
    }

    public async findOne(id: string) {
        return this._postsRepo.findOne(id);
    }

    public async create(payload: any) {
        return this._postsRepo.create(payload);
    }

    public async updateOne(id: string, payload: any) {
        const post = await this.findOne(id);
        payload.updatedAt = Date.now();
        this._postsRepo.updateOne(post, payload);
        return post;
    }

    public async deleteOne(id: string) {
        const post = await this.findOne(id);
        if (post){
            await this._postsRepo.deleteOne(post._id);
        }
    }
}