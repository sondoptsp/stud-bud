import { inputObjectType } from "nexus";

export const CreateInterestInput = inputObjectType({
  name: "CreateInterestInput",
  definition(t) {
    t.nonNull.string("interest_name");
  },
});
