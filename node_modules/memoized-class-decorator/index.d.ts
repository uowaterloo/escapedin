declare module "memoized-class-decorator" {

    var memoize: <T>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;
    export = memoize;

}
