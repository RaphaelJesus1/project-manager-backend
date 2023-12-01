import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

class ResourceFactory {
  private static instance: ResourceFactory;
  prisma: PrismaClient;
  crypt: {
    compare: typeof compareSync;
    hash: typeof hashSync;
    salt: typeof genSaltSync;
  };

  private constructor() {
    this.prisma = new PrismaClient();
    this.crypt = {
      compare: compareSync,
      hash: hashSync,
      salt: genSaltSync,
    };
  }

  static getInstance(): ResourceFactory {
    if (!ResourceFactory.instance) {
      ResourceFactory.instance = new this();
    }
    return ResourceFactory.instance;
  }
}

export const resource = ResourceFactory.getInstance();
