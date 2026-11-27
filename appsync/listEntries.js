import { util } from '@aws-appsync/utils';

// Latest 10 entries: Query room = "main", sort key descending.
export function request(ctx) {
  return {
    operation: 'Query',
    query: { expression: 'room = :room', expressionValues: util.dynamodb.toMapValues({ ':room': 'main' }) },
    scanIndexForward: false,
    limit: 10,
  };
}

export function response(ctx) {
  if (ctx.error) util.error(ctx.error.message, ctx.error.type);
  return ctx.result.items;
}
