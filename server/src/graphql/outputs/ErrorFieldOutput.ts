import { objectType } from "nexus";

export const ErrorFieldOutput = objectType({
  name: "ErrorFieldOutput",
  definition(t) {
    t.nonNull.string("field");
    t.nonNull.string("message");
  },
});
