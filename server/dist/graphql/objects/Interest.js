"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interest = void 0;
const nexus_1 = require("nexus");
const ProfileInterest_1 = require("./ProfileInterest");
exports.Interest = (0, nexus_1.objectType)({
    name: "Interest",
    definition(t) {
        t.nonNull.id("id");
        t.string("name");
        t.nullable.string("description");
        t.nonNull.list.nonNull.field("profileInterests", {
            type: ProfileInterest_1.ProfileInterest,
            resolve: async (root, _args, ctx) => {
                return await ctx.prisma.interest
                    .findUnique({
                    where: {
                        id: root.id,
                    },
                    rejectOnNotFound: true,
                })
                    .profile_interests();
            },
        });
    },
});
//# sourceMappingURL=Interest.js.map