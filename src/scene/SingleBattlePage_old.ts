// class SingleBattlePage_old extends eui.Component implements  eui.UIComponent {

// 	public background:eui.Image;
// 	public selfRoleImg:eui.Image;
// 	public enemyRoleImg:eui.Image;
// 	public CardList1: any[] = [];
// 	public CardValue2: number;
// 	public CardList2: any[] = [];
// 	public CardInstanceList1: any[] = [];
// 	public CardInstanceList2: any[] = [];
// 	// public buff_list1: any[] = [];
// 	// public buff_list2: any[] = [];
// 	// public condition1: any[] = [];
// 	// public condition2: any[] = [];
// 	public HP_value1:eui.Label;
// 	public HP_value2:eui.Label;
// 	public mana_value1:eui.Label;
// 	public mana_value2:eui.Label;
// 	public protect_value1:eui.Label;
// 	public protect_value2:eui.Label;
// 	public endTurnBtn:eui.Image;
// 	public useCardRemark:eui.Label;
// 	public WinGroup:eui.Group;
// 	public FailGroup:eui.Group;		//失败
// 	public TieGroup:eui.Group;		//平局
// 	public balanceGroup:eui.Group;	//结算界面
// 	public balancePannel:eui.Group;	//结算pannel
// 	public Coins:eui.Label;
// 	public Exp:eui.Label;
// 	public Lv:eui.Label;

// 	// 放弃战斗按钮
// 	public backBtn:eui.Button;

// 	public scene: number;
// 	// @watchTurn('TurnChange')
// 	public nowTurn: number = 0;
// 	//1 当前玩家 2 对方玩家
// 	public Buff1:eui.Button;
// 	public Buff2:eui.Button;
// 	public Condiction1:eui.Button;
// 	public Condiction2:eui.Button;

// 	public BuffList1: any[] = [];
// 	public BuffList2: any[] = [];

// 	public BuffInstanceList1: any[] = [];
// 	public BuffInstanceList2: any[] = [];


// 	public CondPrivateList1: any[] = [];
// 	public CondPrivateList2: any[] = [];
// 	public CondProvateInstanceList1: any[] = [];
// 	public CondProvateInstanceList2: any[] = [];

// 	public CondPublicList1: any[] = [];
// 	public CondPublicList2: any[] = [];
// 	public CondPublicInstanceList1: any[] = [];
// 	public CondPublicInstanceList2: any[] = [];

// 	public usedCardNum = 0;

// 	public EnemyCardGroup:eui.Group;
// 	public SelfCardGroup:eui.Group;
// 	public ChooseCardGroup:eui.Group;
// 	public ChooseCardBackGround:eui.Image;
// 	public choose_card1:eui.Image;
// 	public choose_card2:eui.Image;
// 	public choose_card3:eui.Image;

// 	public gameFinished: boolean = false;


// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 	}

// 	protected childrenCreated():void{
// 		super.childrenCreated();
// 		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
// 		this.init();
		
// 		this.addLinsters();
// 	}

// 	protected init(){
	
// 		// let x=Math.ceil(Math.random()*10);
// 		// if(x>=10){x=7;}
// 		// this.enemyRoleImg.source = "resource/test/头像"+String(x)+".png";
// 		// x=Math.ceil(Math.random()*10);
// 		// if(x>=10){x=7;}
// 		// this.selfRoleImg.source = "resource/test/头像"+String(x)+".png";
// 		this.endTurnBtn.visible = false;
// 		// this.initWinFailTieGroup();

// 		var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
//         hLayout.gap = -15;
//         hLayout.paddingTop = 10;
//         hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
//         this.SelfCardGroup.layout = hLayout;

// 		var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
//         hLayout.gap = -18;
//         hLayout.paddingTop = 0;
//         hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
//         this.EnemyCardGroup.layout = hLayout;

// 		this.gameFinished = false;
// 		this.initElement();
// 	}

// 	public addLinsters(){
// 		// 为胜利、失败、平局页面监听点击事件
// 		this.initWinFailTieGroup();

// 		//为3选1图片监听点击事件
// 		this.choose_card1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCardClick, {this:this,value:1});
// 		this.choose_card2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCardClick, {this:this,value:2});
// 		this.choose_card3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCardClick, {this:this,value:3});

// 		this.endTurnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endTurn, this);

// 		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
// 	}

