

class SingleBattlePage extends eui.Component implements  eui.UIComponent {
	
	public backGround:eui.Image;				// 背景

	public battleElementsGroup: eui.Group;		// 战斗所有元素group, 不包括胜利/失败/平局、选卡、结算
	// 卡牌动画使用
	public CardGruop: eui.Group;
	public Special: eui.Group;
	public _SelfCardGroup: SelfCardGroup;
	public Gm_bg: eui.Image;
	private static ins: SingleBattlePage;
	public SelfInfoPanel:eui.Image;

	public skillGroup: eui.Group;			// 技能group
	public skillBtn: Skill;					// 技能按钮
	public endTurnGroup: eui.Group;			// 结束回合group
	public endTurnBtn: btnWithReverse;		// 结束回合按钮

	// 卡牌记录
	public selfCardList = [];	//自己的手牌， 均为id

	// 己方个人信息
	public selfElements:eui.Group;			// 己方所有元素集合
	public selfHPGroup:eui.Group;			// 己方血条 group
	public selfHpBg:eui.Image;				// 血条背景
	public selfHpBlockFirst:eui.Image;		// 第一个血块
	public selfHpBlockList:Array<eui.Image> = [];	// HP 血块图片 list
	public selfHpLabel: eui.Label;			// HP值 label
	public selfManaGroup:eui.Group;			// 令 group
	public selfManaNumLable:eui.Label;		// 令 值 label
	public selfManaImg:eui.Image;			// 令 图片
	public selfProtectGroup:eui.Group;		// 护甲 group
	public selfProtectNumLabel:eui.Label;	// 护甲 值 label
	public selfProtectImg:eui.Image;		// 护甲 图片
	public selfCBSGroup:eui.Group;			// 护甲C, buffB, 奥秘S: CBS group
	public selfBuffGroup: eui.Group;		// buff group
	public selfBuffImg:eui.Image;			// buff 图片
	public selfBuffNumLabel:eui.Label;		// buff 值 label
	public selfConditionGroup: eui.Group;	// condiction group
	public selfConditionImg:eui.Image;		// condiction 图片
	public selfConditionNumLabel:eui.Label;	// condiction 值 label
	public selfSecretGroup: eui.Group;		// secret group
	public selfSecretImg:eui.Image;			// 奥秘 图片
	public selfSecretNumLabel:eui.Label;	// 奥秘 值 label
	public selfAvatar:eui.Image;			// 个人头像 图片
	public selfBuffList = [];				// bufflist, 内为card_effect
	public selfSecretList = [];				// secretList, 内为card_effect
	public selfConditionList = [];			// conditionList, 内为card_effect
	public cardPoolNumLabel: eui.Label;		// 卡牌牌库数量 label
	public selfHPValue: number;				// HP值
	public selfProtectValue: number;		// 护甲值
	public selfManaValueNow_star: number; 	// now_star
	public selfManaValueStar_value: number;// star_value

	// 对方个人信息
	public enemyElements:eui.Group;
	public enemyHPGroup:eui.Group;
	public enemyHpBg:eui.Image;
	public enemyHpBlockFirst:eui.Image;
	public enemyHpBlockList:Array<eui.Image> = [];
	public enemyHpLabel:eui.Label;
	public enemyManaGroup:eui.Group;
	public enmyManaImg:eui.Image;
	public enemyManaNumLable:eui.Label;
	public enemyProtectGroup:eui.Group;
	public enemyProtectImg:eui.Image;
	public enemyProtectNumLabel:eui.Label;
	public enemyCBSGroup:eui.Group;
	public enemyBuffGroup: eui.Group;
	public enemyBuffImg:eui.Image;
	public enemyBuffNumLabel:eui.Label;
	public enemyConditionGroup: eui.Group;
	public enemyConditionImg:eui.Image;
	public enemyConditionNumLabel:eui.Label;
	public enemySecretGroup: eui.Group;
	public enemySecretImg:eui.Image;
	public enemySecretNumLabel:eui.Label;
	public enemyAvatar:eui.Image;
	public enemyBuffList = [];
	public enemyConditionList = [];
	public enemySecretList = [];
	public enemySkillLabel:eui.Label;		// AI技能

	public enemyHPValue: number;			
	public enemyProtectValue: number;		
	public enemyManaValueNow_star: number; 			
	public enemyManaValueStar_value: number;

	public shadeGroup:eui.Group;			// 总体遮罩group
	public shadeImg:eui.Group;				// 总体遮罩直伤

	public cardpool:eui.Image;				// 牌库（单人只有一个）

	public turnNum = 1;						//对战turn数，自己打一次 +1， 对方打一次 +1

	public gameHandle: GameHandle;

	public gameInfo: any;					//gameInfo

	// 胜利、失败
	public WinGroup:eui.Group;				// 胜利 group
	public TieGroup:eui.Group;				// 平局 group
	public FailGroup:eui.Group;				// 失败 group

	// 结算相关
	public balanceGroup:eui.Group;			// 结算 group
	public balancePannel:eui.Group;
	public Coins:eui.Label;					// 金币 变多数值
	public Exp:eui.Label;					// 经验 变多数值
	public Lv:eui.Label;					// 等级 label
	public LvBar:eui.ProgressBar;			// 等级 bar
	public ticks: number;					// 等级 bar变化记录
	public presentCardLabel:eui.Label;		// 送卡label
	public presentCardScoller:eui.Scroller;	// 送卡 scoller


	// 选牌相关
	public ChooseCardGroup:eui.Group;
	public ChooseCardBackGround:eui.Image;
	public choose_card1:eui.Group;
	public choose_card2:eui.Group;
	public choose_card3:eui.Group;

	// 放弃战斗
	public backBtn:eui.Button;

	// 开始回合计时器
	public static beginTurnReplyTimeInterval: any;		

