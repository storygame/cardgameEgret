class PurchasePage extends eui.Component implements  eui.UIComponent {
	public coinNum: eui.Label; 
	public goBack: eui.Image;
	public Buy1:eui.Image;
	public Buy2:eui.Image;
	public Buy3:eui.Image;
	public Buy1Panel:eui.Image;
	public Buy2Panel:eui.Image;
	public Buy3Panel:eui.Image;
	public CoinPanel:eui.Image;

	public big_gift:eui.Image;
	public medium_gift:eui.Image;
	public small_gift:eui.Image;

	public openPackageBGImg:eui.Image;						// 开包黑色背景

	public mcOpenPackage1: egret.MovieClip;					//开包动画1
	public cardTop: CardView;
	public cardMiddleL: CardView;
	public cardMiddleR: CardView;
	public cardButtomL: CardView;
	public cardButtomR: CardView;
	public cardNum = 5;

	public anim: egret.MovieClip;							//  动画

	public purchaseShade:eui.Group;							// 遮罩

	public static staticThis;
	public static purchaseCardsList;						// 购买卡包内容

	public constructor() {
		super();
	}


	public childrenCreated():void
	{
		super.childrenCreated();
		this.init();
		this.addLinsters();
	}
	
	public init(){
		this.coinNum.text = String(UserInfo.coins);
		
		this.Buy1Panel.filters = [PublicMethod.getDropShadowFilter()];
		this.Buy2Panel.filters = [PublicMethod.getDropShadowFilter()];
		this.Buy3Panel.filters = [PublicMethod.getDropShadowFilter()];
		this.big_gift.filters = [PublicMethod.getDropShadowFilter()];
	}

	public addLinsters(){
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{SceneManager.getInstance().changeScene('mainPage')}, this)
		this.Buy1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPurchaseConfirm, this);
		this.Buy2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.notOpenPurchase,this);
		this.Buy3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.notOpenPurchase,this);
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this);
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this);
        this.Buy1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.Buy1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this);
		this.Buy1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this);
		this.Buy2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.Buy2.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this);
		this.Buy2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this);
		this.Buy3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.Buy3.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndOrReleaseOutside, this);
		this.Buy3.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndOrReleaseOutside, this);
		this.purchaseShade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.purchaseEnd, this);
	}

	public showPurchaseConfirm(){
		console.log('this in showPurchaseConfirm: ', this)
		this.Buy1.touchEnabled = false;
		new infoView(this,"请确认您是否要购买1个卡包?",this.buyCard, this.cancelInfoPanel);
		SceneManager.getInstance().purchasePage.Buy1.touchEnabled = true;		
	}
	public notOpenPurchase(){
		new infoView(this, "充值系统尚未开放,敬请期待.",()=>{},()=>{},true,false);
	}
	public cancelInfoPanel(){
	}

	public async buyCard(){
		SceneManager.getInstance().purchasePage.Buy1.touchEnabled = true;
		let that = this;
		console.log('this in buyCard: ', this)		
		if(UserInfo.coins>=200){
		// if(UserInfo.coins>=0){
			//购买卡包
			let buyCardsData  = await SocketAPI.getPostReply(SocketAPI.urllist["buyCard"], UserInfo.UserInfoString);
			if(buyCardsData['errno']==0){
				let CardBag = buyCardsData['data'];
				console.log("购买请求发送成功,购买成功:",CardBag);
				let cardsListString = "购买成功!获得卡牌:";
				let cardRare="黄";
				for(let c in CardBag){
					switch(CardBag[c]["card_rare"]){
						case "N":cardRare="黄";break;
						case "R":cardRare="玄";break;
						case "SR":cardRare="地";break;
						case "SRR":cardRare="天";break;
					}
					cardsListString+=CardBag[c]["name"]+"("+cardRare+")、";
				}
				cardsListString=cardsListString.substr(0,cardsListString.length-1);
				cardsListString+="."
				// new infoView(SceneManager.getInstance().purchasePage,cardsListString,()=>{},()=>{},true,false);
				//显示卡包动画

				// that.showOpenPackageAnim();
				PurchasePage.purchaseCardsList = CardBag;
				SceneManager.getInstance().purchasePage.showOpenPackageAnim();


				//更新金钱数量
				UserInfo.coins -= 1200;
				SceneManager.getInstance().purchasePage.coinNum.text = String(UserInfo.coins); 

			}else{
				new infoView(SceneManager.getInstance().purchasePage, "购买卡包出现错误,请检查网络连接.",()=>{},()=>{},true,false);
				console.log("购买卡包出现错误",buyCardsData['errmsg']);
			}
		}else{
			//没有钱购买卡包
			new infoView(SceneManager.getInstance().purchasePage, "你没有足够的玉石(充值系统尚未开放).",()=>{},()=>{},true,false);
		}
		
	}


	public showOpenPackageAnim(){
		var data = RES.getRes('openPackage1_json');
        var animation = RES.getRes('openPackage1_png');
        var mcDataFactory = new egret.MovieClipDataFactory(data, animation);
        this.anim = new egret.MovieClip(mcDataFactory.generateMovieClipData('openPackage1'));
        this.openPackageBGImg.visible = true;
		this.addChild(this.anim);
		this.mcOpenPackage1 = this.anim;
		this.mcOpenPackage1.addEventListener(egret.Event.COMPLETE, this.dealAfterOpenPackage1, this);
        this.anim.gotoAndPlay(1, 1);
        this.anim.x = 0;
        this.anim.y = 0;
        this.anim.scaleX = this.stage.width/960;
        this.anim.scaleY = this.stage.height/540;
	}

	public dealAfterOpenPackage1(){
		this.addCard();
		this.showOpenPackage2Anim();
	}

	public addCard(){
		console.log('### PurchasePage.purchaseCardsList：', PurchasePage.purchaseCardsList);
		let scaleY = 196/160;
		let scaleX = 210/160;

		this.cardTop = new CardView(PurchasePage.purchaseCardsList[0]['id']);
		let anchorOffsetX = this.cardTop.width*scaleX/2;
		this.cardTop.setScale(scaleX, scaleY);
		this.cardTop.x = 497+anchorOffsetX;	this.cardTop.y = 54;
		this.cardTop.cardFacceGroup.visible = false;
		this.cardTop.CardBG.visible = true;
		this.addChild(this.cardTop);
		this.cardTop.anchorOffsetX = anchorOffsetX;

		this.cardMiddleL = new CardView(PurchasePage.purchaseCardsList[1]['id']);
		this.cardMiddleL.setScale(scaleX, scaleY);
		this.cardMiddleL.x = 286+anchorOffsetX;	this.cardMiddleL.y = 162;
		this.cardMiddleL.cardFacceGroup.visible = false;
		this.cardMiddleL.CardBG.visible = true;		
		this.addChild(this.cardMiddleL);
		this.cardMiddleL.anchorOffsetX = anchorOffsetX

		this.cardMiddleR = new CardView(PurchasePage.purchaseCardsList[2]['id']);
		this.cardMiddleR.setScale(scaleX, scaleY);
		this.cardMiddleR.x = 713+anchorOffsetX;	this.cardMiddleR.y = 162;
		this.cardMiddleR.cardFacceGroup.visible = false;
		this.cardMiddleR.CardBG.visible = true;
		this.addChild(this.cardMiddleR);
		this.cardMiddleR.anchorOffsetX = anchorOffsetX

		this.cardButtomL = new CardView(PurchasePage.purchaseCardsList[3]['id']);
		this.cardButtomL.setScale(scaleX, scaleY);
		this.cardButtomL.x = 378+anchorOffsetX;	this.cardButtomL.y = 400;
		this.cardButtomL.cardFacceGroup.visible = false;
		this.cardButtomL.CardBG.visible = true;
		this.addChild(this.cardButtomL);
		this.cardButtomL.anchorOffsetX = anchorOffsetX

		this.cardButtomR = new CardView(PurchasePage.purchaseCardsList[4]['id']);
		this.cardButtomR.setScale(scaleX, scaleY);
		this.cardButtomR.x = 619+anchorOffsetX;	this.cardButtomR.y = 400;
		this.cardButtomR.cardFacceGroup.visible = false;
		this.cardButtomR.CardBG.visible = true;
		this.addChild(this.cardButtomR);
		this.cardButtomR.anchorOffsetX = anchorOffsetX
		
		this.cardTop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
		this.cardButtomL.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
		this.cardButtomR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
		this.cardMiddleL.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
		this.cardMiddleR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
	}

	public reverse(e: egret.TouchEvent){
		let card: CardView = e.target.parent;
		card.flipPaiAction();
		this.cardNum -= 1;
		if(this.cardNum == 0){
			this.cardNum = 5;
			this.cardTop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
			this.cardButtomL.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
			this.cardButtomR.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
			this.cardMiddleL.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
			this.cardMiddleR.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reverse, this);
			this.purchaseShade.visible = true;
			this.setChildIndex(this.purchaseShade, this.numChildren);

		}
	}

	public showOpenPackage2Anim(){
		var data = RES.getRes('openPackage2_json');
        var animation = RES.getRes('openPackage2_png');
        var mcDataFactory = new egret.MovieClipDataFactory(data, animation);
		this.removeChild(this.anim);
        this.anim = new egret.MovieClip(mcDataFactory.generateMovieClipData('openPackage2'));
        this.anim.gotoAndPlay(1, -1);
		console.log(this.numChildren)
		this.addChildAt(this.anim, this.numChildren-5);
        this.anim.x = 0;
        this.anim.y = 0;
        this.anim.scaleX = this.stage.width/960*2;
        this.anim.scaleY = this.stage.height/540*2;
	}

	public purchaseEnd(){
		this.removeChild(this.cardTop);
		this.removeChild(this.cardButtomL);
		this.removeChild(this.cardButtomR);
		this.removeChild(this.cardMiddleL);
		this.removeChild(this.cardMiddleR);
		this.removeChild(this.anim);
		this.openPackageBGImg.visible = false;
		this.purchaseShade.visible = false;
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

	public touchEndOrReleaseOutside(e: egret.TouchEvent){
		let target: CardView = e.target;
		console.log('touch end: ', target);
		target.filters = null;
		console.log('target: ', target);
	}
}