class SceneManager extends egret.Sprite{
	//页面管理类
	public static instance: SceneManager;
	public login: Login;
	public mainPage: MainPage;
	public matchPage: MatchPage;
	public battlePage: BattlePage;
	public currentScene: number;
	public settingPage: MySettingPage;
	public sceneNameList: any[];
	public sceneList: any[];
	public friendlistPage: FriendlistPage;
	public mailPage: MailPage;
	public tasklistPage: TasklistPage;
	public cardLibrary: CardLibrary;
	public roleLibPage:RoleLibPage;
	public adventureMap:AdventureMap;
	public storyGamePage:StoryGamePage;
	public purchasePage:PurchasePage;
	public singleBattlePage: SingleBattlePage;
	public doubleBattlePage: DoubleBattlePage;
	public loadingPage: LoadingPage;
	public chacpterPage: ChacpterPage;

	public constructor() {
		super();
		this.init();
	}

	public socketOn(){
		console.log('socketOn',io);
        SocketAPI.socket = io.connect(SocketAPI.SocketUrl);
        // SocketAPI.socket = io.connect("http://120.78.76.249:8080");
        SocketAPI.socket.on('close', (data)=>console.log(data));
        SocketAPI.socket.on('openReply', (data)=>console.log('openReply: ', data));
		SocketAPI.socket.on(UserInfo.resurgenceReply, (data)=>{console.log('resurgenceReply: ', data), this.mainPage.dealReconnectReply(data)});
		SocketAPI.socket.on(UserInfo.matchReply, (data)=>{console.log('matchReply in SceneManager: ', data), this.matchPage.dealMatchReply(data)});
		SocketAPI.socket.on(UserInfo.opponentReadyGameReply, (data)=>{console.log('opponentReadyGameReply: ', data), this.matchPage.dealOpponentReadyGameReply(data)});
		SocketAPI.socket.on(UserInfo.readyGameReply, (data)=>{console.log('readyGameReply: ', data); console.log('now turn: ', data['data']['now_turn']); data["data"]["mode"]=="PVP"?this.matchPage.dealReadyGameReply(data):this.singleBattlePage.dealReadyGameReply(data)});
		SocketAPI.socket.on(UserInfo.beginTurnReply, (data)=>{console.log('beginTurnReply: ', data); console.log('now turn: ', data['data']['now_turn']); data["data"]["mode"]=="PVP"?this.battlePage.updateData(data):this.singleBattlePage.dealBeginTurnReply(data)});
		SocketAPI.socket.on(UserInfo.useCardReply, (data)=>{console.log('useCardReply: ', data); console.log('now turn: ', data['data']['now_turn']); data["data"]["mode"]=="PVP"?this.battlePage.updateData(data):this.singleBattlePage.useCardORSkillReply(data)});
		SocketAPI.socket.on(UserInfo.endTurnReply, (data)=>{console.log('endTurnReply: ', data); console.log('now turn: ', data['data']['now_turn']); data["data"]["mode"]=="PVP"?this.battlePage.dealEndTurn(data):this.singleBattlePage.dealEndTurnReply(data)});
		SocketAPI.socket.on(UserInfo.closeGameReply, (data) => {console.log('closeGameReply: ', data), this.dealCloseGameReply(data)});
		SocketAPI.socket.on(UserInfo.chatWorldReply, (data) => {console.log('chatWorldReply: ', data), this.mainPage.dealChatWorldReply(data)});
		SocketAPI.socket.on(UserInfo.chatReply, (data) => {console.log('chatReply: ', data), this.mainPage.dealchatReply(data)});		
		SocketAPI.socket.on(UserInfo.adventureGameReply, (data) => {console.log('adventureGameReply: ', data); this.storyGamePage.dealAdventureGameReply(data)});
		SocketAPI.socket.on(UserInfo.chooseCardReply, (data) => {console.log('chooseCardReply: ', data), this.singleBattlePage.dealchooseCardReply(data)});
		// SocketAPI.socket.on('useCard', func());
    }

	public close(){
		console.log('close');
	}

	public init(){
		this.sceneList = [];
		this.sceneNameList = [];
		this.login = new Login();
		this.sceneList.push(this.login);
		this.sceneNameList.push("login");
		this.mainPage = new MainPage();
		this.sceneList.push(this.mainPage);
		this.sceneNameList.push("mainPage");
		this.matchPage = new MatchPage();
		this.sceneList.push(this.matchPage);
		this.sceneNameList.push("matchPage");

		this.battlePage = new BattlePage();
		this.sceneList.push(this.battlePage);
		this.sceneNameList.push("battlePage");
		
		this.cardLibrary = new CardLibrary();
		this.sceneList.push(this.cardLibrary);
		this.sceneNameList.push('cardLibrary');
		
		this.settingPage = MySettingPage.getInstance();
		this.sceneNameList.push("settingPage");
		this.sceneList.push(this.settingPage);

		this.friendlistPage = FriendlistPage.getInstance();
		this.sceneNameList.push("friendlistPage");
		this.sceneList.push(this.friendlistPage);

		this.mailPage = MailPage.getInstance();
		this.sceneNameList.push("mailPage");
		this.sceneList.push(this.mailPage);
		
		this.tasklistPage = TasklistPage.getInstance();
		this.sceneNameList.push("tasklistPage");
		this.sceneList.push(this.tasklistPage);
	

		this.roleLibPage = new RoleLibPage();
		this.sceneNameList.push("RoleLibPage");
		this.sceneList.push(this.roleLibPage);

		this.adventureMap = new AdventureMap();
		this.sceneNameList.push("adventureMap");
		this.sceneList.push(this.adventureMap);

		this.storyGamePage = new StoryGamePage();
		this.sceneNameList.push("storyGamePage");
		this.sceneList.push(this.storyGamePage);

		this.doubleBattlePage = new DoubleBattlePage();
		this.sceneNameList.push('doubleBattlePage');
		this.sceneList.push(this.doubleBattlePage);

		this.singleBattlePage = new SingleBattlePage();
		this.sceneNameList.push('singleBattlePage');
		this.sceneList.push(this.singleBattlePage);

		this.purchasePage = new PurchasePage();
		this.sceneNameList.push('purchasePage');
		this.sceneList.push(this.purchasePage);

		this.loadingPage = new LoadingPage();
		this.sceneNameList.push('loadingPage');
		this.sceneList.push(this.loadingPage);

		this.chacpterPage = new ChacpterPage();
		this.sceneNameList.push('chacpterPage');
		this.sceneList.push(this.chacpterPage);

		this.addChild(this.login);
		this.currentScene = this.sceneNameList.indexOf("login");

		
}

	public dealCloseGameReply(data){
		if(data['errno'] == 0){
			// closeGame, 清空session
			UserInfo.session = undefined;
			console.log("[*] 输出战斗类型",UserInfo.battleType,UserInfo.status);
			if(UserInfo.battleType == 0){
				throw new Error('battleType == 0');
			}else if(UserInfo.battleType == 2){
				// 处理双人对战CloseGameReply
				console.log('处理双人对战CloseGameReply');
				console.log('UserInfo.status: ', UserInfo.status);
				if(UserInfo.status == 0){
					console.log('匹配成功前退出');
					this.matchPage.dealCloseGameReply(data);
				}

				if(UserInfo.status == 1 || UserInfo.status == 2){
					//0表示在匹配中,1表示匹配完成但未准备,2表示已准备但未开始游戏,3表示开始对局在游戏中
					// 1 匹配完成但未准备, 2 已准备但未开始游戏
					console.log('匹配后战斗前退出');
					this.matchPage.dealCloseGameReply(data);
				}
				if(UserInfo.status == 3){
					// 3表示开始对局在游戏中
					console.log('战斗开始后退出');
					this.battlePage.dealCloseGameReply(data);
				}
			}else{
				// 处理单人对战CloseGameReply
				console.log('处理单人对战CloseGameReply');
				this.storyGamePage.dealCloseGameReply(data);
			}
		}else{
			console.log('closeGameReply Error: ', data['errno']);
			throw new Error('CloseGameReply Error');
		}
		
	}
	public static getInstance(): SceneManager{
		if(!SceneManager.instance){
			SceneManager.instance = new SceneManager();
		}
		return SceneManager.instance;
	}

	public changeScene(name){
	
		// this.addChild(this.loadingPage);
		let oldScene = this.currentScene;
		// this.removeChildren();
		if(this.sceneNameList[this.currentScene] == 'singleBattlePage'){
			this.sceneList[this.currentScene].release();
		}
		if(this.sceneNameList[this.currentScene] == 'mainPage'){
			this.sceneList[this.currentScene].release();
		}
		// 可以用字典
		let flag = false;
		for(let i = 0; i < this.sceneNameList.length; i++){
			if(this.sceneNameList[i] == name){
				this.currentScene = i;
				flag = true;
				break;
			}
		}
		if(!flag){
			throw new Error('cannot find page');
		}
		console.log('change scene to: ', this.sceneNameList[this.currentScene]);
		this.addChild(this.sceneList[this.currentScene]);
		this.removeChild(this.sceneList[oldScene]);
		console.log('remove child:  ', this.sceneNameList[oldScene]);
		// this.removeChild(this.loadingPage);
		return this.sceneList[this.currentScene];
	}

	public stackAddScene(name){
		if(this.currentScene == 0){
			console.log('socket open')

		}		
		//this.removeChildren();
		let tmp;
		for(let i = 0; i < this.sceneNameList.length; i++){
			if(this.sceneNameList[i] == name){
				tmp = i;
				break;
			}
		}
		this.addChild(this.sceneList[tmp]);
	}

	public stackRemoveScene(name){
		if(this.currentScene == 0){
			console.log('socket open')
		}
		let tmp;
		for(let i = 0; i < this.sceneNameList.length; i++){
			if(this.sceneNameList[i] == name){
				tmp = i;
				break;
			}
		}
		let sceneTmp = this.sceneList[tmp];
		if(sceneTmp.parent){
			sceneTmp.parent.removeChild(sceneTmp);
		}else{
			throw new Error('移除不存在父亲的场景');
		}
	}



}
