class MatchPage extends eui.Component implements  eui.UIComponent {

	private cancelMatchBtn:eui.Button;
	private selfRoleImg: eui.Image;
	private enemyRoleImg: eui.Image;
	private readyGameBtn:eui.Button;
	private cancelReadyBtn:eui.Button;
	private Lv:eui.Label;
	private coin:eui.Group;
	private coins:eui.Button;
	private iconNum:eui.Label;
	private backBtn: eui.Button;
	private timeOutObj: any = null;
	private getMatchReply: boolean = false;
	public matchAgainBtn:eui.Button;

	//聊天变量声明
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
	public FriendListGroup:eui.Group;
	private isRenderChatItem = "world";
	public WorldMessages = []; 
	public FriendsMessages = {};
	//FriendsMessages 选择的项
	public NowSelectedFriends = 0;
	public NowCats = 0;

	public longPressList = [];


	public constructor() {
		super();
	}


	protected childrenCreated():void{
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		super.childrenCreated();
		this.init();
		this.addLinsters();
	}

	public init(){
		new infoView(this, "开发中，敬请期待", ()=>{SceneManager.getInstance().changeScene('mainPage')}, ()=>{}, true, false);
	}
	// protected init(){
	// 	let x=Math.ceil(Math.random()*10);
	// 					if(x>=10){x=7;}
		
	// 	// 显示自己的头像并为其添加遮罩
	// 	let circle: egret.Shape = new egret.Shape();
    //     circle.graphics.beginFill(0x0000ff);
	// 	circle.graphics.drawCircle(910+60,408+60,60);
    //     circle.graphics.endFill();
    //     this.addChild(circle);
    //     this.selfRoleImg.mask = circle;
	// 	// this.selfRoleImg.texture = RES.getRes('role1_avatar_png');
	// 	console.log("加载己方头像:",UserInfo.avatar);
	// 	RES.getResByUrl(UserInfo.avatar,this.onComplete1,this,RES.ResourceItem.TYPE_IMAGE);

	// 	// 显示对方的头像并为其添加遮罩
	// 	let circle2: egret.Shape = new egret.Shape();
	// 	circle2.graphics.beginFill(0x0000ff);
	// 	circle2.graphics.drawCircle(586+60,110+60,60);
    //     circle2.graphics.endFill();
    //     this.addChild(circle2);
    //     this.selfRoleImg.mask = circle2;
	// 	// this.selfRoleImg.texture = RES.getRes('role1_avatar_png');
	// 	this.enemyRoleImg.source = RES.getRes('role1_avatar_png');
	// 	// RES.getResByUrl(UserInfo.avatar,this.onComplete2,this,RES.ResourceItem.TYPE_IMAGE);
		
	// 	//为聊天页面滚动条设置属性
	// 	this.WorldChatScroller.scrollPolicyH = "off";
	// 	this.FriendScroller.scrollPolicyH = "off";
	// 	//初始化聊天面板
	// 	this.isRenderChatItem = "world";
	// 	this.ChatScrollerRender();
	// 	this.WorldChatScroller.horizontalScrollBar.autoVisibility = false;
	// 	this.FriendScroller.horizontalScrollBar.autoVisibility = false;


