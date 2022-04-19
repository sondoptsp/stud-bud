import { objectType } from "nexus";

export const ErrorFieldOutput = objectType({
  name: "ErrorFieldOutput",
  definition(t) {
    t.nullable.string("field");
    t.nullable.string("message");
  },
});
