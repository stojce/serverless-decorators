export const HTTP_RESOURCE_SYMBOL = 'http:method';
export const AUTH_RESOURCE_SYMBOL = 'auth:middleware';

// TODO: different auth strategies (JWT, Facebook, Twitter, Google) or roles/groups
// resource can be strategy or role/group, or even custom function that sholud return boolean
export const Auth = (resource = 'basic') => {
  return target => {
    const descriptorSymbol = Symbol.for(AUTH_RESOURCE_SYMBOL);
    target.descriptor.value[descriptorSymbol] = resource;
  };
};

export const Get = resource => {
  return target => {
    const descriptorSymbol = Symbol.for(HTTP_RESOURCE_SYMBOL);
    target.descriptor.value[descriptorSymbol] = `GET$${resource}`;
  };
};

export const Post = resource => {
  return target => {
    const descriptorSymbol = Symbol.for(HTTP_RESOURCE_SYMBOL);
    target.descriptor.value[descriptorSymbol] = `POST$${resource}`;
  };
};

export const Put = resource => {
  return target => {
    const descriptorSymbol = Symbol.for(HTTP_RESOURCE_SYMBOL);
    target.descriptor.value[descriptorSymbol] = `PUT$${resource}`;
  };
};

export const Delete = resource => {
  return target => {
    const descriptorSymbol = Symbol.for(HTTP_RESOURCE_SYMBOL);
    target.descriptor.value[descriptorSymbol] = `DELETE$${resource}`;
  };
};
