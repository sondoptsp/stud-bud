"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOutput = void 0;
const nexus_1 = require("nexus");
const objects_1 = require("../objects");
const ErrorFieldOutput_1 = require("./ErrorFieldOutput");
const IOutput_1 = require("./IOutput");
exports.AuthOutput = (0, nexus_1.objectType)({
    name: "AuthOutput",
    definition(t) {
        t.nonNull.field("IOutput", {
            type: IOutput_1.IOutput,
        });
        t.nullable.field("User", {
            type: (0, nexus_1.nullable)(objects_1.User),
        });
        t.nullable.list.nullable.field("ErrorFieldOutput", {
            type: ErrorFieldOutput_1.ErrorFieldOutput,
        });
    },
});
//# sourceMappingURL=AuthOutput.js.map