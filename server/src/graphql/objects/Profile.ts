import { objectType } from "nexus";
import { ProfileInterest } from "./ProfileInterest";

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.id("id");
    t.nullable.string("bio");
    t.nonNull.list.nonNull.field("profileInterests", {
      type: ProfileInterest,
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
