"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInterest = void 0;
const nexus_1 = require("nexus");
const Interest_1 = require("./Interest");
const Profile_1 = require("./Profile");
exports.ProfileInterest = (0, nexus_1.objectType)({
    name: "ProfileInterest",
    definition(t) {
        t.nonNull.id("profile_id");
        t.nonNull.id("interest_id");
        t.nonNull.field("profile", {
            type: Profile_1.Profile,
            resolve: async (root, _args, ctx) => {
                return await ctx.prisma.profile.findUnique({
                    where: {
                        id: root.profile_id,
                    },
                    rejectOnNotFound: true,
                });
            },
        });
        t.nonNull.field("interest", {
            type: Interest_1.Interest,
            resolve: async (root, _args, ctx) => {
                return await ctx.prisma.interest.findUnique({
                    where: {
                        id: root.interest_id,
                    },
                    rejectOnNotFound: true,
                });
            },
        });
    },
});
//# sourceMappingURL=ProfileInterest.js.map