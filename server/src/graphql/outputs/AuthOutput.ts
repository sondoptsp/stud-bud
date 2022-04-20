import { objectType } from "nexus";
import { User } from "../objects";
import { ErrorFieldOutput } from "./ErrorFieldOutput";
import { IOutput } from "./IOutput";

export const AuthOutput = objectType({
  name: "AuthOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("User", {
      type: User,
    });
    t.nullable.list.nonNull.field("ErrorFieldOutput", {
      type: ErrorFieldOutput,
    });
  },
});