// 	// 为第二次打开进行刷新、隐藏组件
// 	public initElement(){
// 		this.balanceGroup.visible = false;
// 		this.TieGroup.visible = false;
// 		this.WinGroup.visible = false;
// 		this.FailGroup.visible = false;
// 		this.ChooseCardGroup.visible = false;
// 	}

// 	public ShowChooseCardPanel(){
// 		let tmp_chapter = Chapter.deLevel(UserInfo.tmp_level);
// 		let chapterInfo=Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]);
// 		console.log("[*]检查一般卡牌奖励",chapterInfo["generalCardAward"]);
// 		if(chapterInfo["generalCardAward"].length>0){
// 			//可以进行三选一
// 			//显示3选1框体.
// 			//根据关卡难度选择三张卡牌显示
// 			let monster = chapterInfo["ai"];
// 			let monsterinfo=Monster.getMonster(monster);
// 			let level=0;
// 			switch(monsterinfo["type"]){
// 				case "兵":level=0;break;
// 				case "士":level=1;break;
// 				case "将":level=2;break;
// 				case "相":level=3;break;
// 				default:level=0;
// 			}
// 			let award1 = this.generateCardByLevel(level);
// 			this.choose_card1.name = award1["id"];
// 			this.choose_card1.texture=RES.getRes("汤圆_png");

// 			let award2 = this.generateCardByLevel(level);
// 			this.choose_card2.name = award2["id"];
// 			this.choose_card2.texture=RES.getRes("汤圆_png");

// 			let award3 = this.generateCardByLevel(level);
// 			this.choose_card3.name = award3["id"];
// 			this.choose_card3.texture=RES.getRes("汤圆_png");

// 			this.ChooseCardGroup.visible = true;
// 		}
// 		return ;
// 	}

// 	public generateCardByLevel(level:number){
// 		function RandomNum(Min, Max) {
//      		 var Range = Max - Min;
//       		var Rand = Math.random();
//       		var num = Min + Math.floor(Rand * Range); //舍去
//      	 return num;
// 		}
// 		let prob=[];
// 		prob[0] = [0.7,0.95,0.99,1];
// 		prob[1]= [0.4,0.9,0.96,1];
// 		prob[2]= [0.3,0.7,0.9,1];
// 		prob[3]= [0,0.3,0.7,1];
// 		if(level<0 || level>3){
// 			console.log("[*]根据难度随机生成3选1卡牌时传入错误难度",level)
// 			return null
// 		};
// 		let probUse = prob[level];
// 		let typeRand = Math.random();
// 		if(typeRand<probUse[0])
// 		{
// 			//选择N卡
// 			let c=RandomNum(0,Cards.cardsRareMap["N"].length)
// 			return Cards.cardsRareMap["N"][c];
// 		}else if(typeRand>=probUse[0] && typeRand<probUse[1]){
// 			//选择R卡
// 			let c=RandomNum(0,Cards.cardsRareMap["R"].length)
// 			return Cards.cardsRareMap["R"][c];
// 		}else if(typeRand>=probUse[1] && typeRand<probUse[2]){
// 			//选择SR卡
// 			let c=RandomNum(0,Cards.cardsRareMap["SR"].length)
// 			return Cards.cardsRareMap["SR"][c];
// 		}else if(typeRand>=probUse[2] && typeRand<probUse[3]){
// 			//选择SSR卡
// 			let c=RandomNum(0,Cards.cardsRareMap["SSR"].length)
// 			return Cards.cardsRareMap["SSR"][c];
// 		}
// 	}
	
// 	public chooseCardClick(e,self){
// 		//关闭选卡界面，发送选卡请求,等待打开结算界面
// 		self = this;
// 		let v = self.value;
		
// 		self.this.ChooseCardGroup.visible = false;
// 		let cardid=-1;
// 		switch(v){
// 			case 1:cardid=parseInt(self.this.choose_card1.name);break;
// 			case 2:cardid=parseInt(self.this.choose_card2.name);break;
// 			case 3:cardid=parseInt(self.this.choose_card3.name);break;
// 		}
// 		var chooseCard  = {session: UserInfo.session, userid: UserInfo.userid, choice: cardid};
// 		SocketAPI.socket.emit('chooseCard', chooseCard);
// 	}

// 	public dealchooseCardReply(data){
// 		if(data["errno"]==0){
// 			//添加成功,调用closeGame,收到回复后会显示结算框体
// 			var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
// 		    SocketAPI.socket.emit('closeGame', closeGame);
// 			console.log('emit closeGame in dealchooseCardReply');
// 		}else{
// 			console.log("[*]Error: 3选1时添加卡牌失败:",data["errmsg"]);
// 		}
// 		UserInfo.adventureStatus= false;
// 	}

