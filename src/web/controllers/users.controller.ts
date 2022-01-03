import { PostsService } from '../../logic/posts.service';
import { controller, httpDelete, httpGet, httpPatch, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import User, { IUser } from '../../data/User';
import jwt from 'jsonwebtoken';

function createToken(user: IUser): string {
    return jwt.sign({ id: user.id, email: user.email }, 'secret_token_here', {
        expiresIn: 86400,
    });
}

@controller('/users')
export class UsersController {
    constructor (private readonly _postsService: PostsService) {}

    @httpPost('/signup')
    async index(req: Request, res: Response) : Promise<Response> {
        if (!req.body.email || !req.body.password){
            return res.status(400);
        }

        const user = await User.findOne({ email: req.body.email });
        if (user){
            return res.status(400).json({ data: 'The user already exists' });
        }

        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json(newUser);
    }

    @httpPost('/signin')
    async store(req: Request, res: Response) : Promise<Response> {
        if (!req.body.email || !req.body.password){
            return res.status(400);
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user){
            return res.status(400).json({ data: 'The user does not exists' });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            return res.status(200).json({ token: createToken(user) });
        }

        return res.status(400).json({
            data: 'The email or password are incorrect',
        })
    }
}