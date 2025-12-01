import express, { type Request, type Response } from "express";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import { loadEnvFile } from "node:process";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { getUserById, getUserByUsername } from "./services/usersService.ts";
import usersRouter from "./routes/usersRouter.ts";
import todosRouter from "./routes/todosRouter.ts";
import { createUserController } from "./controllers/usersController.ts";

loadEnvFile('./.env');

// Express + Mongo setup
const app: Application = express();
app.use(express.json());
app.use(cors());

async function setupClient() {
  const client = await startMongoClient();
  app.locals.client = client;
}

setupClient();

app.use(passport.initialize());

passport.use(
  new LocalStrategy(
    async (username: string, password: string, done: Function) => {
      try {
        const user = await getUserByUsername(app.locals.client, username);
        if (!user) {
          return done(null, false, { message: "user does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET ||
        (() => {
          throw new Error("JWT_SECRET not set");
        })(),
    },
    async function (jwtPayload, done) {
      try {
        const user = await getUserById(app.locals.client, jwtPayload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);


app.post("/register", (req: Request, res: Response) => {
  console.log("Register endpoint hit:", req.body);
  createUserController(req, res);
});

app.post("/log-in", (req: Request, res: Response) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: any) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        const token = jwt.sign(
          { sub: user._id.toString() },
          process.env.JWT_SECRET ||
            (() => {
              throw new Error("JWT_SECRET not set");
            })(),
        );
        const return_user = {
          username: user.username,
          user_id: user._id,
        };
        return res.json({ user: return_user, token });
      });
    },
  )(req, res);
});


app.use(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  todosRouter,
);

app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter,
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});