// 	public giveUp(){
// 		this.FailGroup.visible = true;
// 		this.FailGroup.touchEnabled = true;
// 	}


// 	public dealEndTurn(data){		
// 		this.updateData(data);
// 		if(this.gameFinished == false){
// 			if(data['data']['now_turn'] ==   UserInfo.userid){
// 				var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
// 				SocketAPI.socket.emit('beginTurn', beginTurn);
// 			}
// 		}
		
// 	}

// 	protected endTurn(){
// 		var endTurn  = {session: UserInfo.session, userid: UserInfo.userid};
// 		SocketAPI.socket.emit('endTurn', endTurn);
// 		this.nowTurn = 2;
// 		this.endTurnBtn.visible = false;
// 	}

// 	public dealReadyGameReply(data){
// 		SceneManager.getInstance().changeScene("singleBattlePage");
// 		if(data['data']['now_turn'] == UserInfo.userid){
// 			this.nowTurn = 1;
// 			var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
// 			SocketAPI.socket.emit('beginTurn', beginTurn);
// 			console.log('emit beginturn')
// 			this.endTurnBtn.visible = true;
// 		}else{
// 			this.nowTurn = 2;
// 		}
// 	}

// 	protected TurnChange(id, oldVal, newVal){
// 		if(newVal == 1){
// 			SocketAPI.socket.emit('beginTurn', {session: UserInfo.session, userid: UserInfo.userid});
// 		}
// 	}

// 	public initWinFailTieGroup(){
// 		this.WinGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{UserInfo.WinSingleGame = false; this.ShowChooseCardPanel(); this.WinGroup.visible = false}, this)
// 		this.FailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{this.dealFailGame()}, this)
// 		this.TieGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.dealTieGame()}, this)
// 		this.balanceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{SceneManager.getInstance().changeScene('storyGamePage')}, this)
// 	}

// 	public dealFailGame(){
// 		this.FailGroup.visible = false;
// 		UserInfo.WinSingleGame = false;
// 		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
// 		SocketAPI.socket.emit('closeGame', closeGame);
// 		console.log('emit closeGame in dealFailGame');
// 	}

// 	public dealTieGame(){
// 		this.TieGroup.visible = false;
// 		UserInfo.WinSingleGame = false;
// 		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:0};
// 		SocketAPI.socket.emit('closeGame', closeGame);
// 		console.log('emit closeGame in dealTieGame');

// 	}

// 	public updateData(data){

// 		if(data['errno'] == 0){

// 			if(data['data']["player1"]["status"] != 3 || data['data']["player2"]["status"] != 3){
// 				console.log('status 错误')
// 				console.log('含错误status的data：', data);
// 				return;
// 			}

// 			let player1 = UserInfo.self_player;
// 			let player2 = UserInfo.enemy_player;
// 			this.CardList1 = data["data"][player1]["cards_list"];
// 			this.HP_value1.text = data["data"][player1]["cute_value"];
// 			this.mana_value1.text = data["data"][player1]["star_value"];
// 			this.protect_value1.text = data["data"][player1]["protect_value"];
// 			this.CardList2 = data["data"][player2]["cards_list"];
// 			this.CardValue2 = data["data"][player2]["cards_value"];
// 			this.HP_value2.text = data["data"][player2]["cute_value"];
// 			this.mana_value2.text = data["data"][player2]["star_value"];
// 			this.protect_value2.text = data["data"][player2]["protect_value"];
// 			this.loadCard();
// 			this.BuffList1 = data['data'][player1]['buff_list'];
// 			this.BuffList2 = data['data'][player2]['buff_list'];
// 			this.loadBuff();
// 			this.CondPrivateList1 = data['data'][player1]['secret_condition_list'];
// 			this.CondPrivateList2 = data['data'][player2]['secret_condition_list'];
// 			this.loadPrivateCond();
// 			this.CondPublicList1 = data['data'][player1]['condition_list'];
// 			this.CondPublicList2 = data['data'][player2]['condition_list'];
// 			this.loadPublicCond();

