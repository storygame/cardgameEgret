class MainPage extends eui.Component implements  eui.UIComponent{

	public MainPageGroup:eui.Group;
	public backgroud:eui.Image;
	public setting:eui.Button;
	public coins:eui.Button;
	public iconNum:eui.Label;
	public exp:eui.Label;
	public roleImg:eui.Image;
	public leftBtn:eui.Image;
	public rightBtn:eui.Image;
	public ChatBottom:eui.Group;
	public coin:eui.Group;
	public addCoin:eui.Image;
	public mail:eui.Image;

	public ChatPage:eui.Group;
	public ChatWord:eui.Image;
	public ChatFriend:eui.Image;
	public ChatStranger:eui.Image;
	public ChatPageFriendGroup:eui.Group;
	public ChatPageWordGroup:eui.Group;
	public ChatPageWordScroller:eui.Scroller;
	public InputText:eui.TextInput;
	public SendToWord:eui.Button;
	public FriendListGroup:eui.Group;

	public WordChatLabel:eui.Label;
	public TextGroup: eui.Group;

	public MainImgGroup:eui.Group;
	public battle:eui.Image;
	public journey:eui.Image;
	public cardsCollection:eui.Image;

	public LittleButtonGroup:eui.Group;
	public ShowWorldChat:eui.Image;
	public UserInfoGroup:eui.Group;
	public UserLevel:eui.Label;

	public ChatGroup:eui.Group;
	public ChatButtonsGroup:eui.Group;
	public WorldButton:eui.Image;
	public FriendButton:eui.Image;
	public ChatScrollGroup:eui.Group;
	public ChatScroller:eui.Scroller;
	public ChatInputGroup:eui.Group;
	public ChatModeInfo:eui.Label;
	public ChatSender:eui.TextInput;
	public SendMessage:eui.Button;
	public WorldChatScroller:eui.Scroller;
	public WorldScrollerList:eui.List;
	public FriendScroller:eui.Scroller;
	public FriendScrollerList:eui.List;

	public CheckinBtn:eui.Image;
	public ActivityBtn:eui.Image;


	public clickWordFriendGroup: eui.Group;
	public addToFriend: eui.Image;
	public sendBattle: eui.Image;
	public chatwithWordPerson: eui.Image;
	public WorldBlackImage: eui.Image;
	public CloseChatPanel: eui.Group;
	public InfoText: eui.Group;
	public InfoTextLabel:eui.Label;
	public UserAvatar:eui.Image;
	public UserName :eui.Label;
	public static self;

	public personId: number;

	public onClickFilter;
	public notOnClickFilter;
	//是否在世界页面的scroller渲染接收的信息
	public isRenderChatItem = "none";
	public WorldMessages = [];
	public FriendsMessages = {};
	//FriendsMessages 选择的项
	public NowSelectedFriends = 0;
	public NowCats = 0;

	public guideShade: GuideShade;		// 引导
	public shadeGroup:eui.Group;
	public shadeImg:eui.Image;


	public shadeCircle;
	public shadeRect;





	public longPressList = [];			// 长按列表


	public constructor() {
		super();
	}

	protected childrenCreated():void{
		super.childrenCreated();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.init();
		this.flower();

	}

	public init(){
		// 播放音乐
		// this.shadeImg.visible = false;
		if(UserInfo.soundChannel)
			UserInfo.soundChannel.stop();
		UserInfo.music = RES.getRes("mainPage_mp3");
  		UserInfo.soundChannel  =  UserInfo.music.play(0, -1);


		MainPage.self = this;
		//显示自己的金币
		this.iconNum.text = String(UserInfo.coins);

		if(Main.development){
			// 本地使用
			UserInfo.nickname = "self";
		}

		this.UserName.text = UserInfo.nickname.length>7?UserInfo.nickname.substr(0,7)+"...":UserInfo.nickname;
		console.log('UserInfo.avatar: ', UserInfo.avatar);

		// 显示自己的头像并为其添加遮罩


		var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(34.65+32.5,4.68+32.5,32.5);
        circle.graphics.endFill();
        this.addChild(circle);
        this.UserAvatar.mask = circle;

		
		// 微信版本使用
		RES.getResByUrl(UserInfo.avatar,this.onComplete,this,RES.ResourceItem.TYPE_IMAGE);


		//显示自己的等级
		this.UserLevel.text = "Lv. "+String(UserInfo.level);
		if(UserInfo.level==0){
			this.exp.text = UserInfo.exp+"/"+UserInfo.levelTable[0];
		}else if(UserInfo.level>=31){
			this.exp.text = "+/+";
		}
		else{
			this.exp.text = String(Math.ceil(UserInfo.exp-UserInfo.levelTable[UserInfo.level-1]))+"/"+Math.ceil(UserInfo.levelTable[UserInfo.level]-UserInfo.levelTable[UserInfo.level-1]);
		}

		//显示默认角色立绘
		this.roleImg.texture=RES.getRes("role"+(UserInfo.roleid)+"_1_all_png");


		this.addShadowForImg();
		//为聊天页面滚动条设置属性
		this.WorldChatScroller.scrollPolicyH = "off";
		this.FriendScroller.scrollPolicyH = "off";

		this.float();

		// 增加监听
		this.addLinsters();

		if(UserInfo.single_level == UserInfo.tmp_level && UserInfo.tmp_level == 1.0 && UserInfo.first == true){
			this.shadeGroup.visible = true;
			this.shadeImg.visible = false;
			UserInfo.first = false;
		}else{
			this.shadeGroup.visible = false;
		}
	}

	private systemLeaf:particle.ParticleSystem;
	public flower(){
		
		let texture = RES.getRes("leaftexiao_png");
        let config = RES.getRes("leaftexiao_json");
        this.systemLeaf = new particle.GravityParticleSystem(texture, config);
		this.addChild(this.systemLeaf);
	    let rec: egret.Shape = new egret.Shape();
        rec.graphics.beginFill(0x0000ff);
        rec.graphics.drawRect(0,0,1136,640);
        rec.graphics.endFill();
		this.addChild(rec);
		this.systemLeaf.mask=rec;
        this.systemLeaf.start();

	}

	public addShadowForImg(){
		// this.roleImg.filters = [PublicMethod.getDropShadowFilter()];
		// this.addCoin.filters = [PublicMethod.getDropShadowFilter()];
		// this.journey.filters = [PublicMethod.getDropShadowFilter()];
		// this.battle.filters = [PublicMethod.getDropShadowFilter()];
		// this.cardsCollection.filters = [PublicMethod.getDropShadowFilter()];
	}
	private onComplete(event:any):void {
        var img: egret.Texture = <egret.Texture>event;
		this.UserAvatar.texture = img;
    }

	public addLinsters(){
		// console.log(222);
		this.battle.touchEnabled = true;
		this.battle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToMatchPage, this);
		this.journey.touchEnabled = true;
		this.journey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTojourney, this);
		this.setting.touchEnabled = true;
		this.setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToSetting, this);
		this.cardsCollection.touchEnabled = true;
		this.cardsCollection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTocardsCollection, this);
		this.roleImg.touchEnabled = true;
		this.roleImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToRoleLib, this);
		this.rightBtn.touchEnabled =true;
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightCat, this);
		this.leftBtn.touchEnabled =true;
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftCat, this);

		// this.addCoin.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{SceneManager.getInstance().changeScene('purchasePage')}, this);
		this.coin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToPurchasePage, this);
		this.mail.touchEnabled = true;
		this.mail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToMail, this);
		// this.friend.touchEnabled = true;
		// this.friend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToFriendList, this);
		// this.user.touchEnabled = true;
		// this.user.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToUserInfo, this);

		// 活动页面
		this.ActivityBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openActivityPanel, this);
		// 签到页面
		this.CheckinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openCheckinPanel, this);

		this.ShowWorldChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openChatPanel, this);
		this.WorldButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeWorldMode,this);
		this.FriendButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeFriendMode,this);
		this.SendMessage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendMessage,this);
		this.CloseChatPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeChatPanel,this);
		this.WorldScrollerList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addFriends,this)
		this.FriendScrollerList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.chooseFriend,this)


		// 添加点击变灰
		this.longPressList.push(this.battle);
		this.longPressList.push(this.journey);
		this.longPressList.push(this.setting);
		this.longPressList.push(this.cardsCollection);
		this.longPressList.push(this.roleImg);
		this.longPressList.push(this.coin);
		this.longPressList.push(this.mail);
		this.longPressList.push(this.ActivityBtn);
		this.longPressList.push(this.CheckinBtn);
		this.longPressList.push(this.ShowWorldChat);
		this.longPressList.push(this.WorldButton);
		this.longPressList.push(this.FriendButton);

		for(let i = 0; i < this.longPressList.length; i++){
			this.longPressList[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.longPressList[i].addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this)
			this.longPressList[i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this)
		}

		this.shadeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.shadeImg.visible = true; this.addChild(new GuideShade)}, this)

	}
	public openActivityPanel(){
		console.log("点击活动按钮");
		new infoView(this,"活动暂未开放,敬请期待。",()=>{},()=>{},true,false);
	}
	public async openCheckinPanel(){
		var checkinReply = await SocketAPI.getPostReply(SocketAPI.urllist['checkin'], UserInfo.UserInfoString);
		console.log("签到:",checkinReply);
		if(checkinReply['errno']==0){
			new infoView(this,"签到成功,增加"+checkinReply['data']+"玉石。",()=>{
				UserInfo.coins+=checkinReply['data'];
				this.iconNum.text = String(UserInfo.coins);
			},()=>{},true,false);
		}else{
			new infoView(this,ErrnoHandle.errnoList[checkinReply['errno']],()=>{},()=>{},true,false);
		}
	}
	public rightCat(){
		console.log(22222)
		let upper = Roles.roles.length-1;
		let lower = 0;
		this.NowCats +=1;
		if(this.NowCats>upper){
			this.NowCats = lower;
		}
		let cat_name = Roles.roles[this.NowCats]["name"];
		let cat_id = Roles.roles[this.NowCats]["id"];
		//重新加载这只猫的图片
		this.roleImg.texture=RES.getRes("role"+(cat_id)+"_1_all_png");
		UserInfo.roleid = cat_id;
		this.jellyBtn(this.rightBtn,200);
	}
	public leftCat(){
		console.log(22222)
		let upper = Roles.roles.length-1;
		let lower = 0;
		this.NowCats -=1;
		if(this.NowCats<lower){
			this.NowCats = upper;
		}
		let cat_name = Roles.roles[this.NowCats]["name"];
		let cat_id = Roles.roles[this.NowCats]["id"];
		//重新加载这只猫的图片
		// let role = egret.Tween.get(this.roleImg);
		// role.to({alpha:0}, 100).to({texture:RES.getRes("role"+(cat_id)+"_1_all_png"), alpha:0}, 1).to({alpha:1}, 100);
		this.roleImg.texture=RES.getRes("role"+(cat_id)+"_1_all_png");
		UserInfo.roleid = cat_id;
		this.jellyBtn(this.leftBtn,200);
	}
	public jellyBtn(img,t){
		this.shinkButton(img);
		setTimeout(()=>{
			this.unshinkButton(img);
		},t)
	}
	public shinkButton(img){
		var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality:number = egret.BitmapFilterQuality.MEDIUM;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,strength, quality, inner, knockout );
		img.filters =[glowFilter];
	}
	public unshinkButton(img){
		img.filters = undefined;
	}

	public changeToPurchasePage(){
		SceneManager.getInstance().changeScene('purchasePage');
	}

	public initFluter(){
		var colorMatrix1 = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0];
		this.onClickFilter = new egret.ColorMatrixFilter(colorMatrix1);
		var colorMatrix2 = [
			0,0,0,0,0,
			0,0,0,0,0,
			0,0,0,0,0,
			0,0,0,0,0];
		this.onClickFilter = new egret.ColorMatrixFilter(colorMatrix2);
	}

	public changeToRoleLib(){
		SceneManager.getInstance().changeScene('RoleLibPage');
	}
	public dealChatWorldReply(data){
		console.log("收到chatWorldReply");
		if(data["errno"]==0){
			let chat=data["data"];
			let msg = chat["message"];
			let sender_id = chat["sender_id"];
			let sender_name = chat["sender_name"];
			let sender_avatar = chat["sender_avatar"];
			chat["avatar"] = chat["sender_avatar"];
			if(chat["avatar"]==null || chat["avatar"]==undefined){
				//使用默认头像
				chat["avatar"] = "role1_avatar_png";
			}
			if(this.WorldMessages.length<=20){
				this.WorldMessages.push(chat);
			}else{
				//上限20个
				this.WorldMessages.splice(0,1);
				this.WorldMessages.push(chat);
			}

			if(this.isRenderChatItem=="none"){

			}else{
				this.ChatScrollerRender();
			}


		}else{
			console.log("[*]Error: ",data["errmsg"]);
		}

	}

	public dealchatReply(data){
		if(data["errno"]==0){
			let chat=data["data"];
			let msg = chat["message"];
			let sender_id = chat["sender_id"];

			let receiver_id = chat["receiver_id"];
			if(sender_id==UserInfo.userid){
				//chat["avator"]=UserInfo.avator
				chat["sender_name"]=UserInfo.nickname;
				if(this.FriendsMessages[receiver_id]==undefined){
				this.FriendsMessages[receiver_id]=[];
			}
				if(this.FriendsMessages[receiver_id].length<=20)
			{
				this.FriendsMessages[receiver_id].push(chat);}
			else{
				this.FriendsMessages[receiver_id].slice(0,1);
				this.FriendsMessages[receiver_id].push(chat);
			}
			}
			else{
				for(let k of UserInfo.friendsList){
					if(k["id"]==sender_id){
						chat["sender_name"]=k["nickname"];
						chat["avator"]=k["avator"];
					}
					if(this.FriendsMessages[sender_id]==undefined){
						this.FriendsMessages[sender_id]=[];
					}
					if(this.FriendsMessages[sender_id].length<=20)
					{
						this.FriendsMessages[sender_id].push(chat);}
					else{
						this.FriendsMessages[sender_id].slice(0,1);
						this.FriendsMessages[sender_id].push(chat);
					}
				}
			}
			console.log("添加了一条私聊信息:",this.FriendsMessages[sender_id]);
			this.ChatScrollerRender();
		}else{
			console.log("[*]Error: ",data["errmsg"]);

			if(data["errno"]==1018){
				new infoView(SceneManager.getInstance().mainPage,"对方未上线",()=>{},()=>{},true,false);
				// this.InfoText.visible=true;
				// this.InfoTextLabel.text="对方未上线";
				// setTimeout(()=>{
				// 	this.InfoText.visible=false;
				// 	this.InfoTextLabel.text = "添加成功"
				// },1000);
			}

		}
	}

	public addToFriendLinster(){
		// SocketAPI.getPostReply()
		// 发送请求。。。

		// +
	}

	public sendBattleLinster(){
		// 发送对战邀请
		// +
	}







	public changeToSetting():void{
		/*
		setting 功能
		调节音量
		*/
		this.jellyBtn(this.setting,200);
		console.log("changeToSetting");
		MySettingPage.openPage();
	}

	public changeToWeeklyTask():void{
		/*
		  弹出任务 列表及完成进度
		*/
		TasklistPage.openPage();
	}

	public changeToMail():void{
		/*
		  弹出消息 消息形式类似邮箱
		  这个页面与 任务页面很像
		*/
		// MailPage.openPage();
		SceneManager.getInstance().changeScene('mailPage');
	}


	public changeTojourney():void{

		SceneManager.getInstance().changeScene('chacpterPage');
	}

	public changeTocardsCollection():void{
		/*
		卡牌展示页面, 这是一个新的页面
		卡牌有三类： 普通，buff, 条件触发

		*/
		//TODO
		SceneManager.getInstance().changeScene('cardLibrary')
		console.log("changeTocardsCollection");
	}

	public changeToFriendList():void{
		/**
		 * 好友页面
		 */
		FriendlistPage.openPage();
	}


	public changeToUserInfo():void{
		/**
		 * 个人信息页面
		 */
		UserInfoPage.openPage();
	}

	public changeRole():void{

	}

	public changeToMatchPage(): void{
		UserInfo.status = 0;
		SceneManager.getInstance().changeScene('matchPage');
	}

	public dealReconnectReply(data){
		if(data['errno'] == 0){
			if(data['data']['player1']['id'] == UserInfo.userid){
				UserInfo.enemyroleid = data['data']['player2']['id'];
				UserInfo.self_player = 'player1';
				UserInfo.enemy_player = 'player2';
			}else{
				UserInfo.enemyroleid = data['data']['player1']['id'];
				UserInfo.self_player = 'player2';
				UserInfo.enemy_player = 'player1';
			}
			UserInfo.roleid = data['data'][UserInfo.self_player]['role'];
			UserInfo.enemyroleid = data['data'][UserInfo.enemy_player]['role'];
			UserInfo.session = data['data']['session'];
			var self_status = data['data'][UserInfo.self_player]['status'];
			var enemy_status = data['data'][UserInfo.enemy_player]['status'];
			if(self_status == 3 &&  enemy_status == 3){
				UserInfo.enemyStatus = 3;
				UserInfo.status = 3;
				SceneManager.getInstance().changeScene('battlePage');
				SceneManager.getInstance().battlePage.updateData(data);
			}else if(enemy_status == 1 && enemy_status == 1){
				SceneManager.getInstance().changeScene('matchPage');
			}else if(enemy_status == 1  && enemy_status == 2){
				SceneManager.getInstance().changeScene('matchPage');
			}else if(enemy_status == 2  && enemy_status == 1){
				SceneManager.getInstance().changeScene('matchPage');
			}
		}else{
			//TODO 重连失败
			console.log('重连失败')
		}
	}


	public release(): void{
		//TODO: 释放所有监听
		console.log('mainpage release')
		if(this.battle.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.battle.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeToMatchPage,this);
			// console.log('hahaha')
		}
		if(this.setting.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.setting.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeToSetting,this);
			// console.log('hahaha')
		}
		if(this.journey.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.journey.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeTojourney,this);
			// console.log('hahaha')
		}
		if(this.cardsCollection.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.cardsCollection.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeTocardsCollection,this);
			// console.log('hahaha')
		}

		// 释放点击变灰监听
		for(let i = 0; i < this.longPressList.length; i++){
			this.longPressList[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.longPressList[i].removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this);
			this.longPressList[i].removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this);
			this.longPressList[i].filters = null;
		}

		// 释放所有缓动
		// egret.Tween.removeAllTweens();



	}

	public touchBegin(e: egret.TouchEvent){
		let target = e.target;
		if(target == this.addCoin || target == this.coins || target == this.iconNum)
			target = this.coin;
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

	public touchEndOrReleaseOutside(e: egret.TouchEvent){
		let target = e.target;
		if(target == this.addCoin || target == this.coins || target == this.iconNum)
			target = this.coin;
		target.filters = null;

	}

	public float(){
		let battleTween = egret.Tween.get(this.MainImgGroup, {loop:true});
		battleTween.to({y: this.MainImgGroup.y+15}, 1500, egret.Ease.sineInOut).to({y: this.MainImgGroup.y}, 1500, egret.Ease.sineInOut);

	}



	/* 聊天部分代码 */

	//变更聊天模式为世界模式并渲染数据
	public changeWorldMode() {
		if (this.isRenderChatItem != "world") {
			this.FriendListGroup.visible = false;
			this.ChatModeInfo.text = "[世界]"
			this.ChatModeInfo.textColor = 0x272729;
			// this.WorldBlackImage.width =568;
			this.FriendScroller.visible = false;
			this.isRenderChatItem = "world";
			this.ChatScrollerRender();
		}
	}

	//变更聊天模式为好友模式并渲染数据
	public changeFriendMode() {
		if (this.isRenderChatItem != "friend") {
			console.log("切换到好友模式");
			//更新私聊信息
			this.getPrivateMessage();
			this.FriendListGroup.visible = true;
			this.ChatModeInfo.textColor = 0x272729;

			if (this.NowSelectedFriends == 0) {
				this.ChatModeInfo.text = "[好友]";
			} else {
				for (let k of UserInfo.friendsList) {
					if (k["id"] == this.NowSelectedFriends) {
						if (k["nickname"].length > 7) {
							this.ChatModeInfo.text = "[" + k["nickname"].substr(0, 7) + "]";
						} else {
							this.ChatModeInfo.text = "[" + k["nickname"] + "]";
						}
						break;
					}
				}
			}
			this.ChatModeInfo.textColor = 0x272729;
			// this.WorldBlackImage.width =568+150;
			this.FriendScroller.visible = true;
			this.isRenderChatItem = "friend";
			this.ChatScrollerRender();
		}
	}
	//获取私聊信息并更新FriendsMessage
	public async getPrivateMessage() {
		let mailInfo = await SocketAPI.getPostReply(SocketAPI.urllist["getMail"], UserInfo.UserInfoString);
		let chatInfo = [];
		if (mailInfo["errno"] != 0) {
			new infoView(this, "无法获取离线私人聊天信息,网络连接出错。", () => {}, () => {}, true, false);
		} else {
			// 去除留言,只显示邮件,留言将在其他页面显示
			chatInfo = mailInfo["data"].filter((item) => {
				item["mail"]=JSON.parse(item["mail"]);
				return item["mail"].type == 2;
			})
		}
		let tmp_chat;
		for (let i = 0; i < chatInfo.length; i++) {
			tmp_chat = {};
			tmp_chat["sender_id"] = chatInfo[i]["from"];
			tmp_chat["receiver_id"] = chatInfo[i]["userid"];
			for (let k of UserInfo.friendsList) {
				if (k["id"] == chatInfo[i]["from"]) {
					tmp_chat["sender_name"] = k["nickname"];
					tmp_chat["avator"] = k["avator"];
				}
			}
			this.FriendsMessages[tmp_chat["senderr_id"]] = tmp_chat;
		}
	}
	//根据聊天模式发送聊天信息
	public sendMessage() {
		this.jellyBtn(this.SendMessage, 200);
		let msg = this.ChatSender.text;
		console.log("当前mode:", this.isRenderChatItem);
		console.log("发送信息:", msg);
		if (this.isRenderChatItem == "world") {
			SocketAPI.socket.emit("chatWorld", {
				sender_id: UserInfo.userid,
				message: msg,
				sender_name: UserInfo.nickname
			});
			this.ChatSender.text = "";
		} else if (this.isRenderChatItem == "friend") {
			if (this.NowSelectedFriends == 0) {
				new infoView(SceneManager.getInstance().mainPage, "请选择你要发送信息的好友", () => {}, () => {}, true, false);
				return;
			}
			let isYourFriend = false;
			for (let k of UserInfo.friendsList) {
				if (k["id"] == this.NowSelectedFriends) {
					isYourFriend = true;
					break;
				}
			}

			SocketAPI.socket.emit('chat', {
				sender_id: UserInfo.userid,
				receiver_id: this.NowSelectedFriends,
				message: msg
			})
			this.ChatSender.text = "";
			console.log("私聊:", msg);
		}

	}

	//打开聊天面板
	public async openChatPanel() {
		//每次打开好友聊天时pull私聊信息渲染
		this.getPrivateMessage();

		//关闭小的窗口,打开打的半页面窗口
		//设置水平滚动条的不可见
		this.WorldChatScroller.horizontalScrollBar.autoVisibility = false;
		this.FriendScroller.horizontalScrollBar.autoVisibility = false;

		var blurFliter = new egret.BlurFilter(3, 3);
		this.MainPageGroup.filters = [blurFliter];
		this.ShowWorldChat.visible = false;
		this.ChatGroup.visible = true;
		this.isRenderChatItem = "world";
		this.ChatScrollerRender();

	}

	//发送添加好友请求
	public async addFriends() {
		let i = this.WorldScrollerList.$getSelectedIndex();
		if (i == undefined || this.WorldMessages[i] == undefined) {
			return;
		}
		if (this.WorldMessages[i]["sender_id"] == UserInfo.userid) {
			//不能添加自己为好友
			return;
		}
		console.log("添加好友:", this.WorldMessages[i]);
		let addFriendReply = await SocketAPI.getPostReply(SocketAPI.urllist["addFriend"], "userid=" + String(UserInfo.userid) + "&friend_id=" + String(this.WorldMessages[i]["sender_id"]));
		UserInfo.updateUserInfo(addFriendReply);
		let that = this;
		new infoView(SceneManager.getInstance().mainPage, "添加成功", () => {
			that.NowSelectedFriends = that.WorldMessages[i]["sender_id"];
			this.changeFriendMode();
		}, () => {}, true, false);

	}
	//渲染聊天信息
	public ChatScrollerRender() {

		if (this.isRenderChatItem == "world") {
			//渲染全部的聊天信息
			console.log("渲染聊天信息:", this.WorldMessages);
			// 转成eui数组
			let euiArr: eui.ArrayCollection = new eui.ArrayCollection(this.WorldMessages)
			// 把list_hero数据源设置成euiArr
			this.WorldScrollerList.dataProvider = euiArr
			// 	设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
			this.WorldScrollerList.itemRenderer = chatworldItem
		} else if (this.isRenderChatItem == "friend") {
			//显示好友列表
			console.log("渲染好友列表:", UserInfo.friendsList);
			let euiArr: eui.ArrayCollection = new eui.ArrayCollection(UserInfo.friendsList);
			this.FriendScrollerList.dataProvider = euiArr
			this.FriendScrollerList.itemRenderer = friendItem
			//渲染好友聊天信息
			console.log("好友聊天信息:", this.FriendsMessages)
			let euiArr2: eui.ArrayCollection = new eui.ArrayCollection(this.FriendsMessages[this.NowSelectedFriends])
			// 把list_hero数据源设置成euiArr2
			this.WorldScrollerList.dataProvider = euiArr2
			// 	设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
			this.WorldScrollerList.itemRenderer = chatworldItem
		}

	}

	//点击关闭聊天面板
	public closeChatPanel() {

		//关闭聊天半页面，取消模糊
		// var blurFliter = new egret.BlurFilter( 3, 3);
		this.MainPageGroup.filters = undefined;
		this.ShowWorldChat.visible = true;
		this.ChatGroup.visible = false;
		this.isRenderChatItem = "none";
		// this.ChatScrollerRender();
	}
	//选择好友进行私聊
	public chooseFriend() {

		let i = this.FriendScrollerList.$getSelectedIndex();
		if (i == undefined || i == null || UserInfo.friendsList[i] == undefined) {
			return;
		}
		let nowFriend = UserInfo.friendsList[i];
		this.NowSelectedFriends = UserInfo.friendsList[i]["id"];
		console.log("选中好友", UserInfo.friendsList[i]["id"]);
		if (UserInfo.friendsList[i]["nickname"].length > 7) {
			this.ChatModeInfo.text = "[" + UserInfo.friendsList[i]["nickname"].substr(0, 7) + "]";
		} else {
			this.ChatModeInfo.text = "[" + UserInfo.friendsList[i]["nickname"] + "]";
		}
	}


	public getChatItemGroup(each) {

		let msg = each["message"];
		let sender_id = each["sender_id"];
		let sender_name = each["sender_name"];
		let chatgroup = new eui.Group();
		let label1 = new eui.Label();
		let label2 = new eui.Label();
		label1.width = 50;
		label1.height = 50;
		label1.x = 0;
		label1.y = 0;
		label2.width = 350;
		label2.height = 50;
		label2.x = 50;
		label2.y = 0;
		chatgroup.width = 400;
		chatgroup.height = 50;
		chatgroup.addChild(label1);
		chatgroup.addChild(label2);
		return chatgroup;
	}

}
class chatworldItem extends eui.ItemRenderer{
	public chatDialogImg:eui.Image;
	public user_avatar_img:eui.Image;
	public constructor() {
		super()
		// 把这个 类和皮肤 联系起来
		this.skinName = 'resource/eui_skins/WorldChatScrollerList.exml';

		let distance:number = 6;           /// 阴影的偏移距离，以像素为单位
		let angle:number = 45;              /// 阴影的角度，0 到 360 度
		let color:number = 0x000000;        /// 阴影的颜色，不包含透明度
		let alpha:number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
		let blurX:number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		let blurY:number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		let strength:number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		let quality:number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
		let inner:boolean = false;            /// 指定发光是否为内侧发光
		let knockout:boolean = false;            /// 指定对象是否具有挖空效果
		let dropShadowFilter:egret.DropShadowFilter =  new egret.DropShadowFilter( distance, angle, color, alpha, blurX, blurY,
			strength, quality, inner, knockout );

		this.chatDialogImg.filters =[dropShadowFilter];
		// 显示自己的头像并为其添加遮罩
		var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(30,25+30,30);
        circle.graphics.endFill();
        this.addChild(circle);
        this.user_avatar_img.mask = circle;
	}
}
class friendItem extends eui.ItemRenderer{
	public friend_avatar_img:eui.Image;
	public constructor() {
		super()
		// 把这个 类和皮肤 联系起来
		this.skinName = 'resource/eui_skins/FriendsScollerList.exml';
		// 显示头像并为其添加遮罩
		var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(30,10+30,30);
        circle.graphics.endFill();
        this.addChild(circle);
        this.friend_avatar_img.mask = circle;
	}
}
