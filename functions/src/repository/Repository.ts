export interface Repository<T, K> {
  save(value: T, callBackSuccess, callBackErr);
  findAll(callBackSuccess, callBackErr);
  update(value: K, callBackSuccess, callBackErr);
  findById(id: string, callBackSuccess, callBackErr);
  delete(id: string, callBackSuccess, callBackErr);
}
