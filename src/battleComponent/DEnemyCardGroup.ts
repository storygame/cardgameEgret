class DEnemyCardGroup {
	public constructor(doubleBattlePage: DoubleBattlePage) {
		this.CardGruop = doubleBattlePage["enemyCardGroup"];
		this.Special = doubleBattlePage["Special"];
		this.init();
	}
	private enemdoPoint: egret.Point = new egret.Point(622, 0);
	private enemdradius: number = -800;
	private enemdbgpoint: egret.Point = new egret.Point(1920, 93);
	private enemdtimer: egret.Timer;
	public enemdCararray: Array<CardView> = [];
	public CardGruop: eui.Group;
	public Special: eui.Group;
	public cardmessagequeue: Array<any> = [];
	public messagbool: boolean = true;
	public IFchup: boolean = true;
	public messagequeue: Array<any> = [];
	public init() {
		// this.enemdoPoint = new egret.Point((Gameui.instance().curWidth()) / 2, -800);

	}

	public ceshi(num) {

		var a = this.enemdtimerHandle(num);
		this.Addenemdcard(a);
	}

	public Addenemdcard(temporaryCararray: Array<CardView>) {
		this.cardmessagequeue = this.cardmessagequeue.concat(temporaryCararray);
		this.faipa();
		// var temporaryCararray = this.enemdtimerHandle()
		// var a = this.enemdCararray.length;
		// this.enemdCararray = this.enemdCararray.concat(temporaryCararray);
		// this.enemdtimer = null;
		// this.enemdtimer = new egret.Timer(200, temporaryCararray.length);
		// this.enemdtimer.addEventListener(egret.TimerEvent.TIMER, () => {
		// 	this.enemddelivery(a);
		// 	a++;
		// }, this);
		// this.enemdtimer.start();
		// this.enemdtimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
		// 	this.enemdtimer = null;
		// }, this);

	}
	public faipa() {
		if (this.messagbool) {
			this.messagbool = false;
			var a = this.enemdCararray.length

			this.enemdtimer = null;
			this.enemdtimer = new egret.Timer(200, this.cardmessagequeue.length);
			this.enemdtimer.addEventListener(egret.TimerEvent.TIMER, () => {
				this.messagbool = false;
				this.enemdCararray.push(this.cardmessagequeue[0]);
				var num = this.cardmessagequeue.indexOf(this.cardmessagequeue[0]);
				this.cardmessagequeue.splice(num, 1);
				this.enemddelivery(a);
				a++;

			}, this);
			this.enemdtimer.start();
			this.enemdtimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
				this.enemdtimer = null;
				this.messagbool = true;;
				if (this.cardmessagequeue.length != 0) {
					this.faipa();
				}
			}, this);


		}


	}



	public enemdtimerHandle(num): Array<CardView> {
		var temporaryCararray: Array<CardView> = [];
		for (var i = 0; i < num; i++) {
			var c = new CardView(1);
			this.CardGruop.addChild(c);
			c.alpha = 0;
			c.scaleX = 0;
			c.scaleY = 0;
			c.rotation = 0;
			c.CardBG.rotation = 180;
			c.CardBG.visible = true;
			c.x = this.enemdbgpoint.x;
			c.y = this.enemdbgpoint.y + c.height / 2;
			c.anchorOffsetX = c.width / 2;
			c.anchorOffsetY = c.height / 2;
			temporaryCararray.push(c);
			// c.addEventListener(CardEvent.CHUPAI, this.chupai, this);
			// c.addEventListener(CardEvent.CHUPAIEND, this.Bg_chuapai, this);
			c.chupai();
		}
		return temporaryCararray;
	}

	public chupai(data) {
		if (this.messagequeue.indexOf(data._obj) == -1) {
			this.messagequeue.push(data._obj);
			console.log('chupai: ',data);
			console.log('this.IFchup out if: ', this.IFchup);
			if (this.IFchup) {
				console.log('ifhcup in if: ', this.IFchup);
				this.Bg_chuapai();
				this.IFchup = false;
			}
			// this.Bg_chuapai();
		}
	}

	public Bg_chuapai() {
		var obj = this.messagequeue[0];
		if (obj == null) {
			this.IFchup = true;
			return;
		}



		var num = this.enemdCararray.indexOf(obj);
		this.enemdCararray.splice(num, 1);
		this.Special.addChild(obj);
		this.enemdsuanfa(this.enemdCararray.length - 1);
		egret.Tween.get(obj).to({ x: (DoubleBattlePage.instance()._EnemyCardGroup.CardGruop.width / 2), y: this.Special.height / 2, rotation: 180 }, 800, egret.Ease.quadOut).call(() => {

			this.messagequeue.splice(0, 1);
			obj.flipPaiAction();

		})

	}



	public enemddelivery(i: number, ifkp: boolean = false) {
		var len = this.enemdCararray.length;
		var cardView = this.enemdCararray[i];
		cardView.addEventListener(CardEvent.DESTROY, this.enemddispCar, this);
		egret.Tween.get(cardView).to({ x: (DoubleBattlePage.instance()._EnemyCardGroup.CardGruop.width / 2), scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.quadOut).call(() => {
			this.enemdsuanfa(i);
		})
	}

	public enemdsuanfa(num: number) {
		var len = num + 1;
		var num = 60 / len;
		if (num > 10) {
			num = 10;
		}
		for (var i = 0; i < len; i++) {
			var c = this.enemdCararray[i];
			var rotation = 0 + (-(num * ((len - 1) / 2 - i)));
			var x = this.enemdoPoint.x + this.enemdradius * Math.cos((rotation - 90) * Math.PI / 180)
			var y = this.CardGruop.height + this.enemdoPoint.y + this.enemdradius * Math.sin((rotation - 90) * Math.PI / 180)
			c.touchiimage.name = "car" + i;
			c.yundefined(x, y, rotation, i);
		}
	}
	public enemddispCar(data) {

		DoubleBattlePage.instance().safeRemove(data._obj);

	}

	public release(){
		// for(let i= 0; i < this.Cararray.length; i++){
		// 	let obj = this.Cararray[i];
		// 	if (obj && obj.parent) {
		// 		obj.parent.removeChild(obj);
		// 		obj.removeEventListener(CardEvent.LOCKLINE, this.LockLine_ready, this);
		// 		obj.removeEventListener(CardEvent.DESTROY, this.destoryCard, this);
		// 		obj.release();
		// 	}
		// 	DoubleBattlePage.instance().removeComponentTween(obj);
		// 	this.Cararray[i] = null;
		// }
		// this.messagbool = true;
		// this.messagequeue = [];
		// this.disCardIdList = [];
		// this.Cararray = [];
		// this.Special.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TOUCH_MOVE, this);
		// this.Special.removeEventListener(egret.TouchEvent.TOUCH_END, this.TOUCH_END, this);
		// egret.Tween.removeAllTweens();
	}



}