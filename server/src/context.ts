import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import { prisma } from "./prisma";

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}

export async function createContext(
  request: ExpressContext
): Promise<Partial<Context>> {
  const context: Context = {
    ...request,
    req: request.req,
    res: request.res,
    prisma,
  };

  return context;
}
