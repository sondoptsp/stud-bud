"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const prisma_1 = require("./prisma");
async function createContext(request) {
    const context = Object.assign(Object.assign({}, request), { req: request.req, res: request.res, prisma: prisma_1.prisma });
    return context;
}
exports.createContext = createContext;
//# sourceMappingURL=context.js.map