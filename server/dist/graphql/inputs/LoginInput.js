"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = void 0;
const nexus_1 = require("nexus");
exports.LoginInput = (0, nexus_1.inputObjectType)({
    name: "LoginInput",
    definition(t) {
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});
//# sourceMappingURL=LoginInput.js.map