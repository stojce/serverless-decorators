import Http from './lib/Http';
import UsersController from './controllers/UsersController';

Http.init([UsersController]);

export const handler = async (event, context) => {
  const payload = event.body ? JSON.parse(event.body) : {};
  try {
    const response = await Http.execute({ method: event.httpMethod, resource: event.resource, payload });
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify(ex)
    };
  }
};
