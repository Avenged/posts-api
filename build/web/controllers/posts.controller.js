"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const posts_service_1 = require("../../logic/posts.service");
const inversify_express_utils_1 = require("inversify-express-utils");
const passport_1 = __importDefault(require("passport"));
let PostsController = class PostsController {
    constructor(_postsService) {
        this._postsService = _postsService;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this._postsService.all();
            console.log(req.user);
            res.json({
                data: {
                    posts
                }
            });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this._postsService.findOne(req.params.id);
            return res.json({
                data: {
                    post
                }
            });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this._postsService.create(req.body);
                return res.sendStatus(201).json({
                    data: {
                        post
                    }
                });
            }
            catch (error) {
                return res.status(400).json({
                    data: 'The post already exists'
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const payload = req.body;
            const post = yield this._postsService.updateOne(id, payload);
            return res.json({
                data: {
                    post
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._postsService.deleteOne(req.params.id);
            return res.sendStatus(200);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "index", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "show", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/', passport_1.default.authenticate('jwt', { session: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "store", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)('/:id', passport_1.default.authenticate('jwt', { session: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id', passport_1.default.authenticate('jwt', { session: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "delete", null);
PostsController = __decorate([
    (0, inversify_express_utils_1.controller)('/posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
