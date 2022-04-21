import { objectType } from "nexus";
import { Interest } from "../objects";
import { IOutput } from "./IOutput";

export const InterestOutput = objectType({
  name: "InterestOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("Interest", {
      type: Interest,
    });
  },
});