// 			if(data["data"]['now_turn'] != UserInfo.userid){
// 				for(let i = 0; i < this.CardList1.length; i++){
// 					this.CardInstanceList1[i].touchEnabled = false;
// 				}
// 				this.endTurnBtn.touchEnabled = false;
// 				this.endTurnBtn.visible = false;
// 				var last_card = data['data']['last_card']
// 				var label
// 				if(last_card['pointer'] == undefined && last_card['condition'] == undefined){

// 				}else{
// 					if(last_card['source'] == UserInfo.enemy_player.charAt( UserInfo.enemy_player.length-1)){

// 						if(last_card['condition'] != undefined && last_card['condition']['secret'] == true){
// 							label = new eui.Label();
// 							label.text = '奥秘卡'
// 							label.textColor = 0x000000;
// 							label.x = 300;
// 							label.y = 120;
// 							this.addChild(label)
// 							let self = this
// 							setTimeout(function() {
// 								label.visible = false
// 								self.removeChild(label)
// 							}, 3000);
// 						}else{
// 							label = PublicMethod.creadCardById(last_card['card_id'])
// 							label.scaleX = 0.5
// 							label.scaleY = 0.5
// 							this.usedCardNum += 1;
// 							label.x = 200 + (125*(this.usedCardNum-1));
// 							// console.log('this.usedCardNum: ', this.usedCardNum)
// 							// console.log('300 + (150*this.usedCardNum-1): ', 300 + (150*this.usedCardNum-1))
// 							// console.log('label.x: ', label.x)
// 							label.y = 170;
// 							if(this.usedCardNum > 10){
// 								label.y = 230
// 							}
// 							this.addChild(label)
// 							let self = this
// 							setTimeout(function() {
// 								label.visible = false
// 								self.removeChild(label)
// 								self.usedCardNum -= 1;
// 							}, 3000);
// 						}
						
// 					}
// 				}

// 			}else{
// 				this.endTurnBtn.touchEnabled = true;
// 				this.endTurnBtn.visible = true;
// 			}
// 			let finishedFlag = IsFinished(data['data'])
// 			if(finishedFlag == false){
// 				this.gameFinished = false;
// 			}else{
// 				this.gameFinished = true;
// 				if(finishedFlag == 'tie'){
// 					this.TieGame();
// 				}else{
// 					if(finishedFlag['id'] == UserInfo.userid){
// 						this.EndGame(1);
// 					}else{
// 						this.EndGame(2)
// 					}
// 				}
// 			}
// 		}else{
// 			console.log('error !!!')
// 		}

// 	}

// 	public EndGame(player){
// 		if(player == 1){
// 			this.WinGroup.visible = true;
// 		}else{
// 			this.FailGroup.visible = true;
// 		}
// 	}

// 	public TieGame(){
// 		this.TieGroup.visible = true;
// 	}


// 	public async dealCloseGameReply(){
// 		// 显示结算
// 		let oldCoins = UserInfo.coins;
// 		let oldExp = UserInfo.exp;
// 		let oldLevel = UserInfo.level;
// 		var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
		
// 		UserInfo.updateCoins(loginReply['data']['userinfo'][0]['coins'])
// 		let coinText = '+ ' + String(UserInfo.coins - oldCoins)
// 		this.Coins.text = coinText;

// 		UserInfo.updateExp(loginReply['data']['userinfo'][0]['coins']);
// 		let expTEXT = '+ ' + String(UserInfo.exp - oldExp)
// 		this.Exp.text = expTEXT;

// 		let LevelTExt = '+ ' + String(UserInfo.level - oldLevel)
// 		this.Lv.text = LevelTExt;
		
// 		this.addChild(this.balanceGroup)
// 		this.balanceGroup.visible = true;

// 	}
	
// 	public loadCard(){
// 		this.SelfCardGroup.removeChildren();
// 		for(let i = 0; i < this.CardInstanceList1.length; i++){
// 			this.CardInstanceList1[i].visible = false;
// 		}
// 		// for(let i = 0; i < this.CardInstanceList2.length; i++){
// 		// 	this.CardInstanceList2[i].visible = false;
// 		// }
// 		this.CardInstanceList1 = [];
// 		var distance = 900;
// 		var eachLength1 = distance/this.CardList1.length
// 		for(let i = 0; i < this.CardList1.length; i++){

