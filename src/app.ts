import express, { Application } from "express";
import dotenv from "dotenv";
import { appRouter } from "./application/routes/Router";

dotenv.config();
const { PORT } = process.env;

class App {
  private express: Application;
  private port: number;

  constructor() {
    this.express = express();
    this.port = this.getPort();
    this.routes();
    this.listen();
  }

  private getPort(): number {
    return PORT ? parseInt(PORT) : 3000;
  }

  private routes(): void {
    this.express.use(express.json());
    this.express.use("/api", appRouter);
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log(`\x1b[36mServer running on port ${this.port} 🚀\x1b[0m`);
    });
  }
}

const app = new App();