	// 特殊事件定义
	public static emitEndTurn: string = "CLICKENDTURN";
	public static updateData: string = "UPDATEDATA";
	public static emitBeginTurn: string = "BEGINTURN";
	public static callBack: string = "CALLBACK";
	public static reverseEndTurnBtn: string = "REVERSEENDTURNBTN";
	public static win: string = 'WIN';
	public static fail: string = 'FAIL';
	public static tie: string = 'TIE';

	public static now_turn: number;				// 当前玩家 1：自己，2：对手

	//信息
    public InfoImg:eui.Image;

	// 新手指导
	public guideGroup:eui.Group;
	public teacherImg:eui.Image;
	public teacheList = [0, 1, 2, 3, 4];
	public index = 0;
	public leftBtn:eui.Image;
	public rightBtn:eui.Image;



	// 动画相关队列、flag
	public static animationList = [];				//卡牌动画列表

	public childrenCreated() {
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.init();
		this._SelfCardGroup = new SelfCardGroup(this);

		// 初始化三选一监听(监听无法取消，所以就启动一次)
		this.choose_card1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCardClick, {this:this,value:1});
		this.choose_card2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCardClick, {this:this,value:2});
		this.choose_card3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCardClick, {this:this,value:3});

	}

	public static instance(): SingleBattlePage {
		return SceneManager.getInstance().singleBattlePage;
	}


	public init() {

		// 初始化音乐
		console.log(UserInfo.soundChannel)
		if(UserInfo.soundChannel)
			UserInfo.soundChannel.stop();
		UserInfo.music = RES.getRes("battle_mp3");
  		UserInfo.soundChannel  =  UserInfo.music.play(0, -1);
		console.log('对战页面播放音乐',UserInfo.soundChannel)		  

		// 初始化头像
		this.backGround.texture = RES.getRes(UserInfo.singleBattleBackgroundImg);
		this.selfAvatar.texture = RES.getRes(`role${UserInfo.roleid}_face_png`)
		console.log('`monster${UserInfo.enemyroleid}_png`: ', `monster${UserInfo.enemyroleid}_png`);
		this.enemyAvatar.texture = RES.getRes(`monster${UserInfo.enemyroleid}_png`)
		this.battleElementsGroup.touchEnabled = true;		// 初始化为可点击
		this.backBtn.touchEnabled = true;					// 初始化返回可点击
		this.gameHandle = new GameHandle();
		this.turnNum = 1;
		this.initReverseElement();				// 初始化翻转对象
		this.initHp();							//初始化HP
		this.initAnimationElement();			// 初始化动画相关队列、flag等元素
		this.initConditionBuffSecret();			// 初始化 condiction, buff, secret 数值
		this.shadeGroup.visible = false;		// 计谋、策略 遮罩初始化
		this.initBalanceGroup();				// 初始化结算
		this.addLinsters();						// 添加监听
		this.selfCardList = [];					// 初始化化卡牌list
		this.initPresentCardScroller();			// 初始化卡牌赠送滚轮
		this.initBattleElement();
		SingleBattlePage.now_turn = 1;			// 初始化为己方先手
		this.enemyElements.touchEnabled = false;

	}

	// 初始化所有监听
	public addLinsters(){
		
		this.skillBtn.unusedSkillImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useSkill, this);
		// 初始化时间监听
		this.addEventListener(SingleBattleEvent.SINGLEBATTLEEVENT, this.animation, this);
		// 初始化Condition Buff Secret监听
		this.selfBuffImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfBuff, this);
		// this.enemyBuffImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemyBuff, this);
		this.selfSecretImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfSecret, this);
		// this.enemySecretImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemySecret, this);
		this.selfConditionImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSelfCondition, this);
		// this.enemyConditionImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnemyCondition, this);
		// 初始化shade监听
		this.shadeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideShadeGroup, this);
		// 初始化胜利、失败、平局监听
		this.WinGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.winGroupClick, this);
		this.FailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dealFailGame, this);
		this.TieGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dealTieGame, this);
		this.balanceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.balanceGroupClick, this);
		// 初始化认输按钮监听
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.failBack, this);

		// 初始化指导
		this.InfoImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGuide, this);
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goLeft, this);
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRight, this);
		this.teacherImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideGuide, this);
	
	}

	public showGuide(){
		this.index = 0;
		this.guideGroup.visible = true;
		this.teacherImg.texture = RES.getRes('teacher' + this.index + '_png');
		this.leftBtn.visible = false;
		this.rightBtn.visible = true;
	}

	public goLeft(){
		this.index --;
		if(this.index == 0){
			this.leftBtn.visible = false;
			this.rightBtn.visible = true;
		}else{
			this.leftBtn.visible = true;
			this.rightBtn.visible = true;
		}
		
		this.teacherImg.texture = RES.getRes('teacher' + this.index + '_png');
	}

	public goRight(){
		this.index ++;
		if(this.index == 4){
			this.leftBtn.visible = true;
			this.rightBtn.visible = false;
		}else{
			this.leftBtn.visible = true;
			this.rightBtn.visible = true;
		}
		
		this.teacherImg.texture = RES.getRes('teacher' + this.index + '_png');
	}

	public hideGuide(){
		this.guideGroup.visible = false;
	}

	public failBack(){
		let that = this;
		new infoView(this,"你确定要退出吗？你将会直接认输！",()=>{
			that.FailGroup.visible = true;
			that.FailGroup.touchEnabled = true;
		},()=>{},true,true);
	}
	
	public initConditionBuffSecret(){
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
		var skillBtn = new Skill(1);
		skillBtn.x = 150;
		skillBtn.y = 220;
		this.skillGroup.addChild(skillBtn);
		skillBtn.anchorOffsetX = skillBtn.width/2;
		skillBtn.anchorOffsetY = skillBtn.height/2;
		this.skillBtn = skillBtn;
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
		SingleBattlePage.animationList = [];
	}

	public initPresentCardScroller(){
		// 取消滚动条可见以及水平滚动
		// this.presentCardScoller.verticalScrollBar.autoVisibility = false;
		// this.presentCardScoller.verticalScrollBar.visible = false;
		// this.presentCardScoller.horizontalScrollBar.autoVisibility = false;
		// this.presentCardScoller.horizontalScrollBar.visible = false;
		// this.presentCardScoller.scrollPolicyV = "off";
	}

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
		// 注意单人对战均为己方先手
		SceneManager.getInstance().changeScene("singleBattlePage");
		this.gameInfo = data['data'];
		UserInfo.self_player = 'player1';
		UserInfo.enemy_player = 'player2';			//AI永远是player2
		this.animation([SingleBattlePage.updateData, data])
		var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
		SocketAPI.socket.emit('beginTurn', beginTurn);
		console.log('emit beginturn');
		this.enemySkillLabel.text = data['data']['player2']['skill_description'].join('\n');
	}

	// deal begin turn reply
	public dealBeginTurnReply(data){
		if(data['errno'] != 0){
			console.log('error in beginTurnReply: ', data);
			throw new Error('beginTurnReply Error');
		}

		if(data['data']["now_turn"] == UserInfo.userid){
			SingleBattlePage.now_turn = 1;
			if(this.turnNum != 1){
				this.endTurnBtn.turnOver.touchEnabled = true;
				this.animation(SingleBattlePage.reverseEndTurnBtn);
			}
			this.turnNum ++;
		}else{
			SingleBattlePage.now_turn = 2;
		}
		// 更新弃牌牌组
		this.gameInfo["discard_list"]=data['data']["discard_list"];
		let lastCard = data['data']['last_card'];
		//播放动画
		this.gameHandle.beginTurn(this.gameInfo);
		//动画播放完成
		this.gameInfo = data['data'];
		this.animation([SingleBattlePage.updateData, data])
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

		this.animation([SingleBattlePage.updateData, data]);

		if(data['data']['now_turn'] == UserInfo.userid){
			this.animation(SingleBattlePage.emitBeginTurn);
		}
	}

	// deal use card or skill reply
	public useCardORSkillReply(data){
		let currentPlayer;
		if(this.gameInfo['now_turn'] == this.gameInfo["player1"]["userid"]){
			currentPlayer = this.gameInfo["player1"];
		}else{
			currentPlayer = this.gameInfo["player2"];
		}
		currentPlayer["last_card"]=data['data']["last_card"];
		if(currentPlayer["last_card"]["card_id"]==undefined){
			//玩家刚刚使用了技能
			this.useSkillReply(data);

		}else{
			//玩家刚刚使用了一张卡牌
			this.useCardReply(data);
		}
		// 更新信息
		this.animation([SingleBattlePage.updateData, data]);

	}


	public useSkillReply(data){
		let currentPlayer;
		if(this.gameInfo['now_turn'] == this.gameInfo["player1"]["id"]){
			currentPlayer = this.gameInfo["player1"];
		}else{
			currentPlayer = this.gameInfo["player2"];
		}
		this.gameInfo["discard_list"]=data["discard_list"];
		let lastCard = data['last_card'];
		//播放动画完成
		this.gameHandle.useSkill(this.gameInfo, currentPlayer);
		//动画播放完成
		this.gameInfo = data['data'];
		this.animation([SingleBattlePage.updateData, data]);
	}

	public useCardReply(data){
		let currentPlayer;
		if(this.gameInfo['now_turn'] == this.gameInfo["player1"]["id"]){
			currentPlayer = this.gameInfo["player1"];
		}else{
			currentPlayer = this.gameInfo["player2"];
		}
		this.gameInfo['player1']["discard_list"]=data['data']['player1']["discard_list"];
		let lastCard = data['data']['last_card'];
		//播放动画完成
		this.gameHandle.useOneCard(this.gameInfo, currentPlayer, lastCard);
		//动画播放完成
		this.gameInfo = data['data'];
		this.animation([SingleBattlePage.updateData, data]);
	}

	// deal choose card reply
	public dealchooseCardReply(data){
		if(data["errno"]==0){
			//添加成功,调用closeGame,收到回复后会显示结算框体
			var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
		    SocketAPI.socket.emit('closeGame', closeGame);
			console.log('emit closeGame in dealchooseCardReply');
		}else{
			console.log("[*]Error: 3选1时添加卡牌失败:",data["errmsg"]);
		}
		UserInfo.adventureStatus= false;
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

		// 送卡
		this.presentCardLabel.text = '';
		let str = '';
		let single_level = UserInfo.single_level;
		let tmp_level = UserInfo.tmp_level;
		let single_chapter = Chapter.deLevel(single_level);
		let tmp_chapter = Chapter.deLevel(tmp_level);
        let ChapterInfo = Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]);
		// console.log('[##] chapterInfo: ', Chapter);
		if(UserInfo.WinSingleGame){
			let cardList = ChapterInfo["firstCardAward"];
			for(let i = 0; i < cardList.length; i++){
				let cardInfo = Cards.getCardById(cardList[i]);
				if(cardInfo['effect']['card_rare'] == 'N')
					str += `<font color=0xffffff>${cardInfo["name"]}</font>`;
				if(cardInfo['effect']['card_rare'] == 'R')
					str += `<font color=0xff0000>${cardInfo["name"]}</font>`;
				if(cardInfo['effect']['card_rare'] == 'SR')
					str += `<font color=0xff0000>${cardInfo["name"]}</font>`;
				if(cardInfo['effect']['card_rare'] == 'SSR')
					str += `<font color=0xff0000>${cardInfo["name"]}</font>`;
				str += '\n';
			}
			if(cardList.length == 0){
				str = '无';
			}
		}else{
			str = '无';
		}
		this.presentCardLabel.lineSpacing = 10;
		this.presentCardLabel.textFlow = new egret.HtmlTextParser().parser(str);

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
		if(SingleBattlePage.now_turn == 1){
			if(this.selfManaValueNow_star >= this.gameInfo[UserInfo.self_player]['skill']['card_cost']){
				console.log('use skill ---');
				if(this.skillBtn.useableNum-1 == 0){
					this.skillBtn.reverseBtn();
					this.skillBtn.usedSkillImg.touchEnabled = false;
				}
				this.skillBtn.useableNum -= 1;
				var useCard  = {session: UserInfo.session, userid: UserInfo.userid, card_index: -1};
				SocketAPI.socket.emit('useCard', useCard);
			}
		}
	}

	public endTurn(){
		this.endTurnBtn.turnOver.touchEnabled = false;
		this.animation(SingleBattlePage.reverseEndTurnBtn);
		this.animation(SingleBattlePage.emitEndTurn);
	}

	// 点击胜利面板
	public winGroupClick(){
		UserInfo.WinSingleGame = true; 
		this.ShowChooseCardPanel(); 
		this.WinGroup.visible = false
	}

	// 点击失败面板
	public dealFailGame(){
		this.FailGroup.visible = false;
		UserInfo.WinSingleGame = false;
		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
		SocketAPI.socket.emit('closeGame', closeGame);
		console.log('emit closeGame in dealFailGame');
	}
	
	// 点击平局面板
	public dealTieGame(){
		this.TieGroup.visible = false;
		UserInfo.WinSingleGame = false;
		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
		SocketAPI.socket.emit('closeGame', closeGame);
		console.log('emit closeGame in dealTieGame');
	}

	// 放弃认输
	public giveUp(){
		this.FailGroup.visible = true;
		this.FailGroup.touchEnabled = true;
	}

	// 显示3选1
	public ShowChooseCardPanel(){
		let tmp_chapter = Chapter.deLevel(UserInfo.tmp_level);
		let chapterInfo=Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]);
		console.log("[*]检查一般卡牌奖励",chapterInfo["generalCardAward"]);
		if(chapterInfo["generalCardAward"].length>0){
			//可以进行三选一
			//显示3选1框体.
			//根据关卡难度选择三张卡牌显示
			let monster = chapterInfo["ai"];
			let monsterinfo=Monster.getMonster(monster);
			let level=0;
			switch(monsterinfo["type"]){
				case "兵":level=0;break;
				case "士":level=1;break;
				case "将":level=2;break;
				case "相":level=3;break;
				default:level=0;
			}
			let award1 = this.generateCardByLevel(level);
			this.choose_card1.removeChildren();
			let awardCard1=new CardView(award1['id']);
			awardCard1.setScale(this.choose_card3.width/awardCard1.width, this.choose_card3.width/awardCard1.width);
			awardCard1.CardFace.filters = [PublicMethod.getDropShadowFilter()];
			this.choose_card1.addChild(awardCard1);

			let award2 = this.generateCardByLevel(level);
			this.choose_card2.removeChildren();
			let awardCard2=new CardView(award2['id']);
			awardCard2.setScale(this.choose_card3.width/awardCard2.width, this.choose_card3.width/awardCard2.width);
			awardCard2.CardFace.filters = [PublicMethod.getDropShadowFilter()];
			this.choose_card2.addChild(awardCard2);

			let award3 = this.generateCardByLevel(level);
			this.choose_card3.removeChildren();
			let awardCard3=new CardView(award3['id']);
			awardCard3.setScale(this.choose_card3.width/awardCard3.width, this.choose_card3.width/awardCard3.width);
			awardCard3.CardFace.filters = [PublicMethod.getDropShadowFilter()];
			this.choose_card3.addChild(awardCard3);

			this.ChooseCardGroup.visible = true;
		}
		return ;
	}

	public generateCardByLevel(level:number){
		function RandomNum(Min, Max) {
     		 var Range = Max - Min;
      		var Rand = Math.random();
      		var num = Min + Math.floor(Rand * Range); //舍去
     	 return num;
		}
		let prob=[];
		prob[0] = [0.7,0.95,0.99,1];
		prob[1]= [0.4,0.9,0.96,1];
		prob[2]= [0.3,0.7,0.9,1];
		prob[3]= [0,0.3,0.7,1];
		if(level<0 || level>3){
			console.log("[*]根据难度随机生成3选1卡牌时传入错误难度",level)
			return null
		};
		let probUse = prob[level];
		let typeRand = Math.random();
		if(typeRand<probUse[0])
		{
			//选择N卡
			let c=RandomNum(0,Cards.cardsRareMap["N"].length)
			return Cards.cardsRareMap["N"][c];
		}else if(typeRand>=probUse[0] && typeRand<probUse[1]){
			//选择R卡
			let c=RandomNum(0,Cards.cardsRareMap["R"].length)
			return Cards.cardsRareMap["R"][c];
		}else if(typeRand>=probUse[1] && typeRand<probUse[2]){
			//选择SR卡
			let c=RandomNum(0,Cards.cardsRareMap["SR"].length)
			return Cards.cardsRareMap["SR"][c];
		}else if(typeRand>=probUse[2] && typeRand<probUse[3]){
			//选择SSR卡
			let c=RandomNum(0,Cards.cardsRareMap["SSR"].length)
			return Cards.cardsRareMap["SSR"][c];
		}
	}

	public chooseCardClick(e,self){
		//关闭选卡界面，发送选卡请求,等待打开结算界面
		self = this;
		let v = self.value;

		self.this.ChooseCardGroup.visible = false;
		let cardid=-1;
		switch(v){
			case 1:cardid=parseInt(self.this.choose_card1.name);break;
			case 2:cardid=parseInt(self.this.choose_card2.name);break;
			case 3:cardid=parseInt(self.this.choose_card3.name);break;
		}
		var chooseCard  = {session: UserInfo.session, userid: UserInfo.userid, choice: cardid};
		SocketAPI.socket.emit('chooseCard', chooseCard);
		console.log('emit chooseCard: ', chooseCard);
	}

	// 更新信息
	public updateInfo(data){
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

	// 更新Mana
	public updateMana(data){
		let oldselfMana = this.selfManaValueNow_star;
		let oldenemyMana = this.enemyManaValueNow_star;
		this.selfManaValueNow_star = data['data']['player1']["now_star"];
		this.enemyManaValueNow_star = data['data']['player2']["now_star"];
		this.selfManaValueStar_value = data['data']['player1']['star_value'];
		this.enemyManaValueStar_value = data['data']['player2']['star_value'];
		let event = undefined;
		if(this.selfManaValueNow_star > oldselfMana){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ManaEvent, SingleBattleEvent.increaseMana, data['data']['player1'], undefined);
		}else if(this.selfManaValueNow_star < oldselfMana){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ManaEvent, SingleBattleEvent.decreaseMana, data['data']['player1'], undefined);
		}
		if(this.enemyManaValueNow_star > oldenemyMana){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ManaEvent, SingleBattleEvent.increaseMana, data['data']['player2'], undefined);
		}else if(this.enemyManaValueNow_star < oldenemyMana){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ManaEvent, SingleBattleEvent.decreaseMana, data['data']['player2'], undefined);
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
		this.selfProtectValue = data['data']['player1']["protect_value"];
		this.enemyProtectValue = data['data']['player2']["protect_value"];
		event = undefined;
		if(this.selfProtectValue > oldselfProtect){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ProtectEvent, SingleBattleEvent.increaseProtect, data['data']['player1'], undefined);
		}else if(this.selfProtectValue < oldselfProtect){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ProtectEvent, SingleBattleEvent.decreaseProtect, data['data']['player1'], undefined);
		}
		if(this.enemyProtectValue > oldenemyProtect){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ProtectEvent, SingleBattleEvent.increaseProtect, data['data']['player2'], undefined);
		}else if(this.enemyProtectValue < oldenemyProtect){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ProtectEvent, SingleBattleEvent.decreaseProtect, data['data']['player2'], undefined);
		}
		if(event){
			this.animation(event);
		}
	}

	// 更新 HP
	public updateHP(data){
		let oldselfHP = this.selfHPValue;
		let oldenemyHP = this.enemyHPValue;
		this.selfHPValue = data['data']['player1']["cute_value"];
		this.enemyHPValue = data['data']['player2']["cute_value"];
		let event = undefined;
		if(this.selfHPValue > oldselfHP){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.HPEvent, SingleBattleEvent.increaseHP, data['data']['player1'], undefined);
		}else if(this.selfHPValue < oldselfHP){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.HPEvent, SingleBattleEvent.decreaseHP, data['data']['player1'], undefined);
		}
		if(this.enemyHPValue > oldenemyHP){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.HPEvent, SingleBattleEvent.increaseHP, data['data']['player2'], undefined);
		}else if(this.enemyHPValue < oldenemyHP){
			event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.HPEvent, SingleBattleEvent.decreaseHP, data['data']['player2'], undefined);
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
		let newSelfBuffList = data['data']['player1']["buff_list"];
		let newEnemyBuffList = data['data']['player2']["buff_list"];
		
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
			let player = data['data']['player1'];
			for(let i = 0; i < selfBuffTmp1.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.BuffEvent, SingleBattleEvent.addBuffSuccess, player, selfBuffTmp1[i]);
				this.animation(event);
			}
		}
		selfBuffTmp2 = this.getDiffList(newSelfBuffList, oldSelfBuffList);
		if(selfBuffTmp2.length != 0){
			// console.log('@@@ selfBuffTmp2:', selfBuffTmp2)
			let player = data['data']['player1'];
			for(let i = 0; i < selfBuffTmp2.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.BuffEvent, SingleBattleEvent.removeBuff, player, selfBuffTmp2[i]);
				this.animation(event);
			}
		}

		let enemyBuffTmp1 = [];
		let enemyBuffTmp2 = [];
		// 新来的buff
		enemyBuffTmp1 = this.getDiffList(oldEnemyBuffList, newEnemyBuffList);
		if(enemyBuffTmp1.length != 0){
			// console.log('@@@ enemyBuffTmp1:', enemyBuffTmp1)
			let player = data['data']['player2'];
			for(let i = 0; i < enemyBuffTmp1.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.BuffEvent, SingleBattleEvent.addBuffSuccess, player, enemyBuffTmp1[i]);
				this.animation(event);
			}
		}
		enemyBuffTmp2 = this.getDiffList(newEnemyBuffList, oldEnemyBuffList);
		if(enemyBuffTmp2.length != 0){
			// console.log('@@@ enemyBuffTmp2:', enemyBuffTmp2)
			let player = data['data']['player2'];
			for(let i = 0; i < enemyBuffTmp2.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.BuffEvent, SingleBattleEvent.removeBuff, player, enemyBuffTmp2[i]);
				this.animation(event);
			}
		}
	}

	// 更新 condition
	public updateCondition(data){
		let oldSelfConditionList = this.selfConditionList;
		let oldEnemyConditionList = this.enemyConditionList;
		let newSelfConditionList = data['data']['player1']["condition_list"];
		let newEnemyConditionList = data['data']['player2']["condition_list"];
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
			let player = data['data']['player1'];
			for(let i = 0; i < selfConditionTmp1.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ConditionEvent, SingleBattleEvent.addConditionSuccess, player, selfConditionTmp1[i]);
				this.animation(event);
			}
		}
		selfConditionTmp2 = this.getDiffList(newSelfConditionList, oldSelfConditionList);
		if(selfConditionTmp2.length != 0){
			// console.log('@@@ selfConditionTmp2:', selfConditionTmp2);
			let player = data['data']['player1'];
			for(let i = 0; i < selfConditionTmp2.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ConditionEvent, SingleBattleEvent.removeCondition, player, selfConditionTmp2[i]);
				this.animation(event);
			}
		}

		let enemyConditionTmp1 = [];
		let enemyConditionTmp2 = [];
		// 新来的buff
		enemyConditionTmp1 = this.getDiffList(oldEnemyConditionList, newEnemyConditionList);
		if(enemyConditionTmp1.length != 0){
			// console.log('@@@ enemyConditionTmp1:', enemyConditionTmp1);
			let player = data['data']['player2'];
			for(let i = 0; i < enemyConditionTmp1.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ConditionEvent, SingleBattleEvent.addConditionSuccess, player, enemyConditionTmp1[i]);
				this.animation(event);
			}
		}
		enemyConditionTmp2 = this.getDiffList(newEnemyConditionList, oldEnemyConditionList);
		if(enemyConditionTmp2.length != 0){
			// console.log('@@@ enemyConditionTmp2:', enemyConditionTmp2);
			let player = data['data']['player2'];
			for(let i = 0; i < enemyConditionTmp2.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.ConditionEvent, SingleBattleEvent.removeCondition, player, enemyConditionTmp2[i]);
				this.animation(event);
			}
		}
	}

	// 更新 secret
	public updateSecret(data){
		let oldSelfSecretList = this.selfSecretList;
		let oldEnemySecretList = this.enemySecretList;
		let newSelfSecretList = data['data']['player1']["secret_condition_list"];
		let newEnemySecretList = data['data']['player2']["secret_condition_list"];
		

		let selfSecretTmp1 = [];
		let selfSecretTmp2 = [];
		// 新来的buff
		selfSecretTmp1 = this.getDiffList(oldSelfSecretList, newSelfSecretList);
		if(selfSecretTmp1.length != 0){
			let player = data['data']['player1'];
			for(let i = 0; i < selfSecretTmp1.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.SecretEvent, SingleBattleEvent.addSecretSuccess, player, selfSecretTmp1[i]);
				this.animation(event);
			}
		}
		selfSecretTmp2 = this.getDiffList(newSelfSecretList, oldSelfSecretList);
		if(selfSecretTmp2.length != 0){
			let player = data['data']['player1'];
			for(let i = 0; i < selfSecretTmp2.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.SecretEvent, SingleBattleEvent.removeSecret, player, selfSecretTmp2[i]);
				this.animation(event);
			}
		}

		let enemySecretTmp1 = [];
		let enemySecretTmp2 = [];
		// 新来的buff
		enemySecretTmp1 = this.getDiffList(oldEnemySecretList, newEnemySecretList);
		if(enemySecretTmp1.length != 0){
			let player = data['data']['player2'];
			for(let i = 0; i < enemySecretTmp1.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.SecretEvent, SingleBattleEvent.addSecretSuccess, player, enemySecretTmp1[i]);
				this.animation(event);
			}
		}
		enemySecretTmp2 = this.getDiffList(newEnemySecretList, oldEnemySecretList);
		if(enemySecretTmp2.length != 0){
			let player = data['data']['player2'];
			for(let i = 0; i < enemySecretTmp2.length; i++){
				let event = new SingleBattleEvent(SingleBattleEvent.SINGLEBATTLEEVENT, SingleBattleEvent.SecretEvent, SingleBattleEvent.removeSecret, player, enemySecretTmp2[i]);
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
		let curSkillNum = data['data']['player1']['skill_available'];
		// 背面向上
		if(this.skillBtn.unusedSkillImg.visible == false){
			if(curSkillNum > 0){
				this.skillBtn.reverseBtn();
			}
		// 正面向上
		}else{
			if(curSkillNum < 0){
				this.skillBtn.reverseBtn();
			}
		}
		this.skillBtn.usedSkillImg.touchEnabled = true;
		// 更新技能剩余数量
		this.skillBtn.useableNum = curSkillNum;
		this.cardPoolNumLabel.text = data['data']['player1']['cards_pool'].length;
	}

	// 更新卡牌, data为卡牌数组
	public updateCard(data){
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
	


	public updateWinner(data){
		if(data['data']['game_status']['FINISHED']!=undefined){
			let winner = data['data']['game_status']['FINISHED'];
			// 胜利
			if(winner['id'] == UserInfo.userid){
				this.animation(SingleBattlePage.win);
			// 失败
			}else if(winner == 'tie'){
				this.animation(SingleBattlePage.tie);
			}else if(winner['id'] == undefined){
				console.log('winner: ', winner);
				throw new Error('winner 信息错误');
			}else{
				this.animation(SingleBattlePage.fail);
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
		if(UserInfo.WinSingleGame == true){
			console.log('[#] 胜利并点击结算');
			this.balanceGroup.visible = false;
			// 跳转剧情
			SceneManager.getInstance().changeScene('storyGamePage');
		}
		else{
			console.log('[#] 失败并点击结算');
			UserInfo.adventureStatus = true;		// 跳回页面前更新属性
			SceneManager.getInstance().changeScene('adventureMap');
		}
		
	}



	// 所有动画事件以及额外事件
	public animation(e){
		// console.log('SingleBattlePage.animationList: ', SingleBattlePage.animationList);
		if(e['miniType']){
			console.log('[#]e: ', e['miniType']);
		}else{
			console.log('[#]e: ', e);
		}

		let eventTmp;
		// 回调
		if(e == SingleBattlePage.callBack){
			// 移除自己
			SingleBattlePage.animationList.splice(0, 1);
			// list动画播放完毕
			if(SingleBattlePage.animationList.length == 0){
				return;
			}
			// list动画播放未完毕，找到头事件
			eventTmp = SingleBattlePage.animationList[0];
		// 新的监听触发
		}else{
			// console.log('new event: ', e)
			SingleBattlePage.animationList.push(e)
			// 加入新事件，如果旧动画未完成, 返回不执行(>1表示不止它应该)
			if(SingleBattlePage.animationList.length > 1){
				return;
			// 加入新事件，如果旧动画完成, 立即执行
			}else{
				eventTmp = SingleBattlePage.animationList[0];
			}

		}

		if(eventTmp['miniType']){
			console.log('[#]eventTmp: ', eventTmp['miniType']);
		}else{
			console.log('[#]eventTmp: ', eventTmp);
		}

		// emit endTurn
		if(eventTmp == SingleBattlePage.emitEndTurn){
			var endTurn  = {session: UserInfo.session, userid: UserInfo.userid};
			SocketAPI.socket.emit('endTurn', endTurn);
			console.log('emit endTurn')
			this.animation(SingleBattlePage.callBack)

		// emit begin turn
		}else if(eventTmp == SingleBattlePage.emitBeginTurn){
			var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
			SocketAPI.socket.emit('beginTurn', beginTurn);
			this.animation(SingleBattlePage.callBack)

		// 翻结束按钮
		}else if(eventTmp == SingleBattlePage.reverseEndTurnBtn){
			this.endTurnBtn.reverseBtn().then(()=>{this.animation(SingleBattlePage.callBack);});

		// 胜利
		}else if(eventTmp == SingleBattlePage.win){
			this.EndGame(1);
			return;
		// 失败
		}else if(eventTmp == SingleBattlePage.fail){
			this.EndGame(2);
			return;
		// 平局
		}else if(eventTmp == SingleBattlePage.tie){
			this.TieGame();
			return;
		// 更新信息
		}else if(typeof eventTmp == typeof [] && eventTmp[0] == SingleBattlePage.updateData){
			// 更新信息
			this.updateInfo(eventTmp[1]);
			// 更新卡牌
			this.updateCard(eventTmp[1]["data"][UserInfo.self_player]["cards_list"]);
			// 更新胜负
			this.updateWinner(eventTmp[1]);

			this.animation(SingleBattlePage.callBack)

		// 护甲动画
		}else if(eventTmp['baseType'] == SingleBattleEvent.ProtectEvent){
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
			if(eventTmp['miniType'] == SingleBattleEvent.decreaseProtect){
				this[currentProtectGroup].visible = true;
				this[currentProtectLabel].text = eventTmp['player']['protect_value'];
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(SingleBattlePage.callBack);
			// 护甲增加
			}else if(eventTmp['miniType'] == SingleBattleEvent.increaseProtect){
				this[currentProtectGroup].visible = true;
				this[currentProtectLabel].text = eventTmp['player']['protect_value'];
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(SingleBattlePage.callBack)
			// 碎甲
			}else if(eventTmp['miniType'] == SingleBattleEvent.destoryProtect){
				this[currentProtectLabel].text = 0;
				this[currentProtectImg].visible = false;
				this[currentProtectValue] = 0;
				this.animation(SingleBattlePage.callBack)
			// 初始化甲
			}else if(eventTmp['miniType'] == SingleBattleEvent.formProtect){
				this[currentProtectLabel].text = eventTmp['player']['protect_value'];
				this[currentProtectImg].visible = true;
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(SingleBattlePage.callBack)
			// 免疫伤害
			}else if(eventTmp['miniType'] == SingleBattleEvent.immunityDamage){
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(SingleBattlePage.callBack)

			// 免疫一次
			}else if(eventTmp['miniType'] == SingleBattleEvent.immunityOnce){
				this[currentProtectValue] = eventTmp['player']['protect_value'];
				this.animation(SingleBattlePage.callBack)
			}else{
				throw new Error('don not exit right miniType in ProtectEvent')
			}

		}

		// HP动画
		else if(eventTmp['baseType'] == SingleBattleEvent.HPEvent){
			let ticksNum = 0;
			// 减血
			if(eventTmp['miniType'] == SingleBattleEvent.decreaseHP){
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
			}else if(eventTmp['miniType'] == SingleBattleEvent.increaseHP){
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
			egret.Tween.get(this).wait(200).call(()=>{this.animation(SingleBattlePage.callBack)});

		}

		// 令动画
		else if(eventTmp['baseType'] == SingleBattleEvent.ManaEvent){
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
			if(eventTmp['miniType'] == SingleBattleEvent.decreaseToZeroMana){
				this[currentManaLabel].text = eventTmp['player']['now_star'] + '/' + eventTmp['player']['star_value'];
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				this.animation(SingleBattlePage.callBack)
			// 令加满
			}else if(eventTmp['miniType'] == SingleBattleEvent.increaseToFullMana){
				// console.log('令加满: ', eventTmp['player']['now_star'], eventTmp['player']['star_value'])
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				this.animation(SingleBattlePage.callBack)
			// 令减少
			}else if(eventTmp['miniType'] == SingleBattleEvent.decreaseMana){
				// 注意防止超限
				let curStr = eventTmp['player']['now_star'];
				this[currentManaLabel].text = curStr + '/' + eventTmp['player']['star_value'];
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				this.animation(SingleBattlePage.callBack)
			// 令增加
			}else if(eventTmp['miniType'] == SingleBattleEvent.increaseMana){
				// 注意防止超限
				let curStr = eventTmp['player']['now_star'];
				this[currentManaLabel].text =String(curStr) + '/' + eventTmp['player']['star_value'];
				this[currentManaValueNow_star] = eventTmp['player']['now_star'];
				this[currentManaValueStar_value] = eventTmp['player']['star_value'];
				// console.log('令增加: ', curStr, eventTmp['player']['star_value'])
				this.animation(SingleBattlePage.callBack)

			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ManaEvent')
			}

		}

		// 回合事件监听
		else if(eventTmp['baseType'] == SingleBattleEvent.ExtraTurnEvent){
			// 增加回合
			if(eventTmp['miniType'] == SingleBattleEvent.increaseExtraTurn){
				this.animation(SingleBattlePage.callBack)
			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ExtraTurnEvent')
			}
		}

		// 条件事件监听
		else if(eventTmp['baseType'] == SingleBattleEvent.ConditionEvent){
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
			if(eventTmp['miniType'] == SingleBattleEvent.addConditionSuccess){
				// console.log('[##]增加condition成功')
				this[currentConditionList].push(eventTmp['card_effect']);
				this[currentConditionGroup].visible = true;
				this[currentConditionLable].text = 'x' + this[currentConditionList].length;
				this.animation(SingleBattlePage.callBack)
			// 增加condiction失败
			}else if(eventTmp['miniType'] == SingleBattleEvent.addConditionFail){
				// console.log('[##]增加condition失败')
				this.animation(SingleBattlePage.callBack)
			// 移除condition
			}else if(eventTmp['miniType'] == SingleBattleEvent.removeCondition){
				let index = this.findIndex(this[currentConditionList], eventTmp['card_effect']);
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
				this.animation(SingleBattlePage.callBack)


			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in ConditionEvent')
			}
		}

		// buff事件监听
		else if(eventTmp['baseType'] == SingleBattleEvent.BuffEvent){
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
			if(eventTmp['miniType'] == SingleBattleEvent.addBuffSuccess){
				// console.log('[##]增加buff成功')
				this[currentBuffList].push(eventTmp['card_effect'])
				this[currentBuffGroup]['visible'] = true;
				this[currentBuffLable].text = 'x' + this[currentBuffList].length;
				this.animation(SingleBattlePage.callBack)
			// 增加buff失败
			}else if(eventTmp['miniType'] == SingleBattleEvent.addBuffFail){
				// console.log('[##]增加buff失败')
				this.animation(SingleBattlePage.callBack);
			// 移除buff
			}else if(eventTmp['miniType'] == SingleBattleEvent.removeBuff){
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
				this.animation(SingleBattlePage.callBack)
			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in BuffEvent')
			}
		}

		// secret事件监听
		else if(eventTmp['baseType'] == SingleBattleEvent.SecretEvent){
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
			if(eventTmp['miniType'] == SingleBattleEvent.addSecretSuccess){
				// console.log('[##]增加secret成功')
				this[currentSecretList].push(eventTmp['card_effect']);
				this[currentSecretGroup].visible = true;
				this[currentSecretLable].text = 'x' + this[currentSecretList].length;
				this.animation(SingleBattlePage.callBack)
			// 增加secret失败
			}else if(eventTmp['miniType'] == SingleBattleEvent.addSecretFail){
				// console.log('[##]增加secret失败')
				this.animation(SingleBattlePage.callBack)

			}else if(eventTmp['miniType'] == SingleBattleEvent.removeSecret){
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
				this.animation(SingleBattlePage.callBack)

			}else{
				console.log('eventTmp: ', eventTmp)
				throw new Error('don not exit right miniType in SecretEvent')
			}
		}

		// 手牌事件监听
		else if(eventTmp['baseType'] == SingleBattleEvent.CardEvent){

			// 抽出所有牌并爆牌，爆掉牌库
			if(eventTmp['miniType'] == SingleBattleEvent.cards999){
				// console.log('[##]抽出所有牌并爆牌，爆掉牌库');
				this.animation(SingleBattlePage.callBack)

			// 弃掉所有手牌
			}else if(eventTmp['miniType'] == SingleBattleEvent.cards_999){
				// console.log('[##]弃掉所有手牌: ');
				this._SelfCardGroup.disAllCard(this.selfCardList);
				this.selfCardList = [];
				egret.Tween.get(this).wait(this.selfCardList.length*500).call(()=>{this.animation(SingleBattlePage.callBack)})
			// 抽牌并置入手牌动画
			}else if(eventTmp['miniType'] == SingleBattleEvent.drawCardSuccess){
				let newCardId = eventTmp['card_effect']['card_id'];
				this._SelfCardGroup.dealCard([newCardId]);
				this.selfCardList.push(newCardId);
				this.cardPoolNumLabel.text = parseInt(this.cardPoolNumLabel.text)+1 + '';
				egret.Tween.get(this).wait(200).call(()=>{this.animation(SingleBattlePage.callBack)})
			// 抽牌并爆牌
			}else if(eventTmp['miniType'] == SingleBattleEvent.drawCardFail){
				let newCardId = eventTmp['card_effect']['card_id'];
				this._SelfCardGroup.dealCardandDestory([newCardId]);
				// egret.Tween.get(this).wait(700).call(()=>{this.animation(SingleBattlePage.callBack)})
				this.animation(SingleBattlePage.callBack);
			// 疲劳
			}else if(eventTmp['miniType'] == SingleBattleEvent.drawNoCardTired){
				this.animation(SingleBattlePage.callBack)
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

	public safeRemove(obj: any, index: number): void {
		let id = this.selfCardList[index];
		this.selfCardList.splice(index, 1);
		// 删除对象
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
		this.removeComponentTween(obj);
		obj = null;
	}

	public safeRemoveAndEmitUseCard(obj: any, index: number): void {
		let id = this.selfCardList[index];
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


	public curWidth(): number {
		return egret.MainContext.instance.stage.stageWidth;
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
		// 音乐返回
		if(UserInfo.soundChannel)
			UserInfo.soundChannel.stop();
		UserInfo.music = RES.getRes("forest_mp3");
  		UserInfo.soundChannel  =  UserInfo.music.play(0, 0);


		// remove reverseBtn
		console.log('this.endTurnBtn: ', this.endTurnBtn);
		this.endTurnGroup.removeChild(this.endTurnBtn);
		this.endTurnBtn.turnOver.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.endTurn, this);
		this.endTurnBtn = null;
		// 移除技能按钮
		this.skillBtn.unusedSkillImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useSkill, this);
		this.skillGroup.removeChild(this.skillBtn);
		this.skillBtn = null;
		// 移除监听
		this.removeEventListener(SingleBattleEvent.SINGLEBATTLEEVENT, this.animation, this);
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
		// 三选一隐藏
		this.ChooseCardGroup.visible = false;
		// gameInfo
		this.gameInfo = null;
		// 释放gamehandle
		this.gameHandle = null;
		// turn num
		this.turnNum = 1;
		// 牌库
		this.cardpool.visible = true;
		// 遮罩
		this.shadeGroup.visible = false;
		this.shadeImg.visible = false;
		// 卡牌归零
		this.selfCardList = [];
		this._SelfCardGroup.release();

	}


}
