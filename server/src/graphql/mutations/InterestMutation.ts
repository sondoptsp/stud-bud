import { mutationField, nonNull } from "nexus";
import { CreateInterestInput, ProfileWhereUniqueInput } from "../inputs";
import { InterestOutput } from "../outputs";

export const createInterest = mutationField("createInterest", {
  type: InterestOutput,
  args: {
    input: nonNull(CreateInterestInput),
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { interest_name } = args.input;
      const { profile_id } = args.where;

      const interest = await ctx.prisma.interest.create({
        data: {
          interest_name,
          profile_interests: {
            create: {
              profile: {
                connect: {
                  id: profile_id,
                },
              },
            },
          },
        },
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Interest created successfully",
        },
        Interest: interest,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error ${JSON.stringify(error)}`,
        },
      };
    }
  },
});
