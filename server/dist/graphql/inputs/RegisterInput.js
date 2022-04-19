"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterInput = void 0;
const nexus_1 = require("nexus");
exports.RegisterInput = (0, nexus_1.inputObjectType)({
    name: "RegisterInput",
    definition(t) {
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});
//# sourceMappingURL=RegisterInput.js.map