import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Use for restrict authenticate API
 */
export const Caller = createParamDecorator((_data: object, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.admin;
});