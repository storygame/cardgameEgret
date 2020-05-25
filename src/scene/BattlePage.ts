class BattlePage extends eui.Component implements  eui.UIComponent {

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

// 	public closegameReplyData: any;			// closegameReply返回的数据


// 	public constructor() {
// 		super();
// 	}

// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 		// this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
// 		// this.init();
// 	}

// 	protected childrenCreated():void{
// 		super.childrenCreated();
// 		this.init();
// 	}

// 	protected init(){
// 		this.selfRoleImg.texture=RES.getRes("role1_battle_png");
// 		this.enemyRoleImg.texture = RES.getRes("role1_battle_png");
		
// 		this.endTurnBtn.visible = false;
// 		this.endTurnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endTurn, this);
// 		this.initWinFailTieGroup();

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

// 		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
// 	}

// 	public giveUp(){
// 		UserInfo.goBackClicker = 1;
// 		console.log('emit closeGame in battle');
// 		this.FailGroup.visible = true;
// 		this.FailGroup.touchEnabled = true;
// 	}


	public dealEndTurn(data){
// 		this.updateData(data);
// 		if(data['data']['now_turn'] == UserInfo.userid){
// 			var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
// 			SocketAPI.socket.emit('beginTurn', beginTurn);
// 		}
	}

// 	protected endTurn(){
// 		var endTurn  = {session: UserInfo.session, userid: UserInfo.userid};
// 		SocketAPI.socket.emit('endTurn', endTurn);
// 		this.nowTurn = 2;
// 		this.endTurnBtn.visible = false;
// 	}

	public dealReadyGameReply(data){
// 		SceneManager.getInstance().changeScene("battlePage");
// 		console.log('dealReadyGameReply')
// 		if(data['data']['now_turn'] == UserInfo.userid){
// 			this.nowTurn = 1;
// 			var beginTurn  = {session: UserInfo.session, userid: UserInfo.userid};
// 			SocketAPI.socket.emit('beginTurn', beginTurn);
// 			console.log('emit beginturn')
// 			this.endTurnBtn.visible = true;
// 		}else{
// 			this.nowTurn = 2;
// 		}
	}

// 	protected TurnChange(id, oldVal, newVal){
// 		if(newVal == 1){
// 			SocketAPI.socket.emit('beginTurn', {session: UserInfo.session, userid: UserInfo.userid});
// 		}
// 	}

// 	public initWinFailTieGroup(){
// 		this.WinGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.emitCloseGame(), this.WinGroup.visible = false}, this)
// 		this.FailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{this.emitCloseGame(), this.FailGroup.visible = false}, this)
// 		this.TieGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.emitCloseGame(), this.TieGroup.visible = false}, this)
// 		this.balanceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeBackToMachPage, this)
// 	}

	public updateData(data){

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

// 			}else{
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

	}
// 	public EndGame(player){
// 		if(player == 1){
// 			this.addChild(this.WinGroup)
// 			this.WinGroup.visible = true;
// 		}else{
// 			this.addChild(this.FailGroup)
// 			this.FailGroup.visible = true;
// 		}
// 	}

// 	public TieGame(){
// 		this.addChild(this.TieGroup);
// 		this.TieGroup.visible = true;
// 	}

// 	public async emitCloseGame(){
// 		// 双方均已准备好但未开始游戏
// 		SocketAPI.socket.emit('closeGame', {"session":UserInfo.session,"userid":UserInfo.userid})
// 		console.log('emit close game: ',  {"session":UserInfo.session,"userid":UserInfo.userid})
		
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
// 			console.log('删除对方')
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
// 		// for(let i of Cards.cards){
// 		// 	if(i['id'] == cardid){
// 		// 		// console.log('userCard: ', i['description']);
// 		// 		return i['description'];
// 		// 	}
// 		// }
// 		return Cards.cards[cardid]['description']

// 	}

	public async dealCloseGameReply(data){

// 		// 修改状态
// 		// UserInfo.status = 1;
// 		// UserInfo.enemyStatus = 1;

// 		// 隐藏胜利、失败、平局
// 		this.TieGroup.visible = false;
// 		this.WinGroup.visible = false;
// 		this.FailGroup.visible = false;
// 		let oldCoins = UserInfo.coins;
// 		let oldExp = UserInfo.exp;
// 		let oldLevel = UserInfo.level;
// 		var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
// 		UserInfo.updateUserInfo(loginReply);
// 		let coinText = '+ ' + String(UserInfo.coins - oldCoins)
// 		this.Coins.text = coinText;

// 		let expTEXT = '+ ' + String(UserInfo.exp - oldExp)
// 		this.Exp.text = expTEXT;

// 		let LevelTExt = '+ ' + String(UserInfo.level - oldLevel)
// 		this.Lv.text = LevelTExt;
		
// 		this.addChild(this.balanceGroup)
// 		this.balanceGroup.visible = true;
// 		this.closegameReplyData = data;
// 		UserInfo.session = data["data"]["game_info"]["session"];
// 		console.log('UserInfo.session: ', UserInfo.session)
	}

// 	public changeBackToMachPage(){
// 		SceneManager.getInstance().changeScene('matchPage');
// 		SceneManager.getInstance().matchPage.getMatchAgain(this.closegameReplyData);
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
// function IsFinished(game_info) {
//     let finished = false;
//     let winner, winner_serial_number;
//     if (game_info["game_status"] !== undefined && game_info["game_status"]['FINISHED'] !== undefined) {
//       //有胜者
//       winner = game_info["game_status"]['FINISHED'];
//       if (winner['id'] == game_info["player1"]['id']) {

//         winner_serial_number = 1;
//       } else {

//         winner_serial_number = 2;
//       }
//       return winner;
//     }
//     if (game_info["player1"]["cute_value"] >= 40 && game_info["player2"]["cute_value"] < 40) {
//       winner = game_info["player2"];
//       winner_serial_number = 2;
//       game_info["game_status"]['FINISHED'] = winner;
//       return winner;
//     }
//     if (game_info["player2"]["cute_value"] >= 40 && game_info["player1"]["cute_value"] < 40) {
//       winner = game_info["player1"];
//       winner_serial_number = 1;
//       game_info["game_status"]['FINISHED'] = winner;
//       return winner;
//     }
//     //无胜利者
//     //检查平局
//     if ((game_info["player1"]["cute_value"] >= 40 && game_info["player2"]["cute_value"] >= 40) || game_info['turns'] > 60) {
//       return 'tie';
//     }
//     return false;
//   }

// function watchTurn(onChange?: any | Function | String){

//     if (onChange == null){
//         return;
//     }
//     return (target: any, propertyKey: string) => {
//         //get方法
//         var key = "_" + propertyKey;
//         var get;
//         get = function () { return this[key]; };
//         //set方法
//         var set;
//         set = function (value){
//             if (this[key] === value)
//                 return;
//             var oldValue = this[key];
//             this[key] = value;
//             //回调方法
//             var type = typeof onChange;
//             if (type == "function"){
//                 onChange(propertyKey, oldValue, this[key]);
//             } else if (type == "string" && this[onChange] != null){
//                 this[onChange](propertyKey, oldValue, this[key]);
//             } else{
//                 console.log("watch:类" + target.constructor.name + "不存在方法：" + onChange);
//             }
//         }
//         //属性设置
//         Object.defineProperty(target, propertyKey, {
//             get: get,
//             set: set,
//             enumerable: true,
//             configurable: true
//         });
//     }
}
