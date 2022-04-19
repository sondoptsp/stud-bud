"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOutput = void 0;
const nexus_1 = require("nexus");
exports.IOutput = (0, nexus_1.objectType)({
    name: "IOutput",
    definition(t) {
        t.nonNull.int("code");
        t.nonNull.boolean("success");
        t.nonNull.string("message");
    },
});
//# sourceMappingURL=IOutput.js.map