class infoView extends eui.Component {
    public infotext: eui.Label;
	public cancelBtn : eui.Image;
    public affirmBtn:eui.Image;
    public parentContainer:any;
    public affirm_fun; // affirm function
    public cancel_fun; // cancel function
    public cancelVisible = true;
    public affirmVisible = true;

	public constructor(parentContainer,msg: string,affirm_fun,cancel_fun,affirmVisible?:boolean,cancelVisible?:boolean) {
        //第一个参数是父元素，第二个是显示的信息，第三个是点击确认按钮执行的函数，第四个是点击取消按钮执行的函数，第五个是确认按钮是否可见，第六个是取消按钮是否可见
		super();
		this.skinName = "infoViewSkin";	
        console.log(this);
        this.infotext.text = msg;
        this.parentContainer = parentContainer;
        this.affirm_fun = affirm_fun;
        this.cancel_fun = cancel_fun;
        this.x = (parentContainer.width - this.width)/2;
        this.y = (parentContainer.height - this.height)/2;
        if(cancelVisible!=undefined)
        this.cancelVisible = cancelVisible;
        if(affirmVisible!=undefined)
        this.affirmVisible = affirmVisible;

        //设置按钮可见
        this.cancelBtn.visible = this.cancelVisible;
        this.affirmBtn.visible = this.affirmVisible;
        //设置按钮位置
        if(this.cancelVisible && this.affirmVisible){
            this.cancelBtn.x  = 32;
            this.cancelBtn.y = 190;
            this.affirmBtn.x = 246;
            this.affirmBtn.y = 190;
        }else{
            //只有一个按钮
            let middle_x = 136;
            let middle_y = 190;
            if(this.cancelVisible){
                this.cancelBtn.x = middle_x;
                this.cancelBtn.y = middle_y;
            }else if(this.affirmVisible){
                this.affirmBtn.x = middle_x;
                this.affirmBtn.y = middle_y;
            }
        }
        this.alpha = 0;
        parentContainer.addChild(this);
        egret.Tween.get(this).to({alpha: 1}, 200, egret.Ease.sineIn);

        this.affirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.affirmBtnFun, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBtnFun, this);
        this.affirmBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.affirmBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this)
        this.affirmBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this)
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this)
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this)
	}


    public cancelBtnFun(){
        if(this.parentContainer){
            this.parentContainer.removeChild(this);
        }
        this.cancel_fun.apply();
        this.release();
    }
    
    public affirmBtnFun(){
        if(this.parentContainer){
            this.parentContainer.removeChild(this);
        }
        // console.log("执行确认函数");
        this.affirm_fun.apply();
        this.release();
    }

    public touchBegin(e: egret.TouchEvent){
		let target: CardView = e.target;
		// console.log('touch begin: ', target);
		var colorMatrix = [
			0.8,0,0,0,0,
			0,0.8,0,0,0,
			0,0,0.8,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		target.filters = [colorFlilter];
	}

	public touchEndOrReleaseOutside(e: egret.TouchEvent){
		let target: CardView = e.target;
		// console.log('touch end: ', target);
		target.filters = [];
		console.log(target)
	}


    public release(){
        this.affirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.affirmBtnFun, this);
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBtnFun, this);
        this.affirmBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.affirmBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this)
		this.affirmBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this)
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.affirmBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this)
		this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this)
    }

}