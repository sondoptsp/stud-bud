import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "nexus-typegen.ts"),
    schema: join(__dirname, "schema.graphql"),
  },
  contextType: {
    module: require.resolve("./context"),
    alias: "Context",
    export: "Context",
  },
});
