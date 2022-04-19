import { objectType } from "nexus";
import { ProfileInterest } from "./ProfileInterest";

export const Interest = objectType({
  name: "Interest",
  definition(t) {
    t.nonNull.id("id");
    t.string("name");
    t.nullable.string("description");
    t.nonNull.list.nonNull.field("profileInterests", {
      type: ProfileInterest,
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
