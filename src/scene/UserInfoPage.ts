class UserInfoPage extends eui.Component implements eui.Component {

	public closeBtn:eui.Button;
	public editNameBtn: eui.Button;
	public checkNameBtn: eui.Button; // 确认修改
	public head: eui.Image;
	public level: eui.Label;
	public id:eui.Label
	public userName: eui.TextInput; 
	private static instance:UserInfoPage; 
    private user: Object;
	

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

		this.closeBtn.touchEnabled = true;
		this.editNameBtn.touchEnabled = true;
		this.checkNameBtn.touchEnabled = false;
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, UserInfoPage.closePage, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchReleaseOutside, this)
		this.editNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.editName, this);
		this.checkNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveName, this);
		// todo add aditname button listener
		this.showContain();
	}


	public showContain(){
		/**
		 * 查询服务器获得，头像，id， 等级， 用户名
		 */
		//todo
		this.userName.text = UserInfo.username;
		//console.log(this.mailList.selectedItem);
	}

	public saveName(){
		let t = this.userName.text;
		// 发送修改给服务器
		this.checkNameBtn.touchEnabled = false;
		this.userName.enabled = false;
		UserInfo.username = t;
	}

	public editName(){
		this.checkNameBtn.touchEnabled = true;
		this.userName.enabled = true;//允许用户修改自己的名字

	}

	/*
	设置弹窗的实现是单例模式
	*/
	public static getInstance():UserInfoPage{
		if (!UserInfoPage.instance){
			UserInfoPage.instance = new UserInfoPage(); 
		}
		return UserInfoPage.instance;
	}

	public static closePage():void{
		SceneManager.getInstance().changeScene("mainPage");
	}

	public static openPage():void{
		SceneManager.getInstance().changeScene("userInfoPage");
	}

	public touchBegin(e: egret.TouchEvent){
		let target: CardView = e.target;
		console.log('touch begin: ', target);
		var colorMatrix = [
			0.8,0,0,0,0,
			0,0.8,0,0,0,
			0,0,0.8,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		target.filters = [colorFlilter];
	}

	public touchReleaseOutside(e: egret.TouchEvent){
		let target: CardView = e.target;
		console.log('touch end: ', target);
		target.filters = [];
		console.log(target)
	}

}