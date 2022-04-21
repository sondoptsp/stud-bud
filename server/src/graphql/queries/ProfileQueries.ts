import { nonNull, queryField } from "nexus";
import { ProfileWhereUniqueInput } from "../inputs";
import { Profile } from "../objects";

export const getProfile = queryField("getProfile", {
  type: Profile,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const profile_id = args.where.profile_id;
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        id: profile_id,
      },
      rejectOnNotFound: true,
    });

    console.log("Profile", profile);
    return profile;
  },
});
