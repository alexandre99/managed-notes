export interface Model<T> {
  convertPlainToObject(plain: any): T;
  convertObjectToPlain(): any;
}
