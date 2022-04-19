"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFieldOutput = void 0;
const nexus_1 = require("nexus");
exports.ErrorFieldOutput = (0, nexus_1.objectType)({
    name: "ErrorFieldOutput",
    definition(t) {
        t.nullable.string("field");
        t.nullable.string("message");
    },
});
//# sourceMappingURL=ErrorOutput.js.map