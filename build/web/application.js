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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const db_service_1 = require("../data/db.service");
const di_container_1 = require("../di-container");
const inversify_express_utils_1 = require("inversify-express-utils");
const abstract_application_1 = require("./lib/abstract-application");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../web/middlewares/passport"));
class App extends abstract_application_1.Application {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const _db = di_container_1.container.get(db_service_1.DBService);
            yield _db.connect();
            const server = new inversify_express_utils_1.InversifyExpressServer(di_container_1.container);
            server.setConfig((app) => {
                app.use(express_1.default.json());
                app.use(passport_1.default.initialize());
                passport_1.default.use(passport_2.default);
            });
            const app = server.build();
            app.listen(process.env.PORT || 3000, () => {
                console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
            });
        });
    }
}
exports.App = App;
