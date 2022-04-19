"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const nexus_1 = require("nexus");
const ProfileInterest_1 = require("./ProfileInterest");
exports.Profile = (0, nexus_1.objectType)({
    name: "Profile",
    definition(t) {
        t.nonNull.id("id");
        t.nullable.string("bio");
        t.nonNull.list.nonNull.field("profileInterests", {
            type: ProfileInterest_1.ProfileInterest,
            resolve: async (root, _args, ctx) => {
                return await ctx.prisma.profile
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
//# sourceMappingURL=Profile.js.map