import { objectType } from "nexus";
import { Interest } from "./Interest";
import { Profile } from "./Profile";

export const ProfileInterest = objectType({
  name: "ProfileInterest",
  definition(t) {
    t.nonNull.id("profile_id");
    t.nonNull.id("interest_id");
    t.nonNull.field("profile", {
      type: Profile,
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
      type: Interest,
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
