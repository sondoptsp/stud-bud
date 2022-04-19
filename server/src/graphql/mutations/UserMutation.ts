import { mutationField, nonNull } from "nexus";
import { LoginInput, RegisterInput } from "../inputs";
import { AuthOutput } from "../outputs";
import argon2 from "argon2";
import { validateRegisterInput } from "../../utils/validateRegisterInput";
import { validateLoginInput } from "../../utils/validateLoginInput";
import { COOKIE_NAME } from "../../constants";

export const RegisterMutation = mutationField("register", {
  type: nonNull(AuthOutput),
  args: {
    input: nonNull(RegisterInput),
  },
  resolve: async (_root, args, ctx) => {
    const { username, email, password } = args.input;
    try {
      //validate register inputs -> if invalid, return errors
      const validateRegisterErrors = validateRegisterInput(
        username,
        email,
        password
      );

      if (validateRegisterErrors.length > 0)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Invalid register inputs",
          },
          ErrorFieldOutput: validateRegisterErrors,
        };

      //look for existing user -> if exists, return error
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

      //hash password and create new user
      const hashedPassword = await argon2.hash(password);
      const newUser = await ctx.prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      //all good
      return {
        IOutput: {
          code: 200,
          success: true,
          message: "User registered successfully",
        },
        User: newUser,
      };
    } catch (error) {
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

export const LoginMutation = mutationField("login", {
  type: nonNull(AuthOutput),
  args: {
    input: nonNull(LoginInput),
  },
  resolve: async (_root, args, ctx) => {
    const { email, password } = args.input;
    try {
      //validage login inputs -> if errors, return errors
      const validateLoginInputErrors = validateLoginInput(email, password);
      if (validateLoginInputErrors.length > 0)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Invalid login inputs",
          },
          ErrorFieldOutput: validateLoginInputErrors,
        };

      //look for existing user by email -> if not exist, return error
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

      //verify input.password with existingUser.password -> if error, return error
      const validPassword = await argon2.verify(
        existingUser.password,
        password
      );
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

      // all good -> add userId into express-session -> return user
      ctx.req.session.userId = existingUser.id;

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "User logged in successfully",
        },
        User: existingUser,
      };
    } catch (error) {
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

export const LogoutMutation = mutationField("logout", {
  type: nonNull(AuthOutput),
  resolve: async (_root, _args, ctx) => {
    try {
      ctx.req.session.destroy((err) => {
        ctx.res.clearCookie(COOKIE_NAME);
        if (err) console.log("Log out error", err);
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Logged out successfully",
        },
      };
    } catch (error) {
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
