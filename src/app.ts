import express, { Application, NextFunction, Request, Response } from "express";
import { PORT } from "./config/config";
import usersRouter from "./routers/users.router";
import authRouter from "./routers/auth.router";
import postsRouter from "./routers/posts.router";

export default class App {
	app: Application;
	constructor() {
		this.app = express();
		this.configure();
		this.routes();
		this.errorHandler();
	}
	private configure(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded());
	}
	private routes(): void {
		this.app.get("/", (req: Request, res: Response) => {
			res.send("Welcome to insta clone api.");
		});
		this.app.use("/users", usersRouter.getRouter());
		this.app.use("/auth", authRouter.getRouter());
		this.app.use("/posts", postsRouter.getRouter());
	}
	private errorHandler(): void {
		this.app.use("/*", (req: Request, res: Response) => {
			res.status(404).send("Not Found.");
		});
		this.app.use(
			(error: unknown, req: Request, res: Response, next: NextFunction) => {
				if (error instanceof Error)
					res.status(500).send({ message: error.message });
			}
		);
	}
	start(): void {
		this.app.listen(PORT, (): void => {
			console.log("api is running on port", PORT);
		});
	}
}
