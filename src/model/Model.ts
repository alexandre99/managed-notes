export interface Model<T> {
    convertPlainToObject(plain: any): T;
    convertObjectToPlain(value: T): any;
}