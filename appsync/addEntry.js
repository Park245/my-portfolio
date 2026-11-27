import { util } from '@aws-appsync/utils';

// Save one guestbook entry. Validation is repeated here so the API rejects bad input
// even if someone calls it without the web page.
export function request(ctx) {
  const name = (ctx.args.name || '').trim();
  const message = (ctx.args.message || '').trim();
  if (!name || !message) util.error('Name and message are required.', 'ValidationError');
  if (name.length > 20) util.error('Name must be 20 characters or fewer.', 'ValidationError');
  if (message.length > 200) util.error('Message must be 200 characters or fewer.', 'ValidationError');

  const id = util.autoId();
  const time = util.time.nowISO8601();
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({ room: 'main', createdAt: `${time}#${id}` }),
    attributeValues: util.dynamodb.toMapValues({ id, name, message, time }),
  };
}

export function response(ctx) {
  if (ctx.error) util.error(ctx.error.message, ctx.error.type);
  return ctx.result;
}
