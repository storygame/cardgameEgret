class TasklistPage extends eui.Component implements  eui.UIComponent {
	// public background: eui.Image;
    // public background:eui.Image;
	public closeBtn:eui.Button;
	public tasklist:eui.List;
	public static instance:TasklistPage; 
    private tasks: any[];
    private complete_tasks: any[];
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
		console.log('tasklistpage init');

		this.closeBtn.touchEnabled = true;
		this.tasklist.touchEnabled = true;

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, MySettingPage.closePage, this);
		this.initTask();
	}

    private initTask():void{
        let tmp = ["task1","task2","task3","task4","task5","task2","task3","task4","task5","task2","task3","task4","task5"];
		// TODO 
		// 这里每次点击加载都应该询问服务器任务列表
		// 这里应该提供接口返回邮件列表 赋值给complete_mail
		// 根据要展示的内容加入tmp
		this.tasklist.$addListener(egret.TouchEvent.TOUCH_TAP, TasklistPage.getInstance().showContain, this);
        this.tasklist.dataProvider = new eui.ArrayCollection(tmp);//设计列表的index数以及每一项的内容
        
        //this.tasklist.selectedIndex = 1; //默认选中第一个任务
    }

	public showContain(){
		console.log(this.tasklist.selectedItem);
	}

    public addTask(task:any[]):void{
        /*
        task[0] 保留
        task[1] 任务标题
        task[2] 任务内容
        task[3] 任务指标
        task[4] 任务完成度， 默认为0
        task[5] 任务奖励名称
        task[6] 任务奖励数量
        */
        //todo
        this.tasks.push(task[1]);
        this.complete_tasks.push(task);
        this.tasklist.dataProvider = new eui.ArrayCollection(this.tasks);
        this.tasklist.dataProviderRefreshed();
    }

    public finishTask(taskName:string){
		/*任务完成 */
		// todo
		// award
        this.removeTask(taskName);
    }

    public removeTask(taskName:string){
        this.tasks.forEach((item, index) =>{
            if(item == taskName) this.tasks.splice(index, 1);
        });
        this.complete_tasks.forEach((item, index) =>{
            if(item[1] == taskName) this.complete_tasks.splice(index, 1);
        });
    }

	/*
	设置弹窗的实现是单例模式
	这个窗口一直存在，当点击设置按钮时变为可见
	当点击该关闭窗口时变为不可见
	*/
	public static getInstance():TasklistPage{
		if (!TasklistPage.instance){
			TasklistPage.instance = new TasklistPage(); 
		}
		return TasklistPage.instance;
	}

	public static closePage():void{
		console.log("closeTasklistPage");
		// MySettingPage.getInstance().$setVisible(false);
		// SceneManager.getInstance().stackRemoveScene("tasklistPage");
	}

	public static openPage():void{
		console.log("openTasklistPage");
		// SceneManager.getInstance().stackAddScene("tasklistPage");
	}
	



	// public release(){
	// 	//TODO: 释放所有监听
	// 	console.log('mainpage release')
	// 	try{
	// 		this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, MySettingPage.closePage, this);
	// 		this.soundSlider.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSound, this);
	// 		this.soundCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSound, this);
	// 		this.musicSlider.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeMusic, this);
	// 		this.musicCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeMusic, this);
	// 	}catch(e){
	// 		console.log(e);
	// 	}
	// }

	
}
