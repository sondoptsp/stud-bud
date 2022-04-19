"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutMutation = exports.LoginMutation = exports.RegisterMutation = void 0;
const nexus_1 = require("nexus");
const inputs_1 = require("../inputs");
const outputs_1 = require("../outputs");
const argon2_1 = __importDefault(require("argon2"));
const validateRegisterInput_1 = require("../../utils/validateRegisterInput");
const validateLoginInput_1 = require("../../utils/validateLoginInput");
const constants_1 = require("../../constants");
exports.RegisterMutation = (0, nexus_1.mutationField)("register", {
    type: (0, nexus_1.nonNull)(outputs_1.AuthOutput),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.RegisterInput),
    },
    resolve: async (_root, args, ctx) => {
        const { username, email, password } = args.input;
        try {
            const validateRegisterErrors = (0, validateRegisterInput_1.validateRegisterInput)(username, email, password);
            if (validateRegisterErrors.length > 0)
                return {
                    IOutput: {
                        code: 400,
                        success: false,
                        message: "Invalid register inputs",
                    },
                    ErrorFieldOutput: validateRegisterErrors,
                };
            const existingUser = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (existingUser)
                return {
                    IOutput: {
                        code: 400,
                        success: false,
                        message: "User already existed",
                    },
                };
            const hashedPassword = await argon2_1.default.hash(password);
            const newUser = await ctx.prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword,
                },
            });
            return {
                IOutput: {
                    code: 200,
                    success: true,
                    message: "User registered successfully",
                },
                User: newUser,
            };
        }
        catch (error) {
            return {
                IOutput: {
                    code: 500,
                    success: false,
                    message: `Internal server error at RegisterMutation ${error}`,
                },
            };
        }
    },
});
exports.LoginMutation = (0, nexus_1.mutationField)("login", {
    type: (0, nexus_1.nonNull)(outputs_1.AuthOutput),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.LoginInput),
    },
    resolve: async (_root, args, ctx) => {
        const { email, password } = args.input;
        try {
            const validateLoginInputErrors = (0, validateLoginInput_1.validateLoginInput)(email, password);
            if (validateLoginInputErrors.length > 0)
                return {
                    IOutput: {
                        code: 400,
                        success: false,
                        message: "Invalid login inputs",
                    },
                    ErrorFieldOutput: validateLoginInputErrors,
                };
            const existingUser = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!existingUser)
                return {
                    IOutput: {
                        code: 400,
                        success: false,
                        message: "Incorrect email",
                    },
                    ErrorFieldOutput: [{ field: "email", message: "Incorrect email" }],
                };
            const validPassword = await argon2_1.default.verify(existingUser.password, password);
            if (!validPassword)
                return {
                    IOutput: {
                        code: 400,
                        success: false,
                        message: "Incorrect password",
                    },
                    ErrorFieldOutput: [
                        { field: "password", message: "Incorrect password" },
                    ],
                };
            ctx.req.session.userId = existingUser.id;
            return {
                IOutput: {
                    code: 200,
                    success: true,
                    message: "User logged in successfully",
                },
                User: existingUser,
            };
        }
        catch (error) {
            return {
                IOutput: {
                    code: 500,
                    success: false,
                    message: `Internal server error at LoginMutation ${error}`,
                },
            };
        }
    },
});
exports.LogoutMutation = (0, nexus_1.mutationField)("logout", {
    type: (0, nexus_1.nonNull)(outputs_1.AuthOutput),
    resolve: async (_root, _args, ctx) => {
        try {
            ctx.req.session.destroy((err) => {
                ctx.res.clearCookie(constants_1.COOKIE_NAME);
                if (err)
                    console.log("Log out error", err);
            });
            return {
                IOutput: {
                    code: 200,
                    success: true,
                    message: "Logged out successfully",
                },
            };
        }
        catch (error) {
            return {
                IOutput: {
                    code: 500,
                    success: false,
                    message: `Internal server error at LogoutMutation ${error}`,
                },
            };
        }
    },
});
//# sourceMappingURL=UserMutation.js.map