// 			var card = PublicMethod.creadCardById(this.CardList1[i]['id'])
// 			// card.scaleX = (eachLength1-20)/card.width
// 			// card.scaleY = (eachLength1-20)/card.width
// 			// card.x = eachLength1*i;
// 			// card.y = 620-200;
// 			card.scaleX = 0.5
// 			card.scaleY = 0.5
// 			if(i == 0){
// 				card.horizontalCenter = 0;
// 				card.verticalCenter = 0;
// 			}else{
// 				card.top = 10;
// 				card.left = 20;
// 			}
// 			card.touchEnabled = true;
// 			this.SelfCardGroup.addChild(card);
// 			this.CardInstanceList1.push(card);
// 			card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useCard.bind(this, i, this.CardInstanceList1), this);
// 		}

// 		var eachLength2 = distance/this.CardValue2;
// 		/*for(let i = 0; i < this.CardValue2; i++){

// 			var Card = new eui.Image();
// 			Card.texture = RES.getRes('卡背_png')
// 			// Card.x = eachLength2*i + 200;
// 			// Card.y = -50;
// 			if(i == 0){
// 				card.horizontalCenter = 0;
// 				card.verticalCenter = 0;
// 			}else{
// 				card.top = 20;
// 				card.left = 20;
// 			}
// 			let oldwidth = Card.width
// 			Card.width = eachLength2-20;
// 			Card.height = Card.width/oldwidth * Card.height;
// 			Card.touchEnabled = false;
// 			this.EnemyCardGroup.addChild(Card);
// 			this.CardInstanceList2.push(Card);
// 		}*/
// 		if(this.CardList2.length == this.CardValue2){
// 			this.EnemyCardGroup.removeChildren();
// 			for(let i = 0; i < this.CardInstanceList2.length; i++){
// 				this.CardInstanceList2[i].visible = false;
// 			}
// 			this.CardInstanceList2 = [];
// 			for(let i = 0; i < this.CardValue2; i++){
// 				var card = PublicMethod.creadCardById(this.CardList2[i]['id'])
// 				card.scaleX = 0.5
// 				card.scaleY = 0.5
// 				if(i == 0){
// 					card.horizontalCenter = 0;
// 					card.verticalCenter = 0;
// 				}else{
// 					card.top = 10;
// 					card.left = 15;
// 				}
// 				card.touchEnabled = true;
// 				this.EnemyCardGroup.addChild(card);
// 				this.CardInstanceList2.push(card);
// 			}
// 		}
// 		// else{
// 			// for(let i = 0; i < this.CardValue2; i++){
// 			// 	var Card = new eui.Image();
// 			// 	Card.texture = RES.getRes('卡背_png')
// 			// 	if(i == 0){
// 			// 		card.horizontalCenter = 0;
// 			// 		card.verticalCenter = 0;
// 			// 	}else{
// 			// 		card.top = 10;
// 			// 		card.left = 20;
// 			// 	}
// 			// 	// Card.width = eachLength2-20;
// 			// 	// Card.height = Card.width/oldwidth * Card.height;
// 			// 	Card.scaleX = 20/card.width;
// 			// 	Card.scaleY = 20/card.width;
// 			// 	Card.touchEnabled = false;
// 			// 	this.EnemyCardGroup.addChild(Card);
// 			// 	this.CardInstanceList2.push(Card);
// 			// }
// 		// }

// 	}