	// 	this.iconNum.text = String(UserInfo.coins);
	// 	// 设置对战类型为 2:双人对战
	// 	UserInfo.battleType = 2;
	// 	this.cancelMatchBtn.visible = true;
	// 	this.matchAgainBtn.visible = false;
	// 	this.cancelReadyBtn.visible = false;
	// 	this.readyGameBtn.visible = false;
	// 	UserInfo.status = 0;
	// 	SocketAPI.socket.emit('match', {roleid:UserInfo.roleid, username: UserInfo.username, password: UserInfo.password,  userid: UserInfo.userid});
	// }
	public  onComplete1(event:any):void {
        var img: egret.Texture = <egret.Texture>event;
		this.selfRoleImg.texture = img;
    }
	public  onComplete2(event:any):void {
        var img: egret.Texture = <egret.Texture>event;
		this.enemyRoleImg.texture = img;
    }
	public addLinsters(){
		this.cancelMatchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelMatch, this);
		this.matchAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.matchAgain, this);
		this.readyGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readyGame, this);
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		//聊天事件
		// this.ShowWorldChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openChatPanel, this);
		this.WorldButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeWorldMode,this);
		this.FriendButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeFriendMode,this);
		this.SendMessage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendMessage,this);
		this.WorldScrollerList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addFriends,this)
		this.FriendScrollerList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.chooseFriend,this)

		// 添加长按滤镜
		this.longPressList.push(this.cancelMatchBtn);
		this.longPressList.push(this.matchAgainBtn);
		this.longPressList.push(this.readyGameBtn);
		this.longPressList.push(this.backBtn);
		for(let i = 0; i < this.longPressList.length; i++){
			this.longPressList[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.longPressList[i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchReleaseOutside, this)
		}
	}
	public sendMessage(){
		let msg = this.ChatSender.text;
		console.log("当前mode:",this.isRenderChatItem);
		console.log("发送信息:",msg);
		if(this.isRenderChatItem=="world"){
			SocketAPI.socket.emit("chatWorld",{sender_id:UserInfo.userid,message:msg,sender_name:UserInfo.nickname});
			this.ChatSender.text="";
		}else if(this.isRenderChatItem=="friend"){
			if(this.NowSelectedFriends==0){
				new infoView(SceneManager.getInstance().mainPage,"请选择你要发送信息的好友",()=>{},()=>{},true,false);
				return;
			}
			let isYourFriend = false;
			for(let k of UserInfo.friendsList)
			{
				if(k["id"]==this.NowSelectedFriends){
					isYourFriend = true;
					break;
				}
			}
			SocketAPI.socket.emit('chat', {sender_id: UserInfo.userid ,receiver_id: this.NowSelectedFriends, message: msg})
			this.ChatSender.text="";
			console.log("私聊:",msg);
		}
		
	}
	public getChatItemGroup(each){
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
	public ChatScrollerRender(){
		if(this.isRenderChatItem=="world"){
			//渲染全部的聊天信息
			console.log("渲染聊天信息:",this.WorldMessages);
			// 转成eui数组
			let euiArr:eui.ArrayCollection = new eui.ArrayCollection(this.WorldMessages)
			// 把list_hero数据源设置成euiArr
			this.WorldScrollerList.dataProvider = euiArr
			// 	设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
			this.WorldScrollerList.itemRenderer = chatworldItem
		}else if(this.isRenderChatItem=="friend"){
			//显示好友列表
			console.log("渲染好友列表:",UserInfo.friendsList);
			let euiArr:eui.ArrayCollection = new eui.ArrayCollection(UserInfo.friendsList);
			this.FriendScrollerList.dataProvider = euiArr
			this.FriendScrollerList.itemRenderer = friendItem
			//渲染好友聊天信息
			console.log("好友聊天信息:",this.FriendsMessages)
			let euiArr2:eui.ArrayCollection = new eui.ArrayCollection(this.FriendsMessages[this.NowSelectedFriends])
			// 把list_hero数据源设置成euiArr2
			this.WorldScrollerList.dataProvider = euiArr2
			// 	设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
			this.WorldScrollerList.itemRenderer = chatworldItem
		}
		
	}
	public changeWorldMode(){
		if(this.isRenderChatItem!="world"){
			this.FriendListGroup.visible = false;
			this.ChatModeInfo.text = "[世界]"
			this.ChatModeInfo.textColor = 0x272729;
			// this.WorldBlackImage.width =568;
			this.FriendScroller.visible=false;
			this.isRenderChatItem = "world";
			this.ChatScrollerRender();
		}
	}
	public changeFriendMode(){
		if(this.isRenderChatItem!="friend"){
			console.log("切换到好友模式");
			this.FriendListGroup.visible = true;
			this.ChatModeInfo.textColor =0x272729;
			
			if(this.NowSelectedFriends==0){
				this.ChatModeInfo.text = "[好友]";
			}else{
				for(let k of UserInfo.friendsList){
				if(k["id"]==this.NowSelectedFriends){
					if(k["nickname"].length>7){
						this.ChatModeInfo.text = "["+k["nickname"].substr(0,7)+"]";
					}else{
						this.ChatModeInfo.text = "["+k["nickname"]+"]";
					}
					break;
				}
			}		
			}
			this.ChatModeInfo.textColor = 0x272729;
			// this.WorldBlackImage.width =568+150;
			this.FriendScroller.visible=true;
			this.isRenderChatItem = "friend";
			this.ChatScrollerRender();
		}
	}
	public async addFriends(){
		let i=this.WorldScrollerList.$getSelectedIndex();
		if(i==undefined||this.WorldMessages[i]==undefined){
			return;
		}
		if(this.WorldMessages[i]["sender_id"]==UserInfo.userid){
			//不能添加自己为好友
			return;	
		}
		console.log("添加好友:",this.WorldMessages[i]);
		let addFriendReply=await SocketAPI.getPostReply(SocketAPI.urllist["addFriend"],"userid="+String(UserInfo.userid)+"&friend_id="+String(this.WorldMessages[i]["sender_id"]));
		UserInfo.updateUserInfo(addFriendReply);
		let that = this;
		new infoView(SceneManager.getInstance().mainPage,"添加成功",()=>{
			that.NowSelectedFriends = that.WorldMessages[i]["sender_id"];
			that.changeFriendMode();
		},()=>{},true,false);
		
	}
	public chooseFriend(){
		let i=this.FriendScrollerList.$getSelectedIndex();
		if(i==undefined || UserInfo.friendsList[i]==undefined){
			return;
		}
		let nowFriend = UserInfo.friendsList[i];
		this.NowSelectedFriends = UserInfo.friendsList[i]["id"];
		console.log("选中好友",UserInfo.friendsList[i]["id"]);
		if(UserInfo.friendsList[i]["nickname"].length>7){
			this.ChatModeInfo.text = "["+UserInfo.friendsList[i]["nickname"].substr(0,7)+"]";
		}else{
			this.ChatModeInfo.text = "["+UserInfo.friendsList[i]["nickname"]+"]";
		}
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
						// chat["avator"]=k["avator"];
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

	public back(){
		// 如果 已经起效匹配
		if(this.matchAgainBtn.visible = true){
			// 未匹配到
			clearTimeout(this.timeOutObj);
			this.timeOutObj = null;
			UserInfo.goBackClicker = 0;			//数据恢复
			SceneManager.getInstance().changeScene('mainPage');
		// 没有取消匹配，匹配到....直接退出
		}else{
			// 匹配到
			clearTimeout(this.timeOutObj);
			this.timeOutObj = null;
			UserInfo.goBackClicker = 1;
			SocketAPI.socket.emit('closeGame', {session: UserInfo.session, userid: UserInfo.userid, noFight: 0});
			console.log('emmit closegame: ', {session: UserInfo.session, userid: UserInfo.userid, noFight: 0});
		}
		
	}


	public dealMatchReply(data){
		//刚刚没有进行对战，第一次战斗
		if(data["errno"]==1011){
			console.log("send match after 1000.");
			console.log('@@@ this.timrOutObj: ', this.timeOutObj)
			if(this.timeOutObj != null){

			}else{
				this.timeOutObj = setInterval(()=>{
				SocketAPI.socket.emit('match', {roleid:UserInfo.roleid, username: UserInfo.username, password: UserInfo.password,  userid: UserInfo.userid});
			},1000);
			}
			
			
			return;

		}else if(data["errno"]!=0){
			//TODO 处理超时

		}else if(data["errno"]==0){
			console.log('match success')
			if(data['data']['player1']['id'] == UserInfo.userid){
				UserInfo.enemyroleid = data['data']['player2']['id'];
				UserInfo.self_player = 'player1';
				UserInfo.enemy_player = 'player2';
			}else{
				UserInfo.enemyroleid = data['data']['player1']['id'];
				UserInfo.self_player = 'player2';
				UserInfo.enemy_player = 'player1';
			}
			UserInfo.session = data['data']['session'];
			
			console.log('首次进入')
			this.readyGameBtn.visible = true;
			this.cancelReadyBtn.visible = false;
			this.cancelMatchBtn.visible = false;
			this.matchAgainBtn.visible = false;
			this.enemyRoleImg.texture = RES.getRes('role1_1_png');
			UserInfo.status = 1;
			UserInfo.enemyStatus = data['data'][UserInfo.enemy_player]['status'];
		}
	}

	public getMatchAgain(data){
		//刚刚没有进行对战，第一次战斗
			
			if(data["errno"]==1011){
				console.log("send match after 1000.");
				this.timeOutObj = setTimeout(()=>{
					SocketAPI.socket.emit('match', {roleid:UserInfo.roleid, username: UserInfo.username, password: UserInfo.password,  userid: UserInfo.userid});
				},1000);
				return;

			}else if(data["errno"]!=0){
				//TODO 处理超时

			}else if(data["errno"]==0){
				console.log('match data: ', data)
				console.log('match success')
				if(data['data']['game_info']['player1']['id'] == UserInfo.userid){
					UserInfo.enemyroleid = data['data']['game_info']['player2']['id'];
					UserInfo.self_player = 'player1';
					UserInfo.enemy_player = 'player2';
				}else{
					UserInfo.enemyroleid = data['data']['game_info']['player1']['id'];
					UserInfo.self_player = 'player2';
					UserInfo.enemy_player = 'player1';
				}
				UserInfo.session = data['data']['game_info']['session'];
				
				console.log('再次进入')
				this.readyGameBtn.visible = true;
				this.cancelReadyBtn.visible = false;
				this.cancelMatchBtn.visible = false;
				
				this.enemyRoleImg.texture = RES.getRes('role1_1_png');
				UserInfo.status = 1;
				UserInfo.enemyStatus = data['data']['game_info'][UserInfo.enemy_player]['status'];
				this.getMatchReply = true;
			}
		}


	public dealOpponentReadyGameReply(data){
		if(data['data']['success'] == true){
			UserInfo.enemyStatus = 2;
			//TODO 显示对手已准备
		}else{
			UserInfo.enemyStatus = 1;
			//TODO 显示对手未准备
		}
	}

	public dealReadyGameReply(data){
		if(data['errno'] != 0){
			console.log('wrong data in dealReadyGameReply: ', data);
			throw new Error('wrong data in dealReadyGameReply')
		}else{
			console.log('set getMatchReply false');
			this.getMatchReply = false;
			SceneManager.getInstance().battlePage.dealReadyGameReply(data);
			UserInfo.status = 3;
			UserInfo.enemyStatus = 3;
		}
	}

	protected readyGame(){
		this.readyGameBtn.visible = false;
		this.cancelReadyBtn.visible = true;
		SocketAPI.socket.emit('readyGame', {session:UserInfo.session, userid: UserInfo.userid});
		UserInfo.status = 2;
	}
	//TODO 聊天

	protected cancelMatch(){
		//TODU: 结束发送匹配请求
		console.log('cancle match');
		this.cancelMatchBtn.visible = false;
		this.matchAgainBtn.visible = true;
		console.log('this.timeOutObj: ', this.timeOutObj);
		clearTimeout(this.timeOutObj);
		this.timeOutObj = null;
		SocketAPI.socket.emit('closeGame', {session: UserInfo.session, userid: UserInfo.userid, noFight: 0});
		console.log('emmit closegame: ', {session: UserInfo.session, userid: UserInfo.userid, noFight: 0})
	}

	protected matchAgain(){
		this.cancelMatchBtn.visible = true;
		this.matchAgainBtn.visible = false;
		SocketAPI.socket.emit('match', {roleid:UserInfo.roleid, username: UserInfo.username, password: UserInfo.password,  userid: UserInfo.userid});
	}
	
	//处理closeGameReply
	public dealCloseGameReply(data){
		// 如果自己发出了返回按钮
		if(UserInfo.goBackClicker == 1){
			console.log('自己发出了返回按钮');
			SceneManager.getInstance().changeScene('mainPage');
			UserInfo.status = -1;
			UserInfo.enemyStatus = -1;
			UserInfo.goBackClicker = 0;
		// 如果对方发出了返回按钮或者自己取消了匹配
		}else{
			// // 自己点击取消匹配（未匹配到）
			if(UserInfo.status == 0){
				console.log('自己点击取消匹配（未匹配到）')
				// 已经设置为取消匹配
				UserInfo.status = 0;
				UserInfo.goBackClicker = 0;
			}
			// 对方退出了房间
			if(UserInfo.status == 1){
				console.log('对方退出了匹配');
				UserInfo.status = -1;
				UserInfo.enemyStatus = -1;
				UserInfo.goBackClicker = 0;
				SceneManager.getInstance().changeScene('mainPage');
			// 对方退出了准备
			}else if(UserInfo.status == 2){
				UserInfo.status = -1;
				UserInfo.enemyStatus = -1;
				console.log('对方退出了准备');
				UserInfo.goBackClicker = 0;
				SceneManager.getInstance().changeScene('mainPage');
			// 对方退出了游戏
			}else if(UserInfo.status == 3){
				console.log('对方退出了游戏');
				UserInfo.status = -1;
				UserInfo.enemyStatus = -1;
				UserInfo.goBackClicker = 0;
				// TODO
			}
			
		}
		
	}

	public release(){
		if(this.cancelMatchBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)){

		}
	}

	public static statusChange1(id, oldVal, newVal){
		if(newVal == 2 && UserInfo.enemyStatus == 2){
			UserInfo.enemyStatus = 3;
			UserInfo.status = 3;
		}
	}

	public static statusChange2(id, oldVal, newVal){
		if(newVal == 2 && UserInfo.status == 2){
			UserInfo.enemyStatus = 3;
			UserInfo.status = 3;
		}
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
