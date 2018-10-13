export abstract class Repository<T> {
  abstract save(value: T, callBackSuccess, callBackErr);
  abstract findAll(callBackSuccess, callBackErr);
}