// 	public loadBuff(){
// 		for(let i = 0; i < this.BuffInstanceList1.length; i++){
// 			this.BuffInstanceList1[i].visible = false;
// 			this.removeChild(this.BuffInstanceList1[i]);
// 		}
// 		for(let i = 0; i < this.BuffInstanceList2.length; i++){
// 			this.BuffInstanceList2[i].visible = false;
// 			this.removeChild(this.BuffInstanceList2[i]);
// 		}
// 		this.BuffInstanceList1 = [];
// 		this.BuffInstanceList2 = [];
// 		var distance = 150;
// 		var eachLength1 = distance/ this.BuffList1.length;
// 		for(let i = 0; i < this.BuffList1.length; i++){
// 			let txt1: eui.Label = new eui.Label;
// 			txt1.visible = false;
// 			txt1.text = this.getDescription(this.BuffList1[i]['card_id']);
// 			txt1.x = 300;
// 			txt1.y = 120;
// 			txt1.textColor = 0x000000;
// 			txt1.bold = true;	txt1.size = 30;
// 			this.addChild(txt1);
// 			let txt2: eui.Label = new eui.Label;
// 			txt2.visible = false;
// 			txt2.text = this.BuffList1[i]['extra_turn'];
// 			txt2.x = 300;
// 			txt2.y = 150;
// 			txt2.bold = true;	txt2.size = 30;
// 			txt2.textColor = 0x000000;
// 			this.addChild(txt2);
// 			let img = new eui.Image();
// 			img.texture = RES.getRes('BUFF_png');
// 			img.touchEnabled = true;
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt1.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt1.visible = false}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt2.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt2.visible = false}, this);
// 			img.x = 900 + eachLength1*i;
// 			img.y = 350
// 			img.width = 25;
// 			img.height = 25;
// 			this.addChild(img);
// 			this.BuffInstanceList1.push(img)
// 		}
// 		var eachLength2 = distance/this.BuffList2.length;
// 		for(let i = 0; i < this.BuffList2.length; i++){
// 			let txt1: eui.Label = new eui.Label;
// 			txt1.visible = false;
// 			txt1.text = this.getDescription(this.BuffList2[i]['card_id']);
// 			txt1.x = 300;
// 			txt1.y = 120;
// 			txt1.bold = true;	txt1.size = 30;
// 			txt1.textColor = 0x000000;
// 			this.addChild(txt1);
// 			let txt2: eui.Label = new eui.Label;
// 			txt2.visible = false;
// 			txt2.text = this.BuffList2[i]['extra_turn'];
// 			txt2.x = 300;
// 			txt2.y = 150;
// 			txt2.textColor = 0x000000;
// 			txt2.bold = true;	txt2.size = 30;
// 			this.addChild(txt2);
// 			let img = new eui.Image();
// 			img.texture = RES.getRes('BUFF_png');
// 			img.touchEnabled = true;
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt1.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt1.visible = false}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt2.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt2.visible = false}, this);
// 			img.x = 80 + eachLength2*i;
// 			img.y = 260;
// 			img.width = 25;
// 			img.height = 25;
// 			this.addChild(img);
// 			this.BuffInstanceList2.push(img);
// 		}
// 	}

// 	public loadPrivateCond(){
// 		for(let i = 0; i < this.CondProvateInstanceList1.length; i++){
// 			this.CondProvateInstanceList1[i].visible = false;
// 			this.removeChild(this.CondProvateInstanceList1[i]);
// 		}
// 		for(let i = 0; i < this.CondProvateInstanceList2.length; i++){
// 			this.CondProvateInstanceList2[i].visible = false;
// 			this.removeChild(this.CondProvateInstanceList2[i]);
// 		}
// 		this.CondProvateInstanceList1 = [];
// 		this.CondProvateInstanceList2 = [];
// 		var distance = 150;
// 		var eachLength1 = distance/ this.CondPrivateList1.length;
// 		for(let i = 0; i < this.CondPrivateList1.length; i++){
// 			let txt1: eui.Label = new eui.Label;
// 			txt1.visible = false;
// 			txt1.text = this.getDescription(this.CondPrivateList1[i]['card_id']);
// 			txt1.x = 300;
// 			txt1.y = 120;
// 			txt1.textColor = 0x000000;
// 			txt1.bold = true;	txt1.size = 30;
// 			this.addChild(txt1);
// 			let txt2: eui.Label = new eui.Label;
// 			txt2.visible = false;
// 			txt2.text = this.CondPrivateList1[i]['extra_turn'];
// 			txt2.x = 300;
// 			txt2.y = 150;
// 			txt2.bold = true;	txt2.size = 30;
// 			txt2.textColor = 0x000000;
// 			this.addChild(txt2);
// 			let img = new eui.Image();
// 			img.texture = RES.getRes('奥秘_png');
// 			img.touchEnabled = true;
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt1.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt1.visible = false}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt2.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt2.visible = false}, this);
// 			img.x = 900 + eachLength1*i;
// 			img.y = 320
// 			img.width = 25;
// 			img.height = 25;
// 			this.addChild(img);
// 			this.CondProvateInstanceList1.push(img)
// 		}
// 		var eachLength2 = distance/this.CondPrivateList2.length;
// 		for(let i = 0; i < this.CondPrivateList2.length; i++){
// 			let txt1: eui.Label = new eui.Label;
// 			txt1.visible = false;
// 			txt1.text = '奥秘卡'
// 			txt1.x = 300;
// 			txt1.y = 120;
// 			txt1.bold = true;	txt1.size = 30;
// 			txt1.textColor = 0x000000;
// 			this.addChild(txt1);
// 			let img = new eui.Image();
// 			img.texture = RES.getRes('奥秘_png');
// 			img.touchEnabled = true;
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt1.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt1.visible = false}, this);
// 			img.x = 80 + eachLength2*i;
// 			img.y = 290;
// 			img.width = 25;
// 			img.height = 25;
// 			this.addChild(img);
// 			this.CondProvateInstanceList2.push(img);
// 		}
// 	}

