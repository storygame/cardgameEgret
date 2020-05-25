class FriendlistPage extends eui.Component implements eui.Component{
	// public background:eui.Image;
	public closeBtn:eui.Button;
	public friendlist:eui.List;
	public static instance:FriendlistPage;
    private complete_frineds: any[];
    // private peopple = new Map<string, string>();
    
    //private taskDict: Map<string> = {};

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
		console.log('Friendlistpage init');

		this.closeBtn.touchEnabled = true;
		this.friendlist.touchEnabled = true;

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, FriendlistPage.closePage, this);
		this.initTask();
	}

    private initTask():void{
        let tmp = ["friend1","friend2","frined3","frined4","frined5","frinde2","friend3","friend4","friend5","friend2","frinend3","friend4","friend5"];
		// TODO 
		// 这里每次点击加载都应该询问服务器friendd列表
		this.friendlist.$addListener(egret.TouchEvent.TOUCH_TAP, FriendlistPage.getInstance().showContain, this);
        this.friendlist.dataProvider = new eui.ArrayCollection(tmp);//设计列表的index数以及每一项的内容
        
        //this.FriendlistPage.selectedIndex = 1; //默认选中第一个任务
    }

	public showContain(){
		//todo
		console.log(this.friendlist.selectedItem);
	}

    

	/*
	设置弹窗的实现是单例模式
	这个窗口一直存在，当点击设置按钮时变为可见
	当点击该关闭窗口时变为不可见
	*/
	public static getInstance():FriendlistPage{
		if (!FriendlistPage.instance){
			FriendlistPage.instance = new FriendlistPage(); 
		}
		return FriendlistPage.instance;
	}

	public static closePage():void{
		console.log("closeFriendlistPage");
		// MySettingPage.getInstance().$setVisible(false);
		SceneManager.getInstance().stackRemoveScene("friendlistPage");
	}

	public static openPage():void{
		console.log("openFriendlistPage");
		SceneManager.getInstance().stackAddScene("friendlistPage");
	}
	// public addTask(task:any[]):void{
    //     /*
    //     task[0] 保留
    //     task[1] 任务标题
    //     task[2] 任务内容
    //     task[3] 任务指标
    //     task[4] 任务完成度， 默认为0
    //     task[5] 任务奖励名称
    //     task[6] 任务奖励数量
    //     */
    //     //todo
    //     this.friends.push(task[1]);
    //     this.complete_frineds.push(task);
    //     this.friendlist.dataProvider = new eui.ArrayCollection(this.friends);
    //     this.friendlist.dataProviderRefreshed();
    // }

    // public finishTask(taskName:string){
	// 	/*任务完成 */
	// 	// todo
	// 	// award
    //     this.removeTask(taskName);
    // }

    // public removeTask(taskName:string){
    //     this.friends.forEach((item, index) =>{
    //         if(item == taskName) this.friends.splice(index, 1);
    //     });
    //     this.complete_frineds.forEach((item, index) =>{
    //         if(item[1] == taskName) this.complete_frineds.splice(index, 1);
    //     });
    // }
	
}