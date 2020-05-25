class CardLibrary extends eui.Component implements  eui.UIComponent {
	public BackGroup:eui.Group;
	public FilterGroup:eui.Group;
	public CardsListGroup:eui.Group;
	public LeftCardPage:eui.Image;
	public RightCardPage:eui.Image;
	public CardLibraryGroup: eui.Group;
	public CardPanel:eui.Group;
	public goBack:eui.Image;
	public CardIllustrations:eui.Group;
	public CardIllustrationsBackGroundGroup:eui.Group;
	public CardIllustrationsBackGround:eui.Image;
	public CaedIllustrationDesc: eui.Label;
	public closeCaedIllustrationBtn:eui.Button;
	public cardIllustrationsCard;
	public CardIllustrationShade:eui.Image;
	public CardIllustrationShadeGroup:eui.Group;


	private nowCardx=0;
	private nowCardy=0;
	private disX=0;
	private disY=0;

	private cardList;
	private Pages={"nowPage":0,"pages":0,"nowPageCards":[],"num":8,"filter":-1};
	private cardImgListener = [];
	private cardImgList = [];
	private filterButtonList = [];

	public constructor() {
		super();
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	protected init():void{
		this.LeftCardPage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftPage, this);
		this.RightCardPage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightPage, this);
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{SceneManager.getInstance().changeScene('mainPage')}, this)
		// this.closeCaedIllustrationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeIllustration, this)
		//this.CardIllustrationShade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeIllustration, this)
		this.CardIllustrationShadeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeIllustration, this);
		//this.CardIllustrationsBackGroundGroup.removeChild(this.CardIllustrations);
		this.CardIllustrationsBackGroundGroup.visible = false;
		this.renderCardList(this.Pages["filter"]);
		this.renderFilterButton();
	}
	protected renderFilterButton():void{
		let d = 10;
		let t = 17.085;
		let w = 55.83;
		let h = w;
		let nowx = d;
		let nowy = t;
		let inner_x = 2.915;
		let  inner_y= 17.915;
		let inner_w = 50;
		let inner_h = 20;
		this.filterButtonList = [];

		for(let i=0;i<8;i++){
			let each=new eui.Group();
			let eachImg = new eui.Image();
			let eachLabel = new eui.BitmapLabel();
			eachImg.texture = RES.getRes("mana_png");
			eachImg.width = w;
			eachImg.height = h;
			each.width = w;
			each.height = h;
			eachLabel.scaleX = 0.5;
			eachLabel.scaleY = 0.5;
			eachLabel.font = RES.getRes('cardCostFont_fnt')
			if(i>=10){
				eachLabel.x = inner_x+2;
			}else{
				eachLabel.x = inner_x+15;
			}
			eachLabel.y = inner_y;
			// eachLabel.horizontalCenter = 0;
			each.x = nowx;
			each.y = nowy;
			nowx += d+w;
			switch(i){
				case 0:
					eachLabel.text = "*";
				break;
				case 7:
					eachLabel.text ="+";
				break;
				default:
					eachLabel.text = String(i);
			}
			each.addChild(eachImg);
			each.addChild(eachLabel);
			this.filterButtonList.push(each);
			this.FilterGroup.addChild(each);
			each.addEventListener(egret.TouchEvent.TOUCH_TAP,this.FilterClick,{"e":each,"id":i,"self":this});
		}
	}
	public jellyBtn(img,t){
		this.shinkButton(img);
		setTimeout(()=>{
			this.unshinkButton(img);
		},t)
	}
	public shinkButton(img){
		var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality:number = egret.BitmapFilterQuality.MEDIUM;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,strength, quality, inner, knockout );
		img.filters =[glowFilter];
	}
	public unshinkButton(img){
		img.filters = undefined;
	}
	protected FilterClick():void{
		let filterNum = this["id"];
		let e = this["e"];
		let self = this["self"];
		if(filterNum!=self.Pages["filter"]){
			if(filterNum==0 && self.Pages["filter"]==-1){
				return;
			}
			//设置当前页面为0并重新渲染卡牌
			self.Pages['nowPage']=0;
			self.Pages["filter"] = filterNum==0?-1:filterNum;
			self.renderCardList(self.Pages["filter"]);
			//去除其他亮着的星
			for (let star of self.filterButtonList){
				star.getChildAt(0).filters= [];
			}
			//对过滤费用的星星加发光滤镜
			let color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
			let alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
			let blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			let blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			let strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			let quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			let inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			let knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
    				strength, quality, inner, knockout );
			e.getChildAt(0).filters = [ glowFilter ];
			}
			

	}

	protected leftPage():void{
		if(this.Pages["nowPage"]==0){
			return;
		}
		this.jellyBtn(this.LeftCardPage,300);
		this.releaseLinster();
		this.nowCardx = 70;
		this.nowCardy = -30;
		this.Pages["nowPage"]-=1;
		this.renderCardList(this.Pages["filter"]);
	}

	protected rightPage():void{
		
		if(this.Pages["nowPage"]==this.Pages["pages"]){
			return;
		}
		this.jellyBtn(this.RightCardPage,300);
		this.releaseLinster();
		this.nowCardx = 70;
		this.nowCardy = -30;
		this.Pages["nowPage"]+=1;
		this.renderCardList(this.Pages["filter"]);
	}

	public releaseLinster(){
		for(let i = 0; i < this.cardImgList.length; i++){
			this.cardImgList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cardImgListener[i], this)
		}
		this.cardImgList = [];
		this.cardImgListener = [];
	}
	protected showOneCard(card:CardView):void{
		let scale = 1.5;
		let Cx = card.width*scale;
		let Cy = card.height*scale;
		this.disX = (936-4*Cx)/5;
		this.disY = (550-2*Cy)/3;

		if(this.nowCardx == 0){
			this.nowCardx = this.disX;
		}else{
			this.nowCardx += this.disX + Cx;
		}
		if(this.nowCardy == 0){
			this.nowCardy = this.disY;
		}else if(this.nowCardx>(936-this.disX-Cx)){
			//需要换行
			this.nowCardx = this.disX;
			this.nowCardy = 2*this.disY+Cy;
		}
		card.x = this.nowCardx;
		card.y = this.nowCardy;
		card.setScale(scale,scale);
		// console.log("Cardpos:",this.nowCardx,this.nowCardy);
		let distance:number = 10;           /// 阴影的偏移距离，以像素为单位
		let angle:number = 45;              /// 阴影的角度，0 到 360 度
		let color:number = 0x000000;        /// 阴影的颜色，不包含透明度
		let alpha:number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
		let blurX:number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		let blurY:number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		let strength:number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		let quality:number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
		let inner:boolean = false;            /// 指定发光是否为内侧发光
		let knockout:boolean = false;            /// 指定对象是否具有挖空效果
		let dropShadowFilter:egret.DropShadowFilter =  new egret.DropShadowFilter( distance, angle, color, alpha, blurX, blurY,
			strength, quality, inner, knockout );
		card.CardFace.filters = [dropShadowFilter];
		this.CardPanel.addChild(card);
	}
	protected sortCard(a,b){
		return a["effect"]["card_cost"] - b["effect"]["card_cost"];
	}
	protected renderCardList(filter:number):void{
		this.Pages["nowPageCards"]=[];
		this.CardPanel.removeChildren();
		this.nowCardx = 0;
		this.nowCardy = 0;
		if(filter==-1){
			this.cardList = Cards.cards;
		}
		else {
			//重新生成this.cardList
			this.cardList = [];
			for(let i in Cards.cards){
				if(filter!=11){
					if(Cards.cards[i]["effect"]["card_cost"]==filter){
						this.cardList.push(Cards.cards[i]);
					}
				}else{
					if(Cards.cards[i]["effect"]["card_cost"]>=filter){
						this.cardList.push(Cards.cards[i]);
					}
				}

			}
		}
		this.cardList.sort(this.sortCard);
		this.Pages["pages"]=Math.floor(this.cardList.length/this.Pages["num"]);
		//如果是正好整页铺满,则减少一页
		if(this.cardList.length!=0 && this.cardList.length % this.Pages["num"]==0){
			this.Pages["pages"]--;
		}
		// console.log("分页:"+this.cardList.length+"/"+this.Pages["num"],this.Pages["pages"]);
		for(let i =this.Pages["nowPage"]*this.Pages["num"];i<(this.Pages["nowPage"]+1)*this.Pages["num"];i++){
			if(i<this.cardList.length)
				{
					this.Pages["nowPageCards"].push(this.cardList[i]);
				}
		}
		for(let i = 0; i < this.Pages["nowPageCards"].length; i++){
			let each = this.Pages["nowPageCards"][i]
			let effect = each['effect'];
			let eachGroup = new CardView(each['id']);
			this.showOneCard(eachGroup);
			let fun = this.showCardIllustrations.bind(this, each['id'])
			this.cardImgList.push(eachGroup)
			this.cardImgListener.push(fun)
			eachGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);
			eachGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setVisable, this);
		}
		this.renderPageButton();
	}

	protected setVisable(){
		this.CardIllustrationsBackGroundGroup.visible = true;
	}

	protected renderPageButton():void{
		if(this.Pages["nowPage"]==0){
			this.LeftCardPage.visible=false;
		}else{
			this.LeftCardPage.visible=true;
		}
		if(this.Pages["nowPage"]==this.Pages["pages"]){

			this.RightCardPage.visible=false;
		}else{
			this.RightCardPage.visible=true;
		}
	}

	public showCardIllustrations(Card_id){
		console.log(Card_id);
		console.log(Cards.cards[Card_id]);
		let blurFliter = new egret.BlurFilter( 5 , 5);
		this.CardLibraryGroup.filters = [blurFliter];
		if(this.cardIllustrationsCard != undefined){
			this.cardIllustrationsCard.parent.removeChild(this.cardIllustrationsCard)
		}
		let card = new CardView(Card_id);
		card.setScale(2,2);
		//card.scaleX=2;
		//card.scaleY=2;
		card.x=100;
		card.y=80;
		
		this.cardIllustrationsCard = card;
		this.CaedIllustrationDesc.text = Cards.getCardById(Card_id)['story'];
		this.CardIllustrations.addChild(card);
		this.CardIllustrationsBackGroundGroup.visible = true;
	}

	public closeIllustration(){
		this.CardLibraryGroup.filters = null;
		//this.CardIllustrations.visible = false;
		this.CardIllustrationsBackGroundGroup.visible = false;
	}


}
