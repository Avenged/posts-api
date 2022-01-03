import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { IPost, postSchema } from './Post';

@injectable()
export class DBService {
    private _db: typeof mongoose;

    constructor() {
        this._db = mongoose;
    }

    async connect() {
        const MONGO_URI = 'mongodb://127.0.0.1:27017/';
        this._db = await mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            autoIndex: true,
        });
    
        console.log('Connected to database');
    }

    get post() {
        return this._db.model<IPost>('Post', postSchema);
    }
}