export interface Service<T, K> {
    save();
    findAll();
    update();
    findById();
    delete();

    callBackErr(err);
    callBackSuccess(msg: string, status: number);
    callBackFindAllSuccess(snapshot);
    callBackFindByIdSuccess(doc)
    validateData(args: any[])
}