"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const nexus_1 = require("nexus");
const Profile_1 = require("./Profile");
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nullable.field("profile", {
            type: Profile_1.Profile,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.user
                    .findUnique({
                    where: { id: root.id },
                    rejectOnNotFound: true,
                })
                    .profile();
            },
        });
    },
});
//# sourceMappingURL=User.js.map