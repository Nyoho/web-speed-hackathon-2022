import "regenerator-runtime/runtime";
import fastify from "fastify";
import fastifySensible from "@fastify/sensible";
import compressPlugin from '@fastify/compress';

import { User } from "../model/index.js";

import { apiRoute } from "./routes/api.js";
import { spaRoute } from "./routes/spa.js";
import { createConnection } from "./typeorm/connection.js";
import { initialize } from "./typeorm/initialize.js";

import pino from 'pino'

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = fastify({
  logger: IS_PRODUCTION
    ? false
    : pino({
      transport: {
        target: 'pino-pretty'
      },
    })
  // ignore: "pid,hostname",
  // translateTime: "SYS:HH:MM:ss",
});
server.register(fastifySensible);

server.addHook("onRequest", async (req, res) => {
  const repo = (await createConnection()).getRepository(User);

  const userId = req.headers["x-app-userid"];
  if (userId !== undefined) {
    const user = await repo.findOne(userId);
    if (user === undefined) {
      res.unauthorized();
      return;
    }
    req.user = user;
  }
});

server.addHook("onRequest", async (req, res) => {
  res.header("Cache-Control", "no-cache, no-store, no-transform");
  res.header("Connection", "close");
});

server.register(
  compressPlugin,
  { global: true }
);
server.register(apiRoute, { prefix: "/api" });
server.register(spaRoute);

const start = async () => {
  try {
    await initialize();
    await server.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
