import { objectType } from "nexus";
import { Profile } from "../objects";
import { IOutput } from "./IOutput";

export const ProfileOutput = objectType({
  name: "ProfileOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("Profile", {
      type: Profile,
    });
  },
});
