import { HTTP_RESOURCE_SYMBOL, AUTH_RESOURCE_SYMBOL } from './decorators';

class ServiceProvider {
  /**
   * Pass all decorated classes to be itterated and registered
   * @param {type} classes
   */
  static init(classes) {
    for (const cls of classes) {
      // TODO: contructor params or inject
      // TODO: chack cls type and ignore outliers
      const instance = new cls();

      const methods = Object.getOwnPropertyNames(cls.prototype);
      for (const methodName of methods) {
        const method = Object.getOwnPropertyDescriptor(cls.prototype, methodName).value;
        const resource = method[Symbol.for(HTTP_RESOURCE_SYMBOL)];
        const auth = method[Symbol.for(AUTH_RESOURCE_SYMBOL)];

        if (auth) {
          //TODO: register auth
        }

        console.log('auth', auth);

        if (resource) {
          ServiceProvider.register(resource, method, instance, auth);
        }
      }
    }
  }

  static get catalog() {
    if (!global.catalog) {
      global.catalog = new Map();
    }
    return global.catalog;
  }

  static register(key, method, ctx, middleware) {
    return ServiceProvider.catalog.set(key, { method, ctx, middleware });
  }

  static resolveService(method, resource) {
    const key = `${method}$${resource}`;
    return ServiceProvider.catalog.get(key);
  }
}

export default ServiceProvider;
