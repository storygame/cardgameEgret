class CardEvent extends egret.Event {
    public static LOCKLINE: string = "LockLine";
    public static DESTROY: string = "DESTROY";
    public static KAIPAI: string = "KAIPAI";
    public static CHUPAI: string = "CHUPAI";
    public static CHUPAIEND: string = "CHUPAIEND";


    private _obj: any;
    private _arr: number[];

    public constructor(type: string, obj: any = null, arr: number[] = null, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        this._obj = obj;
        this._arr = arr;
    }
    public get obj(): any {
        return this._obj;
    }
    public get arr(): number[] {
        return this._arr;
    }
}