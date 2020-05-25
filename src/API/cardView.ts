class CardView extends eui.Component {
	
	

	public cardId: number;
	public CardBG:eui.Image;
	public touchiimage:eui.Image;
	public cardFacceGroup:eui.Group;
	public CardFace:eui.Image;
	public cardName:eui.Label;
	private nameInfo:Array<number>;//初始属性值
	public cardDesc:eui.Label;
	private desInfo:Array<number>;//初始属性值
	public cardCost:eui.BitmapLabel;
	public cardImg:eui.Image;
	public picture:eui.Group;
	public IFclick:boolean=false;
	
	public constructor(id: number) {
		super();
		this.skinName = "cardView";
		this.CardBG.visible = false;
		this.setCardTexture(id);
		this.cardId = id;	
		this.nameInfo=new Array<number>(5);
		let tlabel=this.cardName;
		this.nameInfo=[tlabel.x,tlabel.y,tlabel.width,tlabel.height,tlabel.size];
		tlabel=this.cardDesc;
		this.desInfo=[tlabel.x,tlabel.y,tlabel.width,tlabel.height,tlabel.size];		
	}
	public yundefined(x, y, crotation, i) {
		this.IFclick=false;;
		egret.Tween.removeTweens(this);
		this.parent.setChildIndex(this, i);
		egret.Tween.get(this).to({ x: x, y: y, rotation: crotation }, 500, egret.Ease.quadOut).call(() => {
			this.IFclick=true;
		})
	}

	public LockLine_ready() {
		var event = new CardEvent(CardEvent.LOCKLINE);
		this.dispatchEvent(event);
	}

	public dispCar() {
		var event = new CardEvent(CardEvent.DESTROY, this);
		this.dispatchEvent(event);
	}
	public flipPaiAction(): void {
		this.CardBG.visible = true;
		this.skewY = 180;
		egret.Tween.get(this).to({ skewY: 270 }, 200, egret.Ease.quadOut).call(() => {
			this.CardBG.visible = !this.CardBG.visible;
			this.cardFacceGroup.visible = true;
			this.rotation = 0;
		}).to({ skewY: 360, scaleX: 1, scaleY: 1 }, 200, egret.Ease.quadOut).call(function (): void {
			egret.Tween.removeTweens(this);
		})


	}

	public xiaoshi() {

		egret.Tween.get(this).to({ rotation: -90 }, 300).call(() => {
			egret.Tween.get(this).to({ x: -this.width / 2, scaleX: 0, scaleY: 0 }, 300).call(() => {
				this.dispCar();
				var event = new CardEvent(CardEvent.CHUPAIEND, this);
				this.dispatchEvent(event);
			})

		});


	}


	public chupai() {
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addChupaiEvent, this);
	}

	public addChupaiEvent(){
		var event = new CardEvent(CardEvent.CHUPAI, this);
		this.dispatchEvent(event);
	}

	// 设置图片内容
	public setCardTexture(id){
		let index = -1;
		for(let i = 0; i < Cards.cards.length; i++){
			if(Cards.cards[i]['id'] == id){
				index = i;
				break;
			}
		}
		if(index == -1){
			console.log('can not find card: ', id);
			throw new Error('can\'t find card');
		}
		let background_img = "cardBackground";
		if(Cards.cards[index]['effect']['card_rare']=="SSR"){
			background_img+="4_png";
		}

		if(Cards.cards[index]['effect']['card_rare']=="SR"){
			background_img+="3_png";
		}
		if(Cards.cards[index]['effect']['card_rare']=="R"){
			background_img+="2_png";
		}
		if(Cards.cards[index]['effect']['card_rare']=="N"){
			background_img+="1_png";
		}

		let resources = Resource.getResource(Cards.cards[index]['name']);
		// console.log(Cards.cards[index]['name']);
		// console.log(resources);
		// console.log("加载卡面:",resources["name_en"],"_png");
		if(resources){
			this.cardImg.texture=RES.getRes(resources["name_en"]+"_jpg");
		}
		this.CardFace.texture= RES.getRes(background_img);
		this.cardName.text = Cards.cards[index]['name'];
		this.cardDesc.text = Cards.cards[index]['description'];
		this.cardCost.text = Cards.cards[index]['effect']['card_cost'];
	}

	public release(){
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addChupaiEvent, this);
	}
	public setScale(x,y){
		// console.log("Childrens\n");
	
		this.CardBG.scaleX=x; this.CardBG.scaleY=y;
		this.CardFace.scaleX=x; this.CardFace.scaleY=y;
		this.cardImg.scaleX=x; this .cardImg.scaleY=y; this.cardImg.x=x*14;this.cardImg.y=y*6;
		this.touchiimage.scaleX=x; this.touchiimage.scaleY=y; 
		let tlabel=this.cardName;
		let tArray=this.nameInfo;
		tlabel.x=tArray[0]*x; tlabel.y=tArray[1]*y;
		tlabel.width=tArray[2]*x;tlabel.height=tArray[3]*y;
		tlabel.size=tArray[4]*(x<y?x:y);
		tlabel=this.cardDesc;
		tArray=this.desInfo;
		tlabel.x=tArray[0]*x; tlabel.y=tArray[1]*y;
		tlabel.width=tArray[2]*x;tlabel.height=tArray[3]*y;
		tlabel.size=tArray[4]*(x<y?x:y);

		this.cardCost.scaleX=0.28*x;
		this.cardCost.scaleY=0.28*y;
		this.cardCost.x=3.75*x;
		this.cardCost.y=3.75*y;
	}

}