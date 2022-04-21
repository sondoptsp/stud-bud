import { mutationField, nonNull } from "nexus";
import { CreateProfileInput } from "../inputs";
import { ProfileOutput } from "../outputs";

export const createProfile = mutationField("createProfile", {
  type: ProfileOutput,
  args: {
    input: nonNull(CreateProfileInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_bio, profile_interest } = args.input;
    const { interest_name } = profile_interest;
    const userId = ctx.req.session.userId;

    try {
      const profile = await ctx.prisma.profile.create({
        data: {
          profile_bio,
          profile_interests: {
            create: {
              interest: {
                create: {
                  interest_name,
                },
              },
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Profile created successfully",
        },
        Profile: profile,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error ${error}`,
        },
      };
    }
  },
});
