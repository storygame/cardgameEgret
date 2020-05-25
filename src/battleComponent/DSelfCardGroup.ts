class DSelfCardGroup {
	public constructor(doubleBattlePage: DoubleBattlePage) {
		this.CardGruop = doubleBattlePage["selfCardGruop"];
		this.Special = doubleBattlePage["Special"];

		this.init();
	}

	public CardGruop: eui.Group;
	public Special: eui.Group;
	private timer: egret.Timer;
	public Cararray: Array<CardView> = [];
	public _CardView: CardView;
	public _CardId: number;		//当前id
	private oPoint: egret.Point = 
		this.oPoint = new egret.Point(300, 500);
	private radius: number = 400;
	public messagequeue: Array<any> = [];
	public messagbool: boolean = true;
	public disCardIdList = [];			// 要踢出的卡牌的id队列
	
	public init() {
		this.CardGruop.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TOUCH_BEGIN, this);
	}

	// 发牌
	public dealCard(data) {
		var tmpCardArr: Array<CardView> = [];
		for (var i = 0; i < data.length; i++) {
			var c = new CardView(data[i]);
			this.CardGruop.addChild(c);
			c.alpha = 0;
			c.scaleX = 0;
			c.scaleY = 0;
			c.anchorOffsetX = c.width / 2;
			c.anchorOffsetY = c.height / 2;
			tmpCardArr.push(c);
		}
		this.Addcard(tmpCardArr);
	}

	// 发牌并销毁
	public dealCardandDestory(data){
		var cardView = new CardView(data[0]);
		this.CardGruop.addChild(cardView);
		cardView.alpha = 0;
		cardView.scaleX = 0;
		cardView.scaleY = 0;
		cardView.anchorOffsetX = cardView.width / 2;
		cardView.anchorOffsetY = cardView.height / 2;
	
		egret.Tween.get(cardView).to({ x: (DoubleBattlePage.instance()._SelfCardGroup.CardGruop.width / 2), scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.quadOut
		).to({ visible: false}, 200, egret.Ease.quadIn).call(() => {
			console.log('爆牌');
			cardView = null;
		})
		
	}

	// 销毁牌，当与新数据对比出错时
	public disCard(data){
		let disCardIdTmp = -1;
		if(data == 'callBack'){
			// 回调并且完成
			this.disCardIdList.slice(0, 1);
			if(this.disCardIdList.length == 0){
				return;
			}
			// 回调并且还有下一个
			disCardIdTmp = this.disCardIdList[0];
		// 新的监听触发
		}else{
			this.disCardIdList = this.disCardIdList.concat(data);
			if(this.disCardIdList.length > 1){
				return;
			}else{
				disCardIdTmp = this.disCardIdList[0];
			}
		}
		let tmpCardView: CardView = undefined;
		// 找卡
		for(let i = 0; i < this.Cararray.length; i++){
			if(this.Cararray[i].cardId == disCardIdTmp){
				tmpCardView = this.Cararray[i];
				break;
			}
		}
		if(!tmpCardView){
			console.log('[✗]: cna not find card: ', disCardIdTmp);
			console.log('this.Cararray: ', this.Cararray);
			throw new Error('弃牌时找不到卡 in disCard');
		}
		var index = this.Cararray.indexOf(tmpCardView);
		
		this.Cararray.splice(index, 1);
		egret.Tween.get(tmpCardView).to({ x: (DoubleBattlePage.instance()._SelfCardGroup.CardGruop.width / 2), scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.quadOut
		).to({ visible: false}, 200, egret.Ease.quadIn).call(() => {
			tmpCardView = null;
			this.suanfa(this.Cararray.length - 1);
			DoubleBattlePage.instance().safeRemoveWithIndex(tmpCardView, index);
			this.disCard('callBack');
		})
		
	}

	// 弃掉所有手牌
	public disAllCard(data){
		if(this.Cararray.length == 0){
			return;
		}
		
		let tmpCardView = this.Cararray.pop();
		egret.Tween.get(tmpCardView).to({rotation: 0, scaleX: 1, scaleY: 1, y: 400}, 500, egret.Ease.circOut)
		.call(()=>{
			if (tmpCardView && tmpCardView.parent) {
				tmpCardView.parent.removeChild(tmpCardView);
			}
			tmpCardView = null;
			this.suanfa(this.Cararray.length - 1)
		})
		
		
	}

	/// temporaryCararray牌的数组 可以改成传参 
	public Addcard(temporaryCararray: Array<CardView>) {
		this.messagequeue = this.messagequeue.concat(temporaryCararray);
		this.faipa();
	}

	public faipa() {

		if (this.messagbool) {
			this.messagbool = false;
			var a = this.Cararray.length;
			this.timer = null;
			this.timer = new egret.Timer(200, this.messagequeue.length);
			this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
				this.messagbool = false;
				this.Cararray.push(this.messagequeue[0]);
				var num = this.messagequeue.indexOf(this.messagequeue[0]);
				this.messagequeue.splice(num, 1);
				this.delivery(a);
				a++;

			}, this);
			this.timer.start();
			this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
				this.timer = null;
				this.messagbool = true;;
				if (this.messagequeue.length != 0) {
					this.faipa();
				}
			}, this);
		}

	}

	public delivery(i: number, ifkp: boolean = false) {
		var len = this.Cararray.length;
		var cardView = this.Cararray[i];
		cardView.addEventListener(CardEvent.LOCKLINE, this.LockLine_ready, this);
		cardView.addEventListener(CardEvent.DESTROY, this.destoryCard, this);
		egret.Tween.get(cardView).to({ x: (DoubleBattlePage.instance()._SelfCardGroup.CardGruop.width / 2), scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.quadOut).call(() => {
			this.suanfa(i);
		})
	}

	public suanfa(num: number) {
		var len = num + 1;
		var num = 60 / len;
		if (num > 10) {
			num = 10;
		}
		for (var i = 0; i < len; i++) {
			var c = this.Cararray[i];
			var rotation = 0 + (-(num * ((len - 1) / 2 - i)));
			var x = this.oPoint.x + this.radius * Math.cos((rotation - 90) * Math.PI / 180)
			var y = this.oPoint.y + this.radius * Math.sin((rotation - 90) * Math.PI / 180)
			c.touchiimage.name = "car" + i;
			c.yundefined(x, y, rotation, i);
		}
	}

	public timerHandle(): Array<CardView> {
		console.log('handle')
		var temporaryCararray: Array<CardView> = [];
		for (var i = 0; i < 5; i++) {
			var c = new CardView(2);
			this.CardGruop.addChild(c);
			c.alpha = 0;
			c.scaleX = 0;
			c.scaleY = 0;
			c.anchorOffsetX = c.width / 2;
			c.anchorOffsetY = c.height / 2;
			temporaryCararray.push(c);
		}
		console.log('temporaryCararray: ', temporaryCararray);
		return temporaryCararray;
	}


	public TOUCH_BEGIN(e: egret.TouchEvent) {

		var target: CardView = e.target;
		var name = e.target.name;
		var name1 = parseInt(name.substring(3, name.length));

		this._CardId = DoubleBattlePage.instance().selfCardList[name1];
		this.jiance(name1);

	}

	public jiance(target: number) {
		for (var i = 0; i < this.Cararray.length; i++) {
			if (i == target) {
				this._CardView = this.Cararray[i];
			}
		}
		if (this._CardView != null) {
			this._CardView.LockLine_ready()
		}
	}


	/// 点到牌成功调用
	public LockLine_ready() {
		if (!this._CardView.IFclick) return;
		// this._CardView.y += this.CardGruop.y;
		this.Special.addChild(this._CardView);
		this.Special.touchEnabled = true;
		this._CardView.x += this.CardGruop.x;
		this._CardView.y = 200;		

		this._CardView.scaleX = 1;
		this._CardView.scaleY = 1;
		this._CardView.setScale(3, 3);
		this._CardView.rotation = 0;
		this.Special.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TOUCH_MOVE, this);
		this.Special.addEventListener(egret.TouchEvent.TOUCH_END, this.TOUCH_END, this);

	}

	// 自己用牌, 并且销毁， 回调方法中发送useCard
	public destoryCard(data) {
		var num = this.Cararray.indexOf(data._obj);
		this.Cararray.splice(num, 1);
		DoubleBattlePage.instance().safeRemoveAndEmitUseCard(data._obj, num);
		this.suanfa(this.Cararray.length - 1);
	}

	public TOUCH_MOVE(e: egret.TouchEvent) {

		this._CardView.x = e.stageX;
		this._CardView.y = e.stageY;
		this._CardView.setScale(1, 1);
	}

	/// 释放调用 >400 释放不成功  
	public TOUCH_END(e: egret.TouchEvent) {
		let mana = PublicMethod.getCardCost(this._CardId);
		this.Special.touchEnabled = false;
		// 水晶不足
		if(mana > DoubleBattlePage.instance().selfManaValueNow_star){
			// 滤镜
			var colorMatrix = [
				1,0,0,0,100,
				0,1,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			SceneManager.getInstance().doubleBattlePage.selfManaImg.filters = [colorFlilter];
			setTimeout(()=>{
					SceneManager.getInstance().doubleBattlePage.selfManaImg.filters = [];
				},300);
			
			this.CardGruop.addChild(this._CardView);
			// this._CardView.scaleX = 1;
			// this._CardView.scaleY = 1;
			this._CardView.setScale(1, 1);
			this._CardView.x = e.stageX - this.CardGruop.x;
			this._CardView.y = e.stageY - this.CardGruop.y;
			this.suanfa(this.Cararray.length - 1);
		// 对方回合
		if(DoubleBattlePage.nowTurn == 2){
			this.CardGruop.addChild(this._CardView);
			// this._CardView.scaleX = 1;
			// this._CardView.scaleY = 1;
			this._CardView.setScale(1, 1);
			this._CardView.x = e.stageX - this.CardGruop.x;
			this._CardView.y = e.stageY - this.CardGruop.y;
			this.suanfa(this.Cararray.length - 1);
		}
		// 释放不成功
		}else if (e.stageY > 400) {
			this.CardGruop.addChild(this._CardView);
			this._CardView.scaleX = 1;
			this._CardView.scaleY = 1;
			this._CardView.setScale(1, 1);
			this._CardView.x = e.stageX - this.CardGruop.x;
			this._CardView.y = e.stageY - this.CardGruop.y;
			this.suanfa(this.Cararray.length - 1);
		// 释放成功
		} else {
			this._CardView.dispCar();
			var target: CardView = e.target;
			var name = e.target.name;
		}
		this._CardView = null;

		this.Special.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TOUCH_MOVE, this);
		this.Special.removeEventListener(egret.TouchEvent.TOUCH_END, this.TOUCH_END, this);
	}

	public release(){
		for(let i= 0; i < this.Cararray.length; i++){
			let obj = this.Cararray[i];
			if (obj && obj.parent) {
				obj.parent.removeChild(obj);
				obj.removeEventListener(CardEvent.LOCKLINE, this.LockLine_ready, this);
				obj.removeEventListener(CardEvent.DESTROY, this.destoryCard, this);
				obj.release();
			}
			DoubleBattlePage.instance().removeComponentTween(obj);
			this.Cararray[i] = null;
		}
		this.messagbool = true;
		this.messagequeue = [];
		this.disCardIdList = [];
		this.Cararray = [];
		this.Special.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TOUCH_MOVE, this);
		this.Special.removeEventListener(egret.TouchEvent.TOUCH_END, this.TOUCH_END, this);
		egret.Tween.removeAllTweens();
	}
}