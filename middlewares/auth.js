import { expressjwt } from "express-jwt";

export const isauthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"],
});