export abstract class Repository<T> {
  abstract save(value: T, callbackSuccess: any, callbackError: any);
  abstract findAll(callbackSuccess: any, callbackError: any);
}
