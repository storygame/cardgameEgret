class ChacpterPage extends eui.Component implements  eui.UIComponent {
	
	public ChacpterGroup:eui.Group;
	public goBack:eui.Image;
	public chapter_bg_1:eui.Image;
	public chapter_bg_2:eui.Image;
	public chapter_bg_3:eui.Image;
	public Guideshape;

	// public shadeCircle;
	// public shadeRect;

	
	public constructor() {
		super();
	}



	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addLinsters();
		// this.initGuideShade();
	}

	// public initGuideShade(){
	// 	if(UserInfo.single_level == UserInfo.tmp_level && UserInfo.tmp_level == 1.0){
	// 		PublicMethod.createShape(220, 373, 60, this.width, this.height, this);
	// 	}else{
	// 		if(this.shadeCircle)
	// 			this.removeChild(this.shadeCircle);
	// 		if(this.shadeRect)
	// 			this.removeChild(this.shadeRect)
	// 	}
	// }
	

	public addLinsters(){
		PublicMethod.clickDarken(this.goBack, this);
		PublicMethod.clickDarken(this.chapter_bg_1, this);
		PublicMethod.clickDarken(this.chapter_bg_2, this);
		PublicMethod.clickDarken(this.chapter_bg_3, this);
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBackClick, this);
		this.chapter_bg_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToAdventure1, this);
		this.chapter_bg_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToAdventure2, this);
		this.chapter_bg_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.notOpenYet, this);
	}

	public goBackClick(){
		SceneManager.getInstance().changeScene('mainPage');
	}

	public changeToAdventure1(){
		let tmp_level = UserInfo.tmp_level;
		let tmp_chapter = Chapter.deLevel(tmp_level);
		if(tmp_chapter[0]==1){
			SceneManager.getInstance().changeScene('adventureMap');
		}else{
			this.ChacpterGroup.touchEnabled = false;
			let info = new infoView(this, "您还在进行第二关。", 
			()=>{SceneManager.getInstance().chacpterPage.ChacpterGroup.touchEnabled = true}, 
			()=>{}, true, false);
		}
	}
	public changeToAdventure2(){
		let tmp_level = UserInfo.tmp_level;
		let tmp_chapter = Chapter.deLevel(tmp_level);
		if(tmp_chapter[0]==2){
			SceneManager.getInstance().changeScene('adventureMap');
		}else{
			this.ChacpterGroup.touchEnabled = false;
			let info = new infoView(this, "您还在进行第一关。", 
			()=>{SceneManager.getInstance().chacpterPage.ChacpterGroup.touchEnabled = true}, 
			()=>{}, true, false);
		}

	}

	public notOpenYet(){
		this.ChacpterGroup.touchEnabled = false;
		let info = new infoView(this, "暂未开放", 
			()=>{SceneManager.getInstance().chacpterPage.ChacpterGroup.touchEnabled = true}, 
			()=>{}, true, false);
	}
	
}