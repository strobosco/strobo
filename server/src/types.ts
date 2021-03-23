import { IDatabaseDriver, Connection } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/core/EntityManager";
import { Request, Response } from "express";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
};
