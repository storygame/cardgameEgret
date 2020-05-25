class MailPage extends eui.Component implements  eui.UIComponent {
	// public background: eui.Image;
	public goBack:eui.Image;
	public MailList:eui.List;
	public MailContentGroup:eui.Group;
	public MailContent:eui.Label;
	public mailTitle : eui.Label;


	public AllMailInfo;

	private static instance:MailPage; 
    // private complete_mails: any[];

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
		console.log('mailpage init');
		this.goBack.touchEnabled = true;
		this.MailList.touchEnabled = true;
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{console.log("[*]点击返回按钮,返回主页面");SceneManager.getInstance().changeScene('mainPage')}, this)
		this.initMail();
	}

    private async initMail(){
        let tmp = [{"short_title":"你有一封新邮件!","icon":"info_png","read":0,"content":"抵制不良游戏，拒绝盗版游戏。注意自我保护，预防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活","long_title":"时空异闻录运营公告","type":1,"from":"时空异闻录运营组"},{"short_title":"欢迎新玩家!","icon":"info_png","read":0,"content":"欢迎所有测试玩家！","long_title":"欢迎测试玩家进行测试"}];
		let mailInfo=await SocketAPI.getPostReply(SocketAPI.urllist["getMail"],UserInfo.UserInfoString);
		if(mailInfo["errno"]!=0){
				new infoView(this,"邮件系统正在维护,无法实时加载邮件。",()=>{SceneManager.getInstance().changeScene('mainPage')},()=>{},true,false);
		}else{
			// 去除留言,只显示邮件,留言将在其他页面显示
			tmp = mailInfo["data"].filter((item)=>{
				item["mail"]=JSON.parse(item["mail"]);
				item["mail"]["icon"]="icon_png";
				return item["mail"].type==1;
			});
			//处理邮件数据的临时变量,把邮件数据内层取出来
			let other_tmp=[];
			for(let i=0;i<tmp.length;i++){
				other_tmp.push(tmp[i]["mail"]);
			}
			tmp = other_tmp;
		}
		console.log("[*]邮件信息:",tmp);
		this.AllMailInfo = tmp;
		// TODO 
		// 这里每次点击加载都应该询问服务器邮件列表
		// 这里应该提供接口返回邮件列表 赋值给complete_mail
		// 根据要展示的内容加入tmp
		
		let euiArr:eui.ArrayCollection = new eui.ArrayCollection(this.AllMailInfo)
        this.MailList.dataProvider = euiArr;//设计列表的index数以及每一项的内容
		this.MailList.itemRenderer = mailItem
		this.MailList.$addListener(egret.TouchEvent.TOUCH_TAP, this.showContain, this);
        //this.tasklist.selectedIndex = 1; //默认选中第一个任务
    }

	public showContain(){
		
		console.log("选中邮件",this.MailList.selectedItem);
		if(this.MailList.selectedItem){
			this.mailTitle.text = this.MailList.selectedItem["long_title"];
			this.MailContent.text = this.MailList.selectedItem["content"];
		}
	}

	/*
	设置弹窗的实现是单例模式
	*/
	public static getInstance():MailPage{
		if (!MailPage.instance){
			MailPage.instance = new MailPage(); 
		}
		return MailPage.instance;
	}

	// public static openPage():void{
	// 	console.log("openMailPage");
	// 	SceneManager.getInstance().stackAddScene("mailPage");
	// }


	// public release(){
	// 	//TODO: 释放所有监听
	// 	console.log('mainpage release')
	// 	try{
	// 		this.goBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, MySettingPage.closePage, this);
	// 	}catch(e){
	// 		console.log(e);
	// 	}
	// }

	//     public addMail(mail:any[]):void{
    //     /*
    //     mail[0] 邮件id    string
    //     mail[1] 邮件标题
    //     mail[2] 邮件内容
    //     mail[3] 发送对象
    //     mail[4] 邮件接受状态， 默认为0， 即未读
    //     mail[5] 邮件附品
    //     mail[6] 邮件附品数量

    //     邮件接受状态
    //     0:  未读
    //     1:  已读

    //     TODO 目前不提供删邮件功能
    //     */
    //     //todo
    //     //this.mails.push(mail[1]);
    //     let tmp:any[];
    //     this.complete_mails.forEach((item, index) =>{
    //         tmp.push(item);
    //     });
    //     tmp.push(mail[1])
    //     this.complete_mails.push(mail);
    //     this.MailList.dataProvider = new eui.ArrayCollection(tmp);
    //     this.MailList.dataProviderRefreshed(); //刷新
    // }

    // public read(){
    //     /*这是一个listenser,邮件标题list的每个item都有一个listener*/ 
    // }

    // public removeMail(taskName:string){
    //     //TODO
    // }

}
class mailItem extends eui.ItemRenderer{
	public mailIcon:eui.Image;
	public mail_short_title:eui.Label;
	public constructor() {
		super()
		// 把这个 类和皮肤 联系起来
		this.skinName = 'resource/eui_skins/mailItemSkin.exml';
		// 显示头像并为其添加遮罩
	}
}