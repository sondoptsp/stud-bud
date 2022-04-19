"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQuery = void 0;
const nexus_1 = require("nexus");
const objects_1 = require("../objects");
exports.getUserQuery = (0, nexus_1.queryField)("getUser", {
    type: (0, nexus_1.nullable)(objects_1.User),
    resolve: async (_root, _args, ctx) => {
        const userId = ctx.req.session.userId;
        if (!userId)
            return null;
        return await ctx.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    },
});
//# sourceMappingURL=UserQueries.js.map