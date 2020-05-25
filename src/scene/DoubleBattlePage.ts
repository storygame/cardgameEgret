class DoubleBattlePage extends eui.Component implements  eui.UIComponent {
	
	public battleElementsGroup:eui.Group;
	public backGround:eui.Image;

	// 对手元素
	public enemyElements:eui.Group;
	public enemyPanelImg:eui.Image;
	public enemyHPGroup:eui.Group;
	public enemyHpBg:eui.Image;
	public enemyHpBlockFirst:eui.Image;
	public enemyHpBlockList:Array<eui.Image> = [];
	public enemyHpLabel:eui.Label;
	public enemyManaGroup:eui.Group;
	public enmyManaImg:eui.Image;
	public enemyManaNumLable:eui.Label;
	public enemyProtectOuterGroup:eui.Group;
	public enemyProtect2Img:eui.Image;
	public enemyProtectGroup:eui.Group;
	public enemyProtectImg:eui.Image;
	public enemyProtectNumLabel:eui.Label;
	public enemyCBSGroup:eui.Group;
	public enemyBuffOuterGroup:eui.Group;
	public enemyBuff2Img:eui.Image;
	public enemyBuffGroup:eui.Group;
	public enemyBuffImg:eui.Image;
	public enemyBuffNumLabel:eui.Label;
	public enemyConditionOuterGroup:eui.Group;
	public enemyCondition2Img:eui.Image;
	public enemyConditionGroup:eui.Group;
	public enemyConditionImg:eui.Image;
	public enemyConditionNumLabel:eui.Label;
	public enemySecretOuterGroup:eui.Group;
	public enemySecret2Img:eui.Image;
	public enemySecretGroup:eui.Group;
	public enemySecretImg:eui.Image;
	public enemySecretNumLabel:eui.Label;
	public enemyCardpoolImg:eui.Image;
	public enemyAvatar:eui.Image;
	public enemyCardGroup:eui.Group;						// 对手手牌group
	public enemyCardList = [];								// 对手手牌list
	// 对方记录
	public enemyCardNum: number;							// 对手卡牌数量
	public enemyHPValue: number;			
	public enemyProtectValue: number;		
	public enemyManaValueNow_star: number; 			
	public enemyManaValueStar_value: number;
	public enemyBuffList = [];
	public enemyConditionList = [];
	public enemySecretList = [];

	// 对手技能
	public enemySkillGroup: eui.Group;							// 技能group
	public enemySkillBtn: Skill;									// 技能按钮

	// 己方元素
	public selfElements:eui.Group;
	public SelfInfoPanel:eui.Image;
	public selfAvatar:eui.Image;
	public selfHPGroup:eui.Group;
	public SelfHpBg:eui.Image;
	public selfHpBlockFirst:eui.Image;
	public selfHpBlockList:Array<eui.Image> = [];
	public selfHpLabel:eui.Label;
	public selfCBSGroup:eui.Group;
	public selfBuffOuterGroup:eui.Group;
	public selfBuff2Img:eui.Image;
	public selfBuffGroup:eui.Group;
	public selfBuffImg:eui.Image;
	public selfBuffNumLabel:eui.Label;
	public selfConditionOuterGroup:eui.Group;
	public selfCondition2Img:eui.Image;
	public selfConditionGroup:eui.Group;
	public selfConditionImg:eui.Image;
	public selfConditionNumLabel:eui.Label;
	public selfSecretOuterGroup:eui.Group;
	public selfSecret2Img:eui.Image;
	public selfSecretGroup:eui.Group;
	public selfSecretImg:eui.Image;
	public selfSecretNumLabel:eui.Label;
	public selfManaGroup:eui.Group;
	public selfManaImg:eui.Image;
	public selfManaNumLable:eui.Label;
	public selfProtectOuterGroup:eui.Group;
	public selfProtect2Img:eui.Image;
	public selfProtectGroup:eui.Group;
	public selfProtectImg:eui.Image;
	public selfProtectNumLabel:eui.Label;
	public cardPoolNumLabel:eui.Label;
	public selfCardpoolImg:eui.Image;
	public selfCardGruop:eui.Group;							// 己方手牌group

	// 己方记录
	public selfCardList = [];								//自己的手牌， 均为id
	public selfHPValue: number;								// HP值
	public selfProtectValue: number;						// 护甲值
	public selfManaValueNow_star: number; 					// now_star
	public selfManaValueStar_value: number;					// star_value
	public selfBuffList = [];				// bufflist, 内为card_effect
	public selfSecretList = [];				// secretList, 内为card_effect
	public selfConditionList = [];			// conditionList, 内为card_effect

	// 己方技能
	public selfSkillGroup: eui.Group;							// 技能group
	public selfSkillBtn: Skill;									// 技能按钮

	// 遮罩
	public shadeGroup:eui.Group;
	public shadeImg:eui.Group;

	// 返回按钮
	public backBtn:eui.Image;

	// 回合结束
	public endTurnGroup:eui.Group;							// 结束回合group
	public endTurnBtn: btnWithReverse;						// 结束回合按钮

	// 手牌group
	public Special:eui.Group;								// 手牌展开group

	// 胜利失败
	public WinGroup:eui.Group;
	public TieGroup:eui.Group;
	public FailGroup:eui.Group;

	// 结算
	public balanceGroup:eui.Group;
	public balancePannel:eui.Group;
	public Exp:eui.Label;
	public Coins:eui.Label;
	public Lv:eui.Label;
	public LvBar:eui.ProgressBar;

	// CardGroup类关于
	public _SelfCardGroup: DSelfCardGroup;
	public _EnemyCardGroup: DEnemyCardGroup;

	public turnNum = 1;											// 对战turn数，自己打一次 +1， 对方打一次 +1
	public static nowTurn: number;								// 当前玩家 1：自己，2：对手

	public gameInfo: any;										// gameInfo

	public gameHandle: DoubleBattleGameHandle;					// GameHandle

	public static animationList = [];									// 动画队列

	// 特殊事件定义
	public static emitEndTurn: string = "CLICKENDTURN";
	public static updateData: string = "UPDATEDATA";
	public static emitBeginTurn: string = "BEGINTURN";
	public static callBack: string = "CALLBACK";
	public static reverseEndTurnBtn: string = "REVERSEENDTURNBTN";
	public static enemyUseSkill: string = "ENEMYUSESKILL";
	public static enemyUseCard: string = "ENEMYUSECARD";
	public static win: string = 'WIN';
	public static fail: string = 'FAIL';
	public static tie: string = 'TIE';

	// 对战结束data记录
	public closegameReplyData;

	public static instance(): DoubleBattlePage {
		return SceneManager.getInstance().doubleBattlePage;
	}

	public constructor() {
		super();
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.init();
		this._SelfCardGroup = new DSelfCardGroup(this);
		this._EnemyCardGroup = new DEnemyCardGroup(this);
	}

	public init(){
		this.backGround.texture = RES.getRes("story_bg_"+Math.random()*8+"_jpg");
		this.battleElementsGroup.touchEnabled = true;		// 初始化为可点击
		this.backBtn.touchEnabled = true;					// 初始化返回可点击
		this.gameHandle = new DoubleBattleGameHandle();
		this.turnNum = 1;
		this.initReverseElement();							// 初始化翻转对象
		this.initHp();										//初始化HP
		this.initAnimationElement();						// 初始化动画相关队列、flag等元素
		this.initCBS();										// 初始化 condiction, buff, secret 数值
		this.shadeGroup.visible = false;					// CBS 遮罩初始化
		this.initBalanceGroup();							// 初始化结算
		this.addLinsters();									// 添加监听
		this.selfCardList = [];								// 初始化化卡牌list
		this.enemyCardNum = 0;
		this.initBattleElement();
		DoubleBattlePage.nowTurn = 1;						// 初始化为己方先手
		this.enemyElements.touchEnabled = false;
	}

	public addLinsters(){
		this.selfSkillBtn.unusedSkillImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useSkill, this);
		// 初始化时间监听
		this.addEventListener(DoubleBattleEvent.DOUBLEBATTLEEVENT, this.animation, this);
		// 初始化CBS监听
		this.selfBuffImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfBuff, this);
		this.enemyBuffImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemyBuff, this);
		this.selfSecretImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfSecret, this);
		this.enemySecretImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemySecret, this);
		this.selfConditionImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfCondition, this);
		this.enemyConditionImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemyCondition, this);
		// 初始化shade监听
		this.shadeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideShadeGroup, this);
		// 初始化胜利、失败、平局监听
		this.WinGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.winGroupClick, this);
		this.FailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dealFailGame, this);
		this.TieGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dealTieGame, this);
		this.balanceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.balanceGroupClick, this);
		// 初始化认输按钮监听
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.failBack, this);
	}

	// 认输按钮
	public failBack(){
		let that = this;
		new infoView(this,"你确定要退出吗？你将会直接认输！",()=>{
			that.FailGroup.visible = true;
			that.FailGroup.touchEnabled = true;
		},()=>{},true,true);
	}

	// 初始化CBS可见
	public initCBS(){
		this.selfConditionGroup.visible = false;
		this.selfBuffGroup.visible = false;
		this.selfSecretGroup.visible = false;
		this.enemyConditionGroup.visible = false;
		this.enemyBuffGroup.visible = false;
		this.enemySecretGroup.visible = false;
	}

	// 初始化翻转对象
	public initReverseElement(){
		// 添加结束回合按钮
		var endTurnBtn = new btnWithReverse(1);
		endTurnBtn.x = 0;
		endTurnBtn.y = 0;
		this.endTurnGroup.addChild(endTurnBtn);
		endTurnBtn.anchorOffsetX = endTurnBtn.width/2;
		endTurnBtn.anchorOffsetY = endTurnBtn.height/2;
		this.endTurnBtn = endTurnBtn;

		// 添加技能按钮
		this.selfSkillBtn = new Skill(1);
		this.selfSkillBtn.x = 140;
		this.selfSkillBtn.y = 210;
		this.selfSkillGroup.addChild(this.selfSkillBtn);
		this.selfSkillBtn.anchorOffsetX = this.selfSkillBtn.width/2;
		this.selfSkillBtn.anchorOffsetY = this.selfSkillBtn.height/2;

		this.enemySkillBtn = new Skill(1);
		this.enemySkillBtn.x = 140;
		this.enemySkillBtn.y = 210;
		this.enemySkillGroup.addChild(this.enemySkillBtn);
		this.enemySkillBtn.anchorOffsetX = this.enemySkillBtn.width/2;
		this.enemySkillBtn.anchorOffsetY = this.enemySkillBtn.height/2;

		// 每次都需要监听一次
		this.endTurnBtn.turnOver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endTurn, this);
	}

	// init BalanceGroup
	public initBalanceGroup(){
		this.balanceGroup.visible = false;
		this.TieGroup.visible = false;
		this.WinGroup.visible = false;
		this.FailGroup.visible = false;
	}

	// 初始化HP
	public initHp(){
		let HPBlockWidth = this.selfHpBlockFirst.width
		let HPBlockHeigh = this.selfHpBlockFirst.height
		// 己方HP
		for(let i = 0; i < 30; i++){
			if(i == 0){
				this.selfHpBlockList.push(this.selfHpBlockFirst);
			}else if(i < 29){
				var HPBlockMiddle = new eui.Image();
				HPBlockMiddle.texture = RES.getRes('HP_middle_png');
				HPBlockMiddle.width = HPBlockWidth;
				HPBlockMiddle.height = HPBlockHeigh;
				HPBlockMiddle.x = this.selfHpBlockFirst.x + (HPBlockWidth)*i;
				HPBlockMiddle.y = this.selfHpBlockFirst.y;
				this.selfHpBlockList.push(HPBlockMiddle);
			}else{
				var HPBlockLast = new eui.Image();
				HPBlockLast.texture = RES.getRes('HP_last_png');
				HPBlockLast.width = HPBlockWidth;
				HPBlockLast.height = HPBlockHeigh;
				HPBlockLast.x = this.selfHpBlockFirst.x + (HPBlockWidth)*i;
				HPBlockLast.y = this.selfHpBlockFirst.y;
				this.selfHpBlockList.push(HPBlockLast);
			}
		}
		for(let i = 0; i < 30; i++){
			this.selfHpBlockList[i].visible = true;
			this.selfHPGroup.addChild(this.selfHpBlockList[i]);
		}
		this.selfHpLabel.text = "30 / 30";

		// 对方HP
		for(let i = 0; i < 30; i++){
			if(i == 0){
				this.enemyHpBlockList.push(this.enemyHpBlockFirst);
			}else if(i < 29){
				var HPBlockMiddle = new eui.Image();
				HPBlockMiddle.texture = RES.getRes('HP_middle_png');
				HPBlockMiddle.width = HPBlockWidth;
				HPBlockMiddle.height = HPBlockHeigh;
				HPBlockMiddle.x = this.enemyHpBlockFirst.x + HPBlockWidth*i;
				HPBlockMiddle.y = this.enemyHpBlockFirst.y;
				this.enemyHpBlockList.push(HPBlockMiddle);
			}else{
				var HPBlockLast = new eui.Image();
				HPBlockLast.texture = RES.getRes('HP_last_png');
				HPBlockLast.width = HPBlockWidth;
				HPBlockLast.height = HPBlockHeigh;
				HPBlockLast.x = this.enemyHpBlockFirst.x + HPBlockWidth*i;
				HPBlockLast.y = this.enemyHpBlockFirst.y;
				this.enemyHpBlockList.push(HPBlockLast);
			}
		}
		for(let i = 0; i < 30; i++){
			this.enemyHpBlockList[i].visible = true;
			this.enemyHPGroup.addChild(this.enemyHpBlockList[i]);
		}
		this.enemyHpLabel.text = "30 / 30";
	}

	// 初始化动画相关队列、flag等元素
	public initAnimationElement(){
		DoubleBattlePage.animationList = [];
	}

	// 初始化战斗数值
	public initBattleElement(){
		this.selfManaValueNow_star = 0;
		this.selfManaValueStar_value = 0;
		this.selfProtectValue = 0;
		this.enemyManaValueNow_star = 0;
		this.enemyManaValueStar_value = 0;
		this.enemyProtectValue = 0;
	}

	// deal ready game reply
	public dealReadyGameReply(data){
		SceneManager.getInstance().changeScene("doubleBattlePage");
		this.gameInfo = data['data'];
		this.animation([DoubleBattlePage.updateData, data]);

		if(data['data']['now_turn'] == UserInfo.userid){
			DoubleBattlePage.nowTurn = 1;
			var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
			SocketAPI.socket.emit('beginTurn', beginTurn);
			console.log('emit beginturn')
			this.endTurnBtn.turnOver.touchEnabled = true;
		}else{
			DoubleBattlePage.nowTurn = 2;
			this.endTurnBtn.turnOver.touchEnabled = false;			
		}
	}

	// deal begin turn reply
	public dealBeginTurnReply(data){
		if(data['errno'] != 0){
			console.log('error in beginTurnReply: ', data);
			throw new Error('beginTurnReply Error');
		}

		if(data['data']["now_turn"] == UserInfo.userid){
			DoubleBattlePage.nowTurn = 1;
			if(this.turnNum != 1){
				this.endTurnBtn.turnOver.touchEnabled = true;
				this.animation(DoubleBattlePage.reverseEndTurnBtn);
			}
			this.turnNum ++;
		}else{
			DoubleBattlePage.nowTurn = 2;
		}
		// 更新弃牌牌组
		this.gameInfo["discard_list"]=data['data']["discard_list"];
		let lastCard = data['data']['last_card'];
		//播放动画
		this.gameHandle.beginTurn(this.gameInfo);
		//动画播放完成
		this.gameInfo = data['data'];
		this.animation([DoubleBattlePage.updateData, data])
	}

	// deal endturn reply
	public dealEndTurnReply(data){
		this.gameInfo["discard_list"]=data['data']["discard_list"];
		let lastCard = data['data']['last_card'];
		//播放动画完成
		this.gameHandle.endTurn(this.gameInfo);
		//动画播放完成
		this.gameInfo = data['data'];

		console.log('dealEndTurn');

		this.animation([DoubleBattlePage.updateData, data]);

		if(data['data']['now_turn'] == UserInfo.userid){
			this.animation(DoubleBattlePage.emitBeginTurn);
		}
	}

	// deal use card or skill reply
	public useCardORSkillReply(data){
		let currentPlayer;
		let player: string;
		console.log("### this.gameInfo['now_turn']: ", this.gameInfo['now_turn'])
		if(this.gameInfo['now_turn'] == this.gameInfo[UserInfo.self_player]["userid"]){
			if(data['data']["last_card"]['source'] != UserInfo.self_player){
				throw new Error('source error');
			}
			player = 'self';
			currentPlayer = this.gameInfo[UserInfo.self_player];
		}else if(this.gameInfo['now_turn'] == this.gameInfo[UserInfo.enemy_player]["userid"]){
			if(data['data']["last_card"]['source'] != UserInfo.enemy_player){
				throw new Error('source error');
			}
			player = 'enemy';			
			currentPlayer = this.gameInfo[UserInfo.enemy_player];
		}else{
			throw new Error('player flag error')
		}
		currentPlayer["last_card"]=data['data']["last_card"];
		if(currentPlayer["last_card"]["card_id"]==undefined){
			//玩家刚刚使用了技能
			this.useSkillReply(data, player);

		}else{
			//玩家刚刚使用了一张卡牌
			this.useCardReply(data, player);
		}
		// 更新信息
		this.animation([DoubleBattlePage.updateData, data]);

	}

	public useSkillReply(data, player){
		let currentPlayer;
		if(this.gameInfo['now_turn'] == this.gameInfo[UserInfo.self_player]["id"]){
			currentPlayer = this.gameInfo[UserInfo.self_player];
		}else{
			currentPlayer = this.gameInfo[UserInfo.enemy_player];
		}
		this.gameInfo["discard_list"]=data["discard_list"];
		let lastCard = data['last_card'];
		// 对方使用技能
		if(player == 'enemy'){
			this.animation(DoubleBattlePage.enemyUseSkill);
		}
		//己方使用技能
		if(player == 'self'){
			this.gameHandle.useSkill(this.gameInfo, currentPlayer);
		}
		//动画播放完成
		this.gameInfo = data['data'];
		this.animation([DoubleBattlePage.updateData, data]);
	}

	public useCardReply(data, player){
		let currentPlayer;
		if(this.gameInfo['now_turn'] == this.gameInfo[UserInfo.self_player]["id"]){
			currentPlayer = this.gameInfo[UserInfo.self_player];
		}else{
			currentPlayer = this.gameInfo[UserInfo.enemy_player];
		}
		// 己方使用卡牌结果
		if(player == 'self'){
			this.gameInfo[UserInfo.self_player]["discard_list"]=data['data'][UserInfo.self_player]["discard_list"];
			let lastCard = data['data']['last_card'];
			//播放动画完成
			this.gameHandle.useOneCard(this.gameInfo, currentPlayer, lastCard);
		}if(player == 'enemy'){
			let lastCard = data['data']['last_card'];
			this.animation([DoubleBattlePage.enemyUseCard, lastCard]);
		}

		//动画播放完成
		this.gameInfo = data['data'];
		this.animation([DoubleBattlePage.updateData, data]);
	}

	// deal close game reply
	public async dealCloseGameReply(data){
		console.log('deal close game in single game page')
		// 显示结算
		let oldCoins = UserInfo.coins;
		let oldExp = UserInfo.exp;
		let oldLevel = UserInfo.level;
		var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
		UserInfo.updateUserInfo(loginReply);
	
		let coinText = '+ ' + String(UserInfo.coins - oldCoins)
		this.Coins.text = coinText;

		let expTEXT = '+ ' + String(UserInfo.exp - oldExp)
		this.Exp.text = expTEXT;

		let newLevel = UserInfo.level;
		let changeExp = UserInfo.exp - oldExp;

		this.LvBar.slideDuration = 0;
		this.LvBar.maximum = parseInt(UserInfo.levelTable[oldLevel]+"");
		this.LvBar.minimum = 0;
		this.LvBar.value = oldExp;
		
		this.Lv.text = oldLevel + '';
		this.balanceGroup.visible = true;
		
		if(changeExp != 0){
			this.balanceGroup.touchEnabled = false;
			var barTimer:egret.Timer = new egret.Timer(50,changeExp);
			barTimer.addEventListener(egret.TimerEvent.TIMER,this.lvBarTween,this);
			barTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.lvBarTweenComplement,this);
			barTimer.start();	
		}
		this.closegameReplyData = data;
		UserInfo.session = data["data"]["game_info"]["session"];
		console.log('UserInfo.session: ', UserInfo.session)
	}

	public lvBarTween(){
		this.LvBar.value += 1;
		if(this.LvBar.value >= this.LvBar.maximum){
			this.LvBar.value = 0;
			this.Lv.text = UserInfo.level + '';
			this.LvBar.maximum = parseInt(UserInfo.levelTable[UserInfo.level]+"");
			console.log('this.LvBar.maximum after: ', this.LvBar.maximum);			
		}		
	}

	public lvBarTweenComplement(){
		this.balanceGroup.touchEnabled = true;
	}

	public useSkill(){
		// 己方回合方可使用
		if(DoubleBattlePage.nowTurn == 1){
			if(this.selfManaValueNow_star >= this.gameInfo[UserInfo.self_player]['skill']['card_cost']){
				console.log('use skill ---');
				if(this.selfSkillBtn.useableNum-1 == 0){
					this.selfSkillBtn.reverseBtn();
					this.selfSkillBtn.usedSkillImg.touchEnabled = false;
				}
				this.selfSkillBtn.useableNum -= 1;
				var useCard  = {session: UserInfo.session, userid: UserInfo.userid, card_index: -1};
				SocketAPI.socket.emit('useCard', useCard);
			}
		}
	}

	public endTurn(){
		this.endTurnBtn.turnOver.touchEnabled = false;
		this.animation(DoubleBattlePage.reverseEndTurnBtn);
		this.animation(DoubleBattlePage.emitEndTurn);
	}

	// 点击胜利面板
	public winGroupClick(){
		// UserInfo.WinSingleGame = true;
		this.WinGroup.visible = false
		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
		SocketAPI.socket.emit('closeGame', closeGame);
		console.log('emit closeGame in dealFailGame');
	}

	// 点击失败面板
	public dealFailGame(){
		this.FailGroup.visible = false;
		// UserInfo.WinSingleGame = false;
		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
		SocketAPI.socket.emit('closeGame', closeGame);
		console.log('emit closeGame in dealFailGame');
	}
	
	// 点击平局面板
	public dealTieGame(){
		this.TieGroup.visible = false;
		// UserInfo.WinSingleGame = false;
		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
		SocketAPI.socket.emit('closeGame', closeGame);
		console.log('emit closeGame in dealTieGame');
	}

	// 放弃认输
	public giveUp(){
		UserInfo.goBackClicker = 1;
		this.FailGroup.visible = true;
		this.FailGroup.touchEnabled = true;
	}

	// 更新信息
	public updateInfo(data){
		// 更新对方卡牌
		this.updateEnemySkill(data);
		// 更新Mana
		this.updateMana(data);
		// 更新护甲
		this.updateProtect(data);
		// 更新血量
		this.updateHP(data);
		// 更新buff
		this.updateBuff(data);
		// 更新condition
		this.updateCondition(data);
		// 更新secret
		this.updateSecret(data);
		// 更新技能--单人
		this.updateSkill(data);
	}

	public updateEnemySkill(data){

	}

	// 更新Mana
	public updateMana(data){
		let oldselfMana = this.selfManaValueNow_star;
		let oldenemyMana = this.enemyManaValueNow_star;
		this.selfManaValueNow_star = data['data'][UserInfo.self_player]["now_star"];
		this.enemyManaValueNow_star = data['data'][UserInfo.enemy_player]["now_star"];
		this.selfManaValueStar_value = data['data'][UserInfo.self_player]['star_value'];
		this.enemyManaValueStar_value = data['data'][UserInfo.enemy_player]['star_value'];
		let event = undefined;
		if(this.selfManaValueNow_star > oldselfMana){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.increaseMana, data['data'][UserInfo.self_player], undefined);
		}else if(this.selfManaValueNow_star < oldselfMana){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.decreaseMana, data['data'][UserInfo.self_player], undefined);
		}
		if(this.enemyManaValueNow_star > oldenemyMana){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.increaseMana, data['data'][UserInfo.enemy_player], undefined);
		}else if(this.enemyManaValueNow_star < oldenemyMana){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.decreaseMana, data['data'][UserInfo.enemy_player], undefined);
		}
		if(event){
			this.animation(event);
		}
	}

	// 更新protect
	public updateProtect(data){
		let event = undefined;
		let oldselfProtect = this.selfProtectValue;
		let oldenemyProtect = this.enemyProtectValue;
		this.selfProtectValue = data['data'][UserInfo.self_player]["protect_value"];
		this.enemyProtectValue = data['data'][UserInfo.enemy_player]["protect_value"];
		event = undefined;
		if(this.selfProtectValue > oldselfProtect){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.increaseProtect, data['data'][UserInfo.self_player], undefined);
		}else if(this.selfProtectValue < oldselfProtect){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.decreaseProtect, data['data'][UserInfo.self_player], undefined);
		}
		if(this.enemyProtectValue > oldenemyProtect){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.increaseProtect, data['data'][UserInfo.enemy_player], undefined);
		}else if(this.enemyProtectValue < oldenemyProtect){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.decreaseProtect, data['data'][UserInfo.enemy_player], undefined);
		}
		if(event){
			this.animation(event);
		}
	}

	// 更新 HP
	public updateHP(data){
		let oldselfHP = this.selfHPValue;
		let oldenemyHP = this.enemyHPValue;
		this.selfHPValue = data['data'][UserInfo.self_player]["cute_value"];
		this.enemyHPValue = data['data'][UserInfo.enemy_player]["cute_value"];
		let event = undefined;
		if(this.selfHPValue > oldselfHP){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.HPEvent, DoubleBattleEvent.increaseHP, data['data'][UserInfo.self_player], undefined);
		}else if(this.selfHPValue < oldselfHP){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.HPEvent, DoubleBattleEvent.decreaseHP, data['data'][UserInfo.self_player], undefined);
		}
		if(this.enemyHPValue > oldenemyHP){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.HPEvent, DoubleBattleEvent.increaseHP, data['data'][UserInfo.enemy_player], undefined);
		}else if(this.enemyHPValue < oldenemyHP){
			event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.HPEvent, DoubleBattleEvent.decreaseHP, data['data'][UserInfo.enemy_player], undefined);
		}
		if(event){
			this.animation(event);
		}
	}

	// 更新buff
	public updateBuff(data){
		// 更新buff
		let oldSelfBuffList = this.selfBuffList;
		let oldEnemyBuffList = this.enemyBuffList;
		let newSelfBuffList = data['data'][UserInfo.self_player]["buff_list"];
		let newEnemyBuffList = data['data'][UserInfo.enemy_player]["buff_list"];
		
		// console.log('@@@ oldSelfBuffList: ', oldSelfBuffList)
		// console.log('@@@ newSelfBuffList: ', newSelfBuffList);
		// console.log('@@@ oldEnemyBuffList: ', oldEnemyBuffList)
		// console.log('@@@ newEnemyBuffList: ', newEnemyBuffList);
		let selfBuffTmp1 = [];
		let selfBuffTmp2 = [];
		// 新来的buff
		selfBuffTmp1 = this.getDiffList(oldSelfBuffList, newSelfBuffList);
		if(selfBuffTmp1.length != 0){
			// console.log('@@@ selfBuffTmp1:', selfBuffTmp1)
			let player = data['data'][UserInfo.self_player];
			for(let i = 0; i < selfBuffTmp1.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.addBuffSuccess, player, selfBuffTmp1[i]);
				this.animation(event);
			}
		}
		selfBuffTmp2 = this.getDiffList(newSelfBuffList, oldSelfBuffList);
		if(selfBuffTmp2.length != 0){
			// console.log('@@@ selfBuffTmp2:', selfBuffTmp2)
			let player = data['data'][UserInfo.self_player];
			for(let i = 0; i < selfBuffTmp2.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.removeBuff, player, selfBuffTmp2[i]);
				this.animation(event);
			}
		}

		let enemyBuffTmp1 = [];
		let enemyBuffTmp2 = [];
		// 新来的buff
		enemyBuffTmp1 = this.getDiffList(oldEnemyBuffList, newEnemyBuffList);
		if(enemyBuffTmp1.length != 0){
			// console.log('@@@ enemyBuffTmp1:', enemyBuffTmp1)
			let player = data['data'][UserInfo.enemy_player];
			for(let i = 0; i < enemyBuffTmp1.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.addBuffSuccess, player, enemyBuffTmp1[i]);
				this.animation(event);
			}
		}
		enemyBuffTmp2 = this.getDiffList(newEnemyBuffList, oldEnemyBuffList);
		if(enemyBuffTmp2.length != 0){
			// console.log('@@@ enemyBuffTmp2:', enemyBuffTmp2)
			let player = data['data'][UserInfo.enemy_player];
			for(let i = 0; i < enemyBuffTmp2.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.removeBuff, player, enemyBuffTmp2[i]);
				this.animation(event);
			}
		}
	}

	// 更新 condition
	public updateCondition(data){
		let oldSelfConditionList = this.selfConditionList;
		let oldEnemyConditionList = this.enemyConditionList;
		let newSelfConditionList = data['data'][UserInfo.self_player]["condition_list"];
		let newEnemyConditionList = data['data'][UserInfo.enemy_player]["condition_list"];
		// console.log('@@@ oldSelfConditionList: ', oldSelfConditionList)
		// console.log('@@@ newSelfConditionList: ', newSelfConditionList);
		// console.log('@@@ oldEnemyConditionList: ', oldEnemyConditionList)
		// console.log('@@@ newEnemyConditionList: ', newEnemyConditionList);
		
		let selfConditionTmp1 = [];
		let selfConditionTmp2 = [];
		// 新来的buff
		selfConditionTmp1 = this.getDiffList(oldSelfConditionList, newSelfConditionList);
		if(selfConditionTmp1.length != 0){
			// console.log('@@@ selfConditionTmp1:', selfConditionTmp1);			
			let player = data['data'][UserInfo.self_player];
			for(let i = 0; i < selfConditionTmp1.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.addConditionSuccess, player, selfConditionTmp1[i]);
				this.animation(event);
			}
		}
		selfConditionTmp2 = this.getDiffList(newSelfConditionList, oldSelfConditionList);
		if(selfConditionTmp2.length != 0){
			// console.log('@@@ selfConditionTmp2:', selfConditionTmp2);
			let player = data['data'][UserInfo.self_player];
			for(let i = 0; i < selfConditionTmp2.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.removeCondition, player, selfConditionTmp2[i]);
				this.animation(event);
			}
		}

		let enemyConditionTmp1 = [];
		let enemyConditionTmp2 = [];
		// 新来的buff
		enemyConditionTmp1 = this.getDiffList(oldEnemyConditionList, newEnemyConditionList);
		if(enemyConditionTmp1.length != 0){
			// console.log('@@@ enemyConditionTmp1:', enemyConditionTmp1);
			let player = data['data'][UserInfo.enemy_player];
			for(let i = 0; i < enemyConditionTmp1.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.addConditionSuccess, player, enemyConditionTmp1[i]);
				this.animation(event);
			}
		}
		enemyConditionTmp2 = this.getDiffList(newEnemyConditionList, oldEnemyConditionList);
		if(enemyConditionTmp2.length != 0){
			// console.log('@@@ enemyConditionTmp2:', enemyConditionTmp2);
			let player = data['data'][UserInfo.enemy_player];
			for(let i = 0; i < enemyConditionTmp2.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.removeCondition, player, enemyConditionTmp2[i]);
				this.animation(event);
			}
		}
	}

	// 更新 secret
	public updateSecret(data){
		let oldSelfSecretList = this.selfSecretList;
		let oldEnemySecretList = this.enemySecretList;
		let newSelfSecretList = data['data'][UserInfo.self_player]["secret_condition_list"];
		let newEnemySecretList = data['data'][UserInfo.enemy_player]["secret_condition_list"];
		

		let selfSecretTmp1 = [];
		let selfSecretTmp2 = [];
		// 新来的buff
		selfSecretTmp1 = this.getDiffList(oldSelfSecretList, newSelfSecretList);
		if(selfSecretTmp1.length != 0){
			let player = data['data'][UserInfo.self_player];
			for(let i = 0; i < selfSecretTmp1.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.addSecretSuccess, player, selfSecretTmp1[i]);
				this.animation(event);
			}
		}
		selfSecretTmp2 = this.getDiffList(newSelfSecretList, oldSelfSecretList);
		if(selfSecretTmp2.length != 0){
			let player = data['data'][UserInfo.self_player];
			for(let i = 0; i < selfSecretTmp2.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.removeSecret, player, selfSecretTmp2[i]);
				this.animation(event);
			}
		}

		let enemySecretTmp1 = [];
		let enemySecretTmp2 = [];
		// 新来的buff
		enemySecretTmp1 = this.getDiffList(oldEnemySecretList, newEnemySecretList);
		if(enemySecretTmp1.length != 0){
			let player = data['data'][UserInfo.enemy_player];
			for(let i = 0; i < enemySecretTmp1.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.addSecretSuccess, player, enemySecretTmp1[i]);
				this.animation(event);
			}
		}
		enemySecretTmp2 = this.getDiffList(newEnemySecretList, oldEnemySecretList);
		if(enemySecretTmp2.length != 0){
			let player = data['data'][UserInfo.enemy_player];
			for(let i = 0; i < enemySecretTmp2.length; i++){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.removeSecret, player, enemySecretTmp2[i]);
				this.animation(event);
			}
		}
		// console.log('@@@ selfSecretTmp1: ', selfSecretTmp1)
		// console.log('@@@ selfSecretTmp2: ', selfSecretTmp2)
		// console.log('@@@ enemySecretTmp1: ', enemySecretTmp1)
		// console.log('@@@ enemySecretTmp2: ', enemySecretTmp2)
	}
		
	

	// 更新技能
	public updateSkill(data){
		let curSkillNum = data['data'][UserInfo.self_player]['skill_available'];
		// 背面向上
		if(this.selfSkillBtn.unusedSkillImg.visible == false){
			if(curSkillNum > 0){
				this.selfSkillBtn.reverseBtn();
			}
		// 正面向上
		}else{
			if(curSkillNum < 0){
				this.selfSkillBtn.reverseBtn();
			}
		}
		this.selfSkillBtn.usedSkillImg.touchEnabled = true;
		// 更新技能剩余数量
		this.selfSkillBtn.useableNum = curSkillNum;
		this.cardPoolNumLabel.text = data['data'][UserInfo.self_player]['cards_pool'].length;
	}

	// 更新卡牌, data为卡牌数组
	public updateCard(data){
		// 己方
		// 卡牌增加
		let tmpCardArr = this.getCardDifference1(data, this.selfCardList);
		if(tmpCardArr.length != 0){
			this._SelfCardGroup.dealCard(tmpCardArr);
			egret.Tween.get(this).wait(tmpCardArr.length*5000);
			console.log('[#]发卡')
			for(let i = 0; i < tmpCardArr.length; i++){
				this.selfCardList.push(tmpCardArr[i]);
			}
		}

		// 卡牌消失
		tmpCardArr = this.getCardDifference2(this.selfCardList, data);
		if(tmpCardArr.length != 0){
			this._SelfCardGroup.disCard(tmpCardArr);
			egret.Tween.get(this).wait(tmpCardArr.length*1000);
			// console.log('[#]删卡')

		}
		
	}

	public updateEnemyCard(enemyPlayerInfo){
		// data = eventTmp[1]["data"][UserInfo.enemy_player]["cards_list"]
		// 发牌
			if(enemyPlayerInfo['cards_list'].length > this.enemyCardNum){
				this._EnemyCardGroup.ceshi(enemyPlayerInfo['cards_list'].length);
				egret.Tween.get(this).wait(enemyPlayerInfo['cards_list'].length*5000);
				this.enemyCardNum = enemyPlayerInfo['cards_list'].length;
				this.enemyCardList = enemyPlayerInfo['cards_list'];
			}
		// 少牌
			else if(enemyPlayerInfo['cards_list'].length < this.enemyCardNum){
				// for(let i = 0; i <  enemyPlayerInfo['cards_list'])
				// TODO
			}
	}
	


	public updateWinner(data){
		if(data['data']['game_status']['FINISHED']!=undefined){
			let winner = data['data']['game_status']['FINISHED'];
			// 胜利
			if(winner['id'] == UserInfo.userid){
				this.animation(DoubleBattlePage.win);
			// 失败
			}else if(winner == 'tie'){
				this.animation(DoubleBattlePage.tie);
			}else if(winner['id'] == undefined){
				console.log('winner: ', winner);
				throw new Error('winner 信息错误');
			}else{
				this.animation(DoubleBattlePage.fail);
			}
		}
	}

	public EndGame(player){
		if(player == 1){
			this.WinGroup.visible = true;
		}else{
			this.FailGroup.visible = true;
		}
		this.battleElementsGroup.touchEnabled = false;
		this.backBtn.touchEnabled = false;
	}

	public TieGame(){
		this.TieGroup.visible = true;
		this.battleElementsGroup.touchEnabled = false;
		this.backBtn.touchEnabled = false;
	}

	public balanceGroupClick(){
		SceneManager.getInstance().changeScene('matchPage');
		SceneManager.getInstance().matchPage.getMatchAgain(this.closegameReplyData);
	}

	// 所有动画事件以及额外事件
	public animation(e){
		// console.log('DoubleBattlePage.animationList: ', DoubleBattlePage.animationList);
		if(e['miniType']){
			console.log('[#]e: ', e['miniType']);
		}else{
			console.log('[#]e: ', e);
		}

		let eventTmp;
		// 回调
		if(e == DoubleBattlePage.callBack){
			// 移除自己
			DoubleBattlePage.animationList.splice(0, 1);
			// list动画播放完毕
			if(DoubleBattlePage.animationList.length == 0){
				return;
			}
			// list动画播放未完毕，找到头事件
			eventTmp = DoubleBattlePage.animationList[0];
		// 新的监听触发
		}else{
			// console.log('new event: ', e)
			DoubleBattlePage.animationList.push(e)
			// 加入新事件，如果旧动画未完成, 返回不执行(>1表示不止它应该)
			if(DoubleBattlePage.animationList.length > 1){
				return;
			// 加入新事件，如果旧动画完成, 立即执行
			}else{
				eventTmp = DoubleBattlePage.animationList[0];
			}

		}

		if(eventTmp['miniType']){
			console.log('[#]eventTmp: ', eventTmp['miniType']);
		}else{
			console.log('[#]eventTmp: ', eventTmp);
		}

		// emit endTurn
		if(eventTmp == DoubleBattlePage.emitEndTurn){
			var endTurn  = {session: UserInfo.session, userid: UserInfo.userid};
			SocketAPI.socket.emit('endTurn', endTurn);
			console.log('emit endTurn')
			this.animation(DoubleBattlePage.callBack)

		// emit begin turn
		}else if(eventTmp == DoubleBattlePage.emitBeginTurn){
			var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
			SocketAPI.socket.emit('beginTurn', beginTurn);
			this.animation(DoubleBattlePage.callBack)

		// 翻结束按钮
		}else if(eventTmp == DoubleBattlePage.reverseEndTurnBtn){
			this.endTurnBtn.reverseBtn().then(()=>{this.animation(DoubleBattlePage.callBack);});
		
		// 对方使用技能
		}else if(eventTmp == DoubleBattlePage.enemyUseSkill){
			this.enemySkillBtn.reverseBtn().then(()=>{this.animation(DoubleBattlePage.callBack);});
		// 胜利
		}else if(eventTmp == DoubleBattlePage.win){
			this.EndGame(1);
			return;
		// 失败
		}else if(eventTmp == DoubleBattlePage.fail){
			this.EndGame(2);
			return;
		// 平局
		}else if(eventTmp == DoubleBattlePage.tie){
			this.TieGame();
			return;
		// 更新信息
		}else if(typeof eventTmp == typeof [] && eventTmp[0] == DoubleBattlePage.updateData){
			// 更新信息
			// console.log('[#]updatedata in list: ', eventTmp[1]);
			this.updateInfo(eventTmp[1]);
			// 更新卡牌
			this.updateCard(eventTmp[1]["data"][UserInfo.self_player]["cards_list"]);
			// 更新对手手牌
			this.updateEnemyCard(eventTmp[1]["data"][UserInfo.enemy_player]);
			// 更新胜负
			this.updateWinner(eventTmp[1]);

			this.animation(DoubleBattlePage.callBack)
		
		// 对方使用卡牌
		}else if(typeof eventTmp == typeof [] && eventTmp[0] == DoubleBattlePage.enemyUseCard){
			
			var last_card = eventTmp[1];
			console.log('### last card: ', last_card)
			// 奥秘卡
			if(last_card['condition'] != undefined && last_card['condition']['secret'] == true){
				// 随机找到一张牌
				let index = Math.random()*this.enemyCardList.length;
				let card = this._EnemyCardGroup.CardGruop.getChildAt(index);
				// card
				this._EnemyCardGroup.chupai(card);
			// 非奥秘卡
			}else{
				var last_card_id = last_card['card_id'];
			}

			this.animation(DoubleBattlePage.callBack)

		// 护甲动画
		}else if(eventTmp['baseType'] == DoubleBattleEvent.ProtectEvent){
			// console.log('[*]protectAnimations eventTmp: ', eventTmp);
			let roleStr = '';
			if(eventTmp['player']['id'] == UserInfo.userid)
				roleStr = 'self';
			else
				roleStr = 'enemy';
			let currentProtectGroup = roleStr + 'ProtectGroup';
			let currentProtectImg = roleStr + 'ProtectImg';
			let currentProtectLabel = roleStr + 'ProtectNumLabel';
			let currentProtectValue = roleStr + 'ProtectValue';

			// 护甲减少
			if(eventTmp['miniType'] == DoubleBattleEvent.decreaseProtect){
				console.log('护甲减少');
				this[currentProtectGroup].visible = true;
				this[currentProtectLabel].text = eventTmp['player']['protect_value'];
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(DoubleBattlePage.callBack);

			// 护甲增加
			}else if(eventTmp['miniType'] == DoubleBattleEvent.increaseProtect){
				console.log('护甲增加');
				this[currentProtectGroup].visible = true;
				this[currentProtectLabel].text = eventTmp['player']['protect_value'];
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(DoubleBattlePage.callBack)
			// 碎甲
			}else if(eventTmp['miniType'] == DoubleBattleEvent.destoryProtect){
				console.log('碎甲');
				this[currentProtectLabel].text = 0;
				this[currentProtectImg].visible = false;
				this[currentProtectValue] = 0;
				this.animation(DoubleBattlePage.callBack)
			// 初始化甲
			}else if(eventTmp['miniType'] == DoubleBattleEvent.formProtect){
				console.log('初始化甲');
				this[currentProtectLabel].text = eventTmp['player']['protect_value'];
				this[currentProtectImg].visible = true;
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(DoubleBattlePage.callBack)
			// 免疫伤害
			}else if(eventTmp['miniType'] == DoubleBattleEvent.immunityDamage){
				console.log('免疫伤害');
				// console.log('免疫伤害');				
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(DoubleBattlePage.callBack)

			// 免疫一次
			}else if(eventTmp['miniType'] == DoubleBattleEvent.immunityOnce){
				// console.log('免疫伤害并消失');
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(DoubleBattlePage.callBack)
			}else{
				// console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ProtectEvent')
			}

		}

		// HP动画
		else if(eventTmp['baseType'] == DoubleBattleEvent.HPEvent){
			let ticksNum = 0;
			// 减血
			if(eventTmp['miniType'] == DoubleBattleEvent.decreaseHP){
				// 自己减血
				if(eventTmp['player']['id'] == UserInfo.userid){
					let newHP = eventTmp['player']['cute_value'];
					for(let i = GameRules.CuteValueDefault-1; i >= newHP; i--){
						if(i >= 0 && this.selfHpBlockList[i].visible == true){
							ticksNum++;
							egret.Tween.get(this.selfHpBlockList[i]).to({visible: false}, 200).call(()=>{egret.Tween.removeTweens(this.enemyHpBlockList[i])})
						}
						if(i < 0)
							break;
						this.selfHpLabel.text = `${i} / 30`;
						this.selfHPValue = i;
					}
				// 对方减血
				}else{
					let newHP = eventTmp['player']['cute_value'];
					for(let i = GameRules.CuteValueDefault-1; i >= newHP; i--){
						if(i >= 0 &&  this.enemyHpBlockList[i].visible == true){
							ticksNum++;
							egret.Tween.get(this.enemyHpBlockList[i]).to({visible: false}, 200).call(()=>{egret.Tween.removeTweens(this.enemyHpBlockList[i])})
						}
						if(i < 0)
							break;
						this.enemyHpLabel.text = `${i} / 30`;
						this.enemyHPValue = i;
					}

				}
			// 加血
			}else if(eventTmp['miniType'] == DoubleBattleEvent.increaseHP){
				// 自己加血
				if(eventTmp['player']['id'] == UserInfo.userid){
					let newHP = eventTmp['player']['cute_value'];
					for(let i = 0; i <= newHP; i++){
						if(i < GameRules.CuteValueDefault && this.selfHpBlockList[i].visible == false ){
							ticksNum++;
							egret.Tween.get(this.selfHpBlockList[i]).to({visible: true}, 200).call(()=>{egret.Tween.removeTweens(this.enemyHpBlockList[i])})
						}
						if(i > GameRules.CuteValueDefault)
							break;
						this.selfHpLabel.text = `${i} / 30`;
						this.selfHPValue = i;
					}
				// 对方加血
				}else{
					let newHP = eventTmp['player']['cute_value'];
					for(let i = 0; i <= newHP; i++){
						if(i < GameRules.CuteValueDefault && this.enemyHpBlockList[i].visible == false ){
							ticksNum++;
							egret.Tween.get(this.enemyHpBlockList[i]).to({visible: true}, 200).call(()=>{egret.Tween.removeTweens(this.enemyHpBlockList[i])})
						}
						if(i > GameRules.CuteValueDefault)
							break;
						this.enemyHpLabel.text = `${i} / 30`;
						this.enemyHPValue = i;
					}
				}
			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in HPEvent')
			}
			egret.Tween.get(this).wait(200).call(()=>{this.animation(DoubleBattlePage.callBack)});

		}

		// 令动画
		else if(eventTmp['baseType'] == DoubleBattleEvent.ManaEvent){
			// console.log('[*]manaAnimation eventTmp: ', eventTmp);
			let roleStr = '';
			if(eventTmp['player']['id'] == UserInfo.userid)
				roleStr = 'self';
			else
				roleStr = 'enemy';
			let currentManaGroup = roleStr + 'ManaGroup';
			let currentManaImg = roleStr + 'ManaImg';
			let currentManaLabel = roleStr + 'ManaNumLable';
			let currentManaValueNow_star = roleStr + 'ManaValueNow_star';
			let currentManaValueStar_value = roleStr + 'ManaValueStar_value';
			// 令全失
			if(eventTmp['miniType'] == DoubleBattleEvent.decreaseToZeroMana){
				this[currentManaLabel].text = eventTmp['player']['now_star'] + '/' + eventTmp['player']['star_value'];
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				this.animation(DoubleBattlePage.callBack)
			// 令加满
			}else if(eventTmp['miniType'] == DoubleBattleEvent.increaseToFullMana){
				// console.log('令加满: ', eventTmp['player']['now_star'], eventTmp['player']['star_value'])
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				this.animation(DoubleBattlePage.callBack)
			// 令减少
			}else if(eventTmp['miniType'] == DoubleBattleEvent.decreaseMana){
				// 注意防止超限
				let curStr = eventTmp['player']['now_star'];
				this[currentManaLabel].text = curStr + '/' + eventTmp['player']['star_value'];
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				this.animation(DoubleBattlePage.callBack)
			// 令增加
			}else if(eventTmp['miniType'] == DoubleBattleEvent.increaseMana){
				// 注意防止超限
				let curStr = eventTmp['player']['now_star'];
				this[currentManaLabel].text =String(curStr) + '/' + eventTmp['player']['star_value'];
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				// console.log('令增加: ', curStr, eventTmp['player']['star_value'])
				this.animation(DoubleBattlePage.callBack)

			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ManaEvent')
			}

		}

		// 回合事件监听
		else if(eventTmp['baseType'] == DoubleBattleEvent.ExtraTurnEvent){
			// 增加回合
			if(eventTmp['miniType'] == DoubleBattleEvent.increaseExtraTurn){
				this.animation(DoubleBattlePage.callBack)
			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ExtraTurnEvent')
			}
		}

		// 条件事件监听
		else if(eventTmp['baseType'] == DoubleBattleEvent.ConditionEvent){
			// console.log('[#]conditionAnimation eventTmp: ', eventTmp);
			let roleStr = '';
			if(eventTmp['player']['id'] == UserInfo.userid)
				roleStr = 'self';
			else
				roleStr = 'enemy';
			let currentConditionList = roleStr + 'ConditionList';
			let currentConditionGroup = roleStr + 'ConditionGroup';
			let currentConditionLable = roleStr + 'ConditionNumLabel';
			// 增加condiction成功
			if(eventTmp['miniType'] == DoubleBattleEvent.addConditionSuccess){
				// console.log('[##]增加condition成功')
				this[currentConditionList].push(eventTmp['card_effect']);
				this[currentConditionGroup].visible = true;
				this[currentConditionLable].text = 'x' + this[currentConditionList].length;
				this.animation(DoubleBattlePage.callBack)
			// 增加condiction失败
			}else if(eventTmp['miniType'] == DoubleBattleEvent.addConditionFail){
				// console.log('[##]增加condition失败')
				this.animation(DoubleBattlePage.callBack)
			// 移除condition
			}else if(eventTmp['miniType'] == DoubleBattleEvent.removeCondition){
				// console.log('[##] 移除condition')
				// console.log('[##] eventTmp', eventTmp);
				let index = this.findIndex(this[currentConditionList], eventTmp['card_effect']);
				// console.log('[##] index: ', index);
				// console.log('[##] currentConditionList before splice ', this[currentConditionList])
				if(index == -1){
					console.log("eventTmp['card_effect']: ", eventTmp['card_effect']);
					console.log('this[currenConditionList]: ', this[currentConditionList])
					throw new Error('can not find secret');
				}
				
				this[currentConditionList].splice(index, 1);
				this[currentConditionLable].text = 'x' + this[currentConditionList].length;
				if(this[currentConditionList].length == 0){
					this[currentConditionGroup].visible = false;
				}
				// console.log('[##] currentConditionList after splice ', this[currentConditionList])
				this.animation(DoubleBattlePage.callBack)


			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ConditionEvent')
			}
		}

		// buff事件监听
		else if(eventTmp['baseType'] == DoubleBattleEvent.BuffEvent){
			// console.log('[#]buffAnimation eventTmp: ', eventTmp);
			let roleStr = '';
			if(eventTmp['player']['id'] == UserInfo.userid)
				roleStr = 'self';
			else
				roleStr = 'enemy';
			let currentBuffList = roleStr + 'BuffList';
			let currentBuffGroup = roleStr + 'BuffGroup';
			let currentBuffLable = roleStr + 'BuffNumLabel';

			// 增加buff成功
			if(eventTmp['miniType'] == DoubleBattleEvent.addBuffSuccess){
				// console.log('[##]增加buff成功')
				this[currentBuffList].push(eventTmp['card_effect'])
				this[currentBuffGroup]['visible'] = true;
				this[currentBuffLable].text = 'x' + this[currentBuffList].length;
				this.animation(DoubleBattlePage.callBack)
			// 增加buff失败
			}else if(eventTmp['miniType'] == DoubleBattleEvent.addBuffFail){
				// console.log('[##]增加buff失败')
				this.animation(DoubleBattlePage.callBack);
			// 移除buff
			}else if(eventTmp['miniType'] == DoubleBattleEvent.removeBuff){
				// console.log('[##]移除buff')
				// console.log('[##] eventTmp', eventTmp);
				let index = this.findIndex(this[currentBuffList], eventTmp['card_effect']);
				// console.log('[##] index: ', index);
				// console.log('[##] currentBuffList before splice ', this[currentBuffList])
				if(index == -1){
					console.log("eventTmp['card_effect']: ", eventTmp['card_effect']);
					console.log('this[currentBuffList]: ', this[currentBuffList])
					throw new Error('can not find buff');
				}
				this[currentBuffList].splice(index, 1);
				this[currentBuffLable].text = 'x' + this[currentBuffList].length;
				if(this[currentBuffList].length == 0){
					this[currentBuffGroup].visible = false;
				}
				// console.log('[##] currentBuffList after splice ', this[currentBuffList])
				this.animation(DoubleBattlePage.callBack)
			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in BuffEvent')
			}
		}

		// secret事件监听
		else if(eventTmp['baseType'] == DoubleBattleEvent.SecretEvent){
			// console.log('[#]secretAnimation eventTmp: ', eventTmp);
			let roleStr = '';
			if(eventTmp['player']['id'] == UserInfo.userid)
				roleStr = 'self';
			else
				roleStr = 'enemy';
			let currentSecretList = roleStr + 'SecretList';
			let currentSecretLable = roleStr + 'SecretNumLabel';
			let currentSecretGroup = roleStr + 'SecretGroup';
			// 增加secret成功
			if(eventTmp['miniType'] == DoubleBattleEvent.addSecretSuccess){
				// console.log('[##]增加secret成功')
				this[currentSecretList].push(eventTmp['card_effect']);
				this[currentSecretGroup].visible = true;
				this[currentSecretLable].text = 'x' + this[currentSecretList].length;
				this.animation(DoubleBattlePage.callBack)
			// 增加secret失败
			}else if(eventTmp['miniType'] == DoubleBattleEvent.addSecretFail){
				// console.log('[##]增加secret失败')
				this.animation(DoubleBattlePage.callBack)

			}else if(eventTmp['miniType'] == DoubleBattleEvent.removeSecret){
				// console.log('[##]移除secret')
				let index = this.findIndex(this[currentSecretList], eventTmp['card_effect']);
				if(index == -1){
					// console.log("eventTmp['card_effect']: ", eventTmp['card_effect']);
					// console.log('this[currentSecretList]: ', this[currentSecretList])
					throw new Error('can not find secret');
				}
				this[currentSecretList].splice(index, 1);
				this[currentSecretLable].text = 'x' + this[currentSecretList].length;
				if(this[currentSecretList].length == 0){
					this[currentSecretGroup].visible = false;
				}
				this.animation(DoubleBattlePage.callBack)

			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in SecretEvent')
			}
		}

		// 手牌事件监听
		else if(eventTmp['baseType'] == DoubleBattleEvent.CardEvent){

			// 抽出所有牌并爆牌，爆掉牌库
			if(eventTmp['miniType'] == DoubleBattleEvent.cards999){
				// console.log('[##]抽出所有牌并爆牌，爆掉牌库');
				this.animation(DoubleBattlePage.callBack)

			// 弃掉所有手牌
			}else if(eventTmp['miniType'] == DoubleBattleEvent.cards_999){
				// console.log('[##]弃掉所有手牌: ');
				this._SelfCardGroup.disAllCard(this.selfCardList);
				this.selfCardList = [];
				egret.Tween.get(this).wait(this.selfCardList.length*500).call(()=>{this.animation(DoubleBattlePage.callBack)})
			// 抽牌并置入手牌动画
			}else if(eventTmp['miniType'] == DoubleBattleEvent.drawCardSuccess){
				let newCardId = eventTmp['card_effect']['card_id'];
				this._SelfCardGroup.dealCard([newCardId]);
				this.selfCardList.push(newCardId);
				this.cardPoolNumLabel.text = parseInt(this.cardPoolNumLabel.text)+1 + '';
				egret.Tween.get(this).wait(200).call(()=>{this.animation(DoubleBattlePage.callBack)})
			// 抽牌并爆牌
			}else if(eventTmp['miniType'] == DoubleBattleEvent.drawCardFail){
				let newCardId = eventTmp['card_effect']['card_id'];
				this._SelfCardGroup.dealCardandDestory([newCardId]);
				// egret.Tween.get(this).wait(700).call(()=>{this.animation(DoubleBattlePage.callBack)})
				this.animation(DoubleBattlePage.callBack);
			// 疲劳
			}else if(eventTmp['miniType'] == DoubleBattleEvent.drawNoCardTired){
				// console.log('[##]抽牌疲劳: ', eventTmp);
				this.animation(DoubleBattlePage.callBack)


			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in SecretEvent')
			}
		}else{
			console.log('[✗] eventTmp: ', eventTmp);
			throw new Error('Not Cought Case');
		}
	}

	// 展示己方buff
	public showSelfBuff(){
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.gap = 40;
		layout.horizontalAlign = egret.HorizontalAlign.CENTER;
		layout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shadeGroup.layout = layout;
		for(let i = 0; i < this.selfBuffList.length; i++){
			let cardView = new CardView(this.selfBuffList[i]['card_id']);
			cardView.setScale(2, 2);
			this.shadeGroup.addChild(cardView);
		}
		this.shadeGroup.visible = true;
		this.shadeImg.visible = true;
	}

	// 展示对方buff
	public showEnemyBuff(){
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.gap = 40;
		layout.horizontalAlign = egret.HorizontalAlign.CENTER;
		layout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shadeGroup.layout = layout;
		for(let i = 0; i < this.enemyBuffList.length; i++){
			let cardView = new CardView(this.enemyBuffList[i]['card_id']);
			cardView.setScale(2, 2);
			this.shadeGroup.addChild(cardView);
		}
		this.shadeGroup.visible = true;
		this.shadeImg.visible = true;
	}

	// 展示己方奥秘
	public showSelfSecret(){
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.gap = 40;
		layout.horizontalAlign = egret.HorizontalAlign.CENTER;
		layout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shadeGroup.layout = layout;
		for(let i = 0; i < this.selfSecretList.length; i++){
			let cardView = new CardView(this.selfSecretList[i]['card_id']);
			cardView.setScale(2, 2);
			this.shadeGroup.addChild(cardView);
		}
		this.shadeGroup.visible = true;
		this.shadeImg.visible = true;
	}

	// 展示对方奥秘
	public showEnemySecret(){
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.gap = 40;
		layout.horizontalAlign = egret.HorizontalAlign.CENTER;
		layout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shadeGroup.layout = layout;
		for(let i = 0; i < this.selfSecretList.length; i++){
			let cardView = new eui.Image();
			cardView.texture = RES.getRes('secret_png');
			cardView.scaleX = 2;
			cardView.scaleY = 2;
			this.shadeGroup.addChild(cardView);
		}
		this.shadeGroup.visible = true;
		this.shadeImg.visible = true;
	}

	// 展示己方condition
	public showSelfCondition(){
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.gap = 40;
		layout.horizontalAlign = egret.HorizontalAlign.CENTER;
		layout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shadeGroup.layout = layout;
		for(let i = 0; i < this.selfConditionList.length; i++){
			let cardView = new CardView(this.selfConditionList[i]['card_id']);
			cardView.setScale(2, 2);
			this.shadeGroup.addChild(cardView);
		}
		this.shadeGroup.visible = true;
		this.shadeImg.visible = true;
	}

	// 展示对方condition
	public showEnemyCondition(){
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.gap = 40;
		layout.horizontalAlign = egret.HorizontalAlign.CENTER;
		layout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shadeGroup.layout = layout;
		for(let i = 0; i < this.enemyConditionList.length; i++){
			let cardView = new CardView(this.enemyConditionList[i]['card_id']);
			cardView.setScale(2, 2);
			this.shadeGroup.addChild(cardView);
		}
		this.shadeGroup.visible = true;
		this.shadeImg.visible = true;
	}

	public hideShadeGroup(){
		this.shadeGroup.visible = false;
		this.shadeImg.visible = false;
		this.shadeGroup.removeChildren();
	}






	// 移除卡牌对象
	public safeRemove(obj: any): void {
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
		this.removeComponentTween(obj);
		obj = null;
	}

	// 移除卡牌 with index
	public safeRemoveWithIndex(obj: any, index: number): void {
		let id = this.selfCardList[index];
		this.selfCardList.splice(index, 1);
		// 删除对象
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
		this.removeComponentTween(obj);
		obj = null;
	}



	// 移除卡牌 with index 并使用
	public safeRemoveAndEmitUseCard(obj: any, index: number): void {
		let id = this.selfCardList[index];
		console.log('[##] use card id: ', id);
		console.log('[##] use card: ', Cards.cards[index]['description']);
		var useCard  = {session: UserInfo.session, userid: UserInfo.userid, card_index: index};
		SocketAPI.socket.emit('useCard', useCard);
		console.log('emit use card in safeRemoveAndEmitUseCard: ', useCard)
		this.selfCardList.splice(index, 1);
		// 删除对象
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
		this.removeComponentTween(obj);
		obj = null;
	}

	public removeComponentTween(parent): void {
		if (parent) {
			var count = parent.numChildren || 0;
			for (var i = 0; i < count; ++i) {
				this.removeComponentTween(parent.$children[i]);
			}
			egret.Tween.removeTweens(parent);
		}
	}

	// 取得两个卡牌的不同卡	oldArr为id new 比 old 多的东西
	public getCardDifference1(newArr, oldArr) {
        let CardList = [];
		if(oldArr.length == 0){
			for(let i = 0; i < newArr.length; i++){
				CardList.push(newArr[i]['id']);
				// CardList.push(newArr[i]);
			}
			return CardList;
		}
		let flag = true;
		for(let i = 0; i < newArr.length; i++){
			flag = true;
			for(let j = 0; j < oldArr.length; j++){
				if(newArr[i]['id'] == oldArr[j]){
					flag = false;
					break;
				}
			}
			if(flag){
				CardList.push(newArr[i]['id']);
			}
		}
		return CardList;
    }

		// 取得两个卡牌的不同卡 newArr为id new比old 多的东西
	public getCardDifference2(newArr, oldArr) {
        let CardList = [];
		if(oldArr.length == 0){
			for(let i = 0; i < newArr.length; i++){
				CardList.push(newArr[i]);
			}
			return CardList;
		}
		let flag = true;
		for(let i = 0; i < newArr.length; i++){
			flag = true;
			for(let j = 0; j < oldArr.length; j++){
				if(newArr[i] == oldArr[j]['id']){
					flag = false;
					break;
				}
			}
			if(flag){
				CardList.push(newArr[i]);
			}
		}
		return CardList;
    }

	// 比较 比较后者多余前者的list
	public getDiffList(Arr1, Arr2){
		let CardList = [];
		if(Arr2.length == 0){
			return CardList;
		}
		let tmpString;
		let findFlag = false;
		for(let i = 0; i < Arr2.length; i++){
			let tmpString =  JSON.stringify(Arr2[i]);
			for(let j = 0; j < Arr1.length; j++){
				findFlag = false;
				if( JSON.stringify(Arr1[j]) == tmpString){
					findFlag = true;
					break;
				}
			}
			if(findFlag == false){
				CardList.push(Arr2[i]);
			}
		}
		return CardList;
	}

	public findIndex(Arr, obj){
		let stringArr;
		let stringObj = JSON.stringify(obj);
		for(let i = 0; i < Arr.length; i++){
			stringArr = JSON.stringify(Arr[i]);
			if(stringArr == stringObj)
				return i;
		}
		return -1;
	}

	public release(){
		// remove reverseBtn
		console.log('this: ', this);
		console.log('this.endTurnBtn: ', this.endTurnBtn);
		this.endTurnGroup.removeChild(this.endTurnBtn);
		this.endTurnBtn.turnOver.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.endTurn, this);
		this.endTurnBtn = null;
		// 移除技能按钮
		this.selfSkillBtn.unusedSkillImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useSkill, this);
		this.selfSkillGroup.removeChild(this.selfSkillBtn);
		this.selfSkillBtn = null;
		this.enemySkillGroup.removeChild(this.enemySkillBtn);
		this.enemySkillBtn = null;
		// 移除监听
		this.removeEventListener(DoubleBattleEvent.DOUBLEBATTLEEVENT, this.animation, this);
		this.selfBuffImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfBuff, this);
		this.enemyBuffImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemyBuff, this);
		this.selfSecretImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfSecret, this);
		this.enemySecretImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemySecret, this);
		this.selfConditionImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfCondition, this);
		this.enemyConditionImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemyCondition, this);
		this.shadeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideShadeGroup, this);
		this.WinGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.winGroupClick, this)
		this.FailGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.dealFailGame, this)
		this.TieGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.dealTieGame, this)
		this.balanceGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.balanceGroupClick, this)
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.failBack, this);
		// HP release, 值归零
		for(let i = 1; i < 30; i++){
			this.selfHPGroup.removeChild(this.selfHpBlockList[i]);
			this.selfHpBlockList[i] = null;
		}
		for(let i = 1; i < 30; i++){
			this.enemyHPGroup.removeChild(this.enemyHpBlockList[i]);
			this.enemyHpBlockList[i] = null;
		}
		this.selfHpBlockList = [];
		this.enemyHpBlockList = [];
		this.selfHpLabel.text = `0 / ${GameRules.CuteValueDefault}`;
		this.enemyHpLabel.text = `0 / ${GameRules.CuteValueDefault}`;
		// 护甲归零
		this.selfProtectNumLabel.text = '0';
		this.enemyProtectNumLabel.text = '0';
		this.selfProtectGroup.visible = true;
		this.enemyProtectGroup.visible = true;
		// Mana归零
		this.selfManaNumLable.text = '0 / 0';
		this.enemyManaNumLable.text = '0 / 0';
		this.selfManaGroup.visible = true;
		this.enemyManaGroup.visible = true;
		this.selfManaValueNow_star = 0;
		this.enemyManaValueNow_star = 0;
		// CBS归零
		this.selfConditionGroup.visible = false;
		this.selfConditionNumLabel.text = 'x0';
		this.selfBuffGroup.visible = false;
		this.selfBuffNumLabel.text = 'x0';
		this.selfSecretGroup.visible = false;
		this.selfSecretNumLabel.text = 'x0';
		this.selfBuffList = [];
		this.selfConditionList = [];
		this.selfSecretList = [];
		this.enemyConditionGroup.visible = false;
		this.enemyConditionNumLabel.text = 'x0';
		this.enemyBuffGroup.visible = false;
		this.enemyBuffNumLabel.text = 'x0';
		this.enemySecretGroup.visible = false;
		this.enemySecretNumLabel.text = 'x0';
		this.enemyBuffList = [];
		this.enemyConditionList = [];
		// 结算框体隐藏
		this.WinGroup.visible = false;
		this.TieGroup.visible = false;
		this.FailGroup.visible = false;
		this.balanceGroup.visible = false;
		// gameInfo
		this.gameInfo = null;
		// 释放gamehandle
		this.gameHandle = null;
		// turn num
		this.turnNum = 1;
		// 牌库
		this.enemyCardpoolImg.visible = true;
		this.selfCardpoolImg.visible = true;
		// 遮罩
		this.shadeGroup.visible = false;
		this.shadeImg.visible = false;
		// 卡牌归零
		this.selfCardList = [];
		this.enemyCardNum = 0;
		this._SelfCardGroup.release();
		this._EnemyCardGroup.release();

	}


}
