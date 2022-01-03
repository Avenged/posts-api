"use strict";
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
exports.bootstrap = void 0;
require("reflect-metadata");
require("./web/controllers/posts.controller");
require("./web/controllers/users.controller");
const application_1 = require("./web/application");
console.clear();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        new application_1.App().setup();
    });
}
exports.bootstrap = bootstrap;
bootstrap();
