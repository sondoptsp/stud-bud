import { inputObjectType } from "nexus";

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});
