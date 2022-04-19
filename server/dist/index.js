"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_core_1 = require("apollo-server-core");
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("./schema");
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./constants");
dotenv_1.default.config();
const startServer = async () => {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = redis.createClient();
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: schema_1.schema,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        ],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });
    const PORT = process.env.PORT || 4000;
    await new Promise((resolve) => {
        httpServer.listen(PORT);
        resolve();
    });
    console.log(`Express server running at http://localhost:${PORT}. Apollo server running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
};
startServer().catch((err) => console.log("Error starting server", err));
//# sourceMappingURL=index.js.map