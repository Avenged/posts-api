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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const db_service_1 = require("./db.service");
const inversify_1 = require("inversify");
let PostsRepository = class PostsRepository {
    constructor(_dbContext) {
        this._dbContext = _dbContext;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._dbContext.post.find({});
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.post.findOne({ url: id });
        });
    }
    create({ title, url, content, image }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.post.create({ title, url, content, image });
        });
    }
    updateOne(post, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            post.title = payload.title;
            post.image = payload.image;
            post.content = payload.content;
            post.updatedAt = payload.updatedAt;
            return post.save();
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dbContext.post.deleteOne({ _id: id });
        });
    }
};
PostsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [db_service_1.DBService])
], PostsRepository);
exports.PostsRepository = PostsRepository;
