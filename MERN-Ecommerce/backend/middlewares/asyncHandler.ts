import type { RequestHandler } from "express";
import type {
  ParamsDictionary,
  Query,
} from "express-serve-static-core";

const asyncHandler = <
  Params = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Query,
>(
  fn: RequestHandler<Params, ResBody, ReqBody, ReqQuery>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;