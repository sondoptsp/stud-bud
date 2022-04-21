import { inputObjectType } from "nexus";

export const ProfileWhereUniqueInput = inputObjectType({
  name: "ProfileWhereUniqueInput",
  definition(t) {
    t.nonNull.id("profile_id");
  },
});
