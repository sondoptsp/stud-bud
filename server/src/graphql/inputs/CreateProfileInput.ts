import { inputObjectType } from "nexus";
import { CreateInterestInput } from "./CreateInterestInput";

export const CreateProfileInput = inputObjectType({
  name: "CreateProfileInput",
  definition(t) {
    t.nonNull.string("profile_bio");
    // t.nonNull.string("interest_name");
    // t.nonNull.string("interest_description");

    t.nonNull.field("profile_interest", {
      type: CreateInterestInput,
    });
  },
});