// 	public loadPublicCond(){
// 		for(let i = 0; i < this.CondPublicInstanceList1.length; i++){
// 			this.CondPublicInstanceList1[i].visible = false;
// 			this.removeChild(this.CondPublicInstanceList1[i]);
// 		}
// 		for(let i = 0; i < this.CondPublicInstanceList2.length; i++){
// 			this.CondPublicInstanceList2[i].visible = false;
// 			this.removeChild(this.CondPublicInstanceList2[i]);
// 		}
// 		this.CondPublicInstanceList1 = [];
// 		this.CondPublicInstanceList2 = [];
// 		var distance = 150;
// 		var eachLength1 = distance/ this.CondPublicList1.length;
// 		for(let i = 0; i < this.CondPublicList1.length; i++){
// 			let txt1: eui.Label = new eui.Label;
// 			txt1.visible = false;
// 			txt1.text = this.getDescription(this.CondPublicList1[i]['card_id']);
// 			txt1.x = 300;
// 			txt1.y = 120;
// 			txt1.textColor = 0x000000;
// 			txt1.bold = true;	txt1.size = 30;
// 			this.addChild(txt1);
// 			let txt2: eui.Label = new eui.Label;
// 			txt2.visible = false;
// 			txt2.text = this.CondPublicList1[i]['extra_turn'];
// 			txt2.x = 300;
// 			txt2.y = 150;
// 			txt2.textColor = 0x000000;
// 			txt2.bold = true;	txt2.size = 30;
// 			this.addChild(txt2);
// 			let img = new eui.Image();
// 			img.texture = RES.getRes('CONDITION_png');
// 			img.touchEnabled = true;
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt1.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt1.visible = false}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt2.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt2.visible = false}, this);
// 			img.x = 900 + eachLength1*i;
// 			img.y = 290
// 			img.width = 25;
// 			img.height = 25;
// 			this.addChild(img);
// 			this.CondPublicInstanceList1.push(img)
// 		}
// 		var eachLength2 = distance/this.CondPublicList2.length;
// 		for(let i = 0; i < this.CondPublicList2.length; i++){
// 			let txt1: eui.Label = new eui.Label;
// 			txt1.visible = false;
// 			txt1.text = this.getDescription(this.CondPublicList2[i]['card_id']);
// 			txt1.x = 300;
// 			txt1.y = 120;
// 			txt1.textColor = 0x000000;
// 			txt1.bold = true;	txt1.size = 30;
// 			this.addChild(txt1);
// 			let txt2: eui.Label = new eui.Label;
// 			txt2.visible = false;
// 			txt2.text = this.CondPublicList2[i]['extra_turn'];
// 			txt2.x = 300;
// 			txt2.y = 150;
// 			txt2.textColor = 0x000000;
// 			txt2.bold = true;	txt2.size = 30;
// 			this.addChild(txt2);
// 			let img = new eui.Image();
// 			img.texture = RES.getRes('CONDITION_png');
// 			img.touchEnabled = true;
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt1.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt1.visible = false}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt2.visible = true}, this);
// 			img.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt2.visible = false}, this);
// 			img.x = 80 + eachLength2*i;
// 			img.y = 320;
// 			img.width = 25;
// 			img.height = 25;
// 			this.addChild(img);
// 			this.CondPublicInstanceList2.push(img);
// 		}
// 	}

// 	protected useCard(index, CardInstanceList){
// 		var btn = CardInstanceList[index];
// 		if(btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
// 			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useCard,this);
// 		}
// 		let cardId = this.CardList1[index]['id']
// 		console.log('this.CardList1: ', this.CardList1)
// 		if(this.CardList1[index]["effect"]["card_cost"] > parseInt(this.mana_value1.text)){
// 			this.useCardRemark.visible = true;
// 			let self = this
// 			setTimeout(function(){
// 				self.useCardRemark.visible = false;
// 			}, 3000);
// 		}else{
// 			var useCard  = {session: UserInfo.session, userid: UserInfo.userid, card_index: index};
// 			SocketAPI.socket.emit('useCard', useCard);
// 			console.log('use Card: ', this.getDescription(cardId))

// 		}
// 	}

