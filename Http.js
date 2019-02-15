// @flow

import ServiceProvider from './ServiceProvider';

class Http {
  static init(classes: any) {
    ServiceProvider.init(classes);
  }

  static async execute(request: any) {
    const service = ServiceProvider.resolveService(request.method, request.resource);
    if (!service) {
      throw new Error(`API is not registered for method: '${request.method}' and resource '${request.resource}'`);
    }

    if (service.middleware !== undefined) {
      // execute middleware
      console.log('MIDDLEWARE', service.middleware);
    }

    console.log('Calling: ', service.method.name);
    return await service.method.call(service.ctx, request.payload);
  }
}

export default Http;
