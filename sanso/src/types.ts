import { IDatabaseDriver, Connection } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/core/EntityManager";
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  redis: Redis;
};
