import { PostsService } from '../../logic/posts.service';
import { controller, httpDelete, httpGet, httpPatch, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { IUser } from '../../data/User';
import passport from 'passport';

@controller('/posts')
export class PostsController {
    constructor (private readonly _postsService: PostsService) {}

    @httpGet('/')
    public async index(req: Request, res: Response) {
        const posts = await this._postsService.all();
        console.log(req.user);
        res.json({
            data: {
                posts
            }
        });
    }

    @httpGet('/:id')
    public async show(req: Request, res: Response) : Promise<Response> {
        const post = await this._postsService.findOne(req.params.id);
        return res.json({
            data: {
                post
            }
        });
    }

    @httpPost('/', passport.authenticate('jwt', { session: false }))
    public async store(req: Request, res: Response) : Promise<Response> {
        try {
            const post = await this._postsService.create(req.body);
            return res.sendStatus(201).json({
                data: {
                    post
                }
            });
        } catch (error) {
            return res.status(400).json({
                data: 'The post already exists'
            });
        }
    }

    @httpPatch('/:id', passport.authenticate('jwt', { session: false }))
    public async update(req: Request, res: Response) : Promise<Response> {
        const { id } = req.params;
        const payload = req.body;

        const post = await this._postsService.updateOne(id, payload);

        return res.json({
            data: {
                post
            }
        })
    }

    @httpDelete('/:id', passport.authenticate('jwt', { session: false }))
    public async delete(req: Request, res: Response) : Promise<Response> {
        await this._postsService.deleteOne(req.params.id);
        return res.sendStatus(200);
    }
}