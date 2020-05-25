class MySettingPage extends eui.Component implements  eui.UIComponent {
	// public background: eui.Image;
    public background:eui.Image;
	//public closeBtn:eui.Button;
	public musicSlider:eui.HSlider;
	public soundSlider:eui.HSlider;
	public musicCheckBox:eui.CheckBox;
	public soundCheckBox:eui.CheckBox;
	public static instance:MySettingPage; 
	public closeUsedGroup:eui.Group;

	private constructor() {
		super();
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	public startCreateScene():void{
		
	}

	private init(){
		console.log('settingpage init');

		//this.closeBtn.touchEnabled = true;
		this.soundSlider.touchEnabled = true;
		this.musicSlider.touchEnabled = true;
		this.soundCheckBox.touchEnabled = true;
		this.musicCheckBox.touchEnabled = true;

		this.soundSlider.snapInterval = 1; //范围0-10，间隔1，则有10个值
		this.musicSlider.snapInterval = 1; //默认在中间
		this.soundSlider.value = 5;
		this.musicSlider.value = 5; 
		this.soundCheckBox.selected = true;
		this.musicCheckBox.selected = true; //默认勾选

		this.closeUsedGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, MySettingPage.closePage, this);
		this.soundSlider.addEventListener(egret.TouchEvent.TOUCH_END, this.changeSound, this);
		this.soundCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSound, this);
		this.musicSlider.addEventListener(egret.TouchEvent.TOUCH_END, this.changeMusic, this);
		this.musicCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeMusic, this);
	}

	/*
	设置弹窗的实现是单例模式
	这个窗口一直存在，当点击设置按钮时变为可见
	当点击该关闭窗口时变为不可见
	*/
	public static getInstance():MySettingPage{
		if (!MySettingPage.instance){
			MySettingPage.instance = new MySettingPage(); 
		}
		return MySettingPage.instance;
	}

	public static closePage():void{
		console.log("closePage");
		SceneManager.getInstance().stackRemoveScene("settingPage");
	}

	public static openPage():void{
		console.log("openPage");
		SceneManager.getInstance().stackAddScene("settingPage");
	}
	

	public changeSound():void{
		let sound;
		if(this.soundCheckBox.selected){
			sound = this.soundSlider.value;
		}else{
			sound = 0;
		}
		/* 根据sound改变音量大小 */ 
		// TODO
	}

	public changeMusic():void{
		let music;
		if(this.musicCheckBox.selected){
			music = this.musicSlider.value;
		}else{
			music = 0;
		}
	
	}



	public release(){
		//TODO: 释放所有监听
		console.log('mainpage release')
		try{
			//this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, MySettingPage.closePage, this);
			this.soundSlider.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSound, this);
			this.soundCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSound, this);
			this.musicSlider.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeMusic, this);
			this.musicCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeMusic, this);
		}catch(e){
			console.log(e);
		}
	}

	
}
