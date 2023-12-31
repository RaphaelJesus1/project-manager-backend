import { Request, Response } from "express";
import { Controller } from "./protocols";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body).end();
    } else {
      res
        .status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.message,
        })
        .end();
    }
  };
};