// 	/*protected showCondiction(game_info){
// 		this.CondList1 = [];
// 		this.CondList2 = [];
// 		let cond_list = game_info['condition']
// 		let cond_list1 = game_info['condition1']
// 		let cond_list2 = game_info['condition2']
// 		for(let i = 0; i < cond_list.length; i++){
// 			var judge = this.getBuffVictim(cond_list[i], game_info);
// 			let txt: eui.Label = new eui.Label;
// 			txt.visible = false;
// 			txt.text = this.getDescription(cond_list[i]['card_id']);
// 			this.addChild(txt);
// 			if(judge[0]){
// 				let btn1: eui.Button = new eui.Button;
// 				btn1.touchEnabled = true;
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt.visible = true}, this);
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt.visible = false}, this);
// 				let btn2: eui.Button = new eui.Button;
// 				btn2.touchEnabled = true;
// 				btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt.visible = true}, this);
// 				btn2.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt.visible = false}, this);
// 				this.BuffList1.push(btn1);
// 				this.BuffList2.push(btn2);
// 			}
// 			if(judge[1]){
// 				let btn1: eui.Button = new eui.Button;
// 				btn1.touchEnabled = true;
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt.visible = true}, this);
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt.visible = false}, this);
// 				btn1.label = 'R';
// 				let btn2: eui.Button = new eui.Button;
// 				btn2.touchEnabled = true;
// 				btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt.visible = true}, this);
// 				btn2.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt.visible = false}, this);
// 				btn1.label = 'R';
// 				this.BuffList1.push(btn1);
// 				this.BuffList2.push(btn2);
// 			}
// 			if(judge[2] == UserInfo.self_player){
// 				let btn1: eui.Button = new eui.Button;
// 				btn1.touchEnabled = true;
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt.visible = true}, this);
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt.visible = false}, this);
// 				this.BuffList1.push(btn1);
// 			}
// 			if(judge[2] == UserInfo.enemy_player){
// 				let btn1: eui.Button = new eui.Button;
// 				btn1.touchEnabled = true;
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{txt.visible = true}, this);
// 				btn1.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{txt.visible = false}, this);
// 				this.BuffList2.push(btn1);
// 			}
// 		}
// 	}*/

// 	protected getDescription(cardid){
		
// 		for(let i of Cards.cards){
// 			if(i['id'] == cardid){
// 				// console.log('userCard: ', i['description']);
				
// 				console.log('222333');
// 				return i['description'];
// 			}
// 		}
// 		console.log('find card: ', cardid)
// 		console.log('Cards.card: ', Cards.cards)
// 		console.log('cna\'t find this catd')

// 	}

	
// 	public async choose1In3(){

// 	}

// 	/*protected getBuffVictim(card_effect, game_info){
// 		let TwoAim = false; //两个目标结算
//     	let RandomAim = false; //随机目标结算
//     	let playerAim, playerAimNum;
// 		let c = card_effect; //card_effect的缩写
//     	//pointer合法检查和目标确认
// 		if (c['pointer'] < 0 || c['pointer'] > 4) {
// 			console.log("[*] Error: c['pointer'] < 0 || c['pointer'] > 4.");
// 			return game_info;
// 		}
// 		if (c['pointer'] == 0) {
// 			console.log("[*] Error: c['pointer'] == 0.");
// 			return game_info;
// 		}
// 		if (c['pointer'] == 3) {
// 			TwoAim = true;
// 		}
// 		if (c['pointer'] == 4) {
// 			RandomAim = true;
// 		}
//     	if (RandomAim == false && TwoAim == false) {
//       		if (c['source'] == 1) {
//         		if (c['pointer'] == 1) {
// 					//对己方生效
// 					playerAimNum = 1;
// 					playerAim = "player1";
//         		} else if (c['pointer'] == 2) {
// 					//对对方生效
// 					playerAimNum = 2;
// 					playerAim = "player2";
//        			}
//       		} else{
//       			if (c['source'] == 2) {
// 					if (c['pointer'] == 1) {
// 						//对己方生效
// 						playerAimNum = 2;
//           				playerAim = "player2";
//         			} else if (c['pointer'] == 2) {
// 						//对对方生效
// 						playerAimNum = 1;
// 						playerAim = "player1";
//         			}
//       			} else {
//         			console.log("[*] Error: card source is invalid", c['source']);
//       			}
//     		}

// 		}
// 		return [TwoAim, RandomAim, playerAim];
// 	}*/


// }
