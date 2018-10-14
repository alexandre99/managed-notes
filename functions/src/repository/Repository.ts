export abstract class Repository<T, K> {
  abstract save(value: T, callBackSuccess, callBackErr);
  abstract findAll(callBackSuccess, callBackErr);
  abstract update(value: K, callBackSuccess, callBackErr);
}
