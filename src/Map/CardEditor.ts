class CardEditor extends eui.Component implements eui.UIComponent {
	// private cardBag:eui.ArrayCollection<string>;
	private pageRow: number = 3;
	private pageCol: number = 8;
	//UI
    private TmpCollectionGroup:eui.Group;
    private MiddleGroup:eui.Group;
    private leftpage:eui.Image;
    private rightpage:eui.Image;
    private FilterGroup:eui.Group;
	private list: eui.List;
	private spendGp: eui.Group;
	private spendBtns: eui.Button[];
	private checkGp: eui.Group;
	private ckbs: eui.CheckBox[];
	private cardGp: eui.Group[]; //3*8,默认五页
	private cardGpNum: number;
	private pageNum: number;
	private searchBtn: eui.Button;
	private scroller: eui.Scroller;
	private exitBtn: eui.Button;
	private removeCard: eui.Image; //移除卡牌

	public chooseCardID:number;		
	public static self:CardEditor;

    //分页与位置
    private nowCardx=0;
	private nowCardy=0;
	private disX=0;
	private disY=0;
    private cardList;
	private Pages={"nowPage":0,"pages":0,"nowPageCards":[],"num":8,"filter":-1};
	private cardImgListener = [];
	private cardImgList = [];
	private filterButtonList = [];


	//筛选条件
	private ckbs_v: boolean[];
	private spend_v: number; //-1代表All
	private text_v: string;
	//卡牌数据
	public viewStack: eui.ViewStack;
	public cardData; //ID,名称，描述，费用，稀有度(0~3)
	public leftCard: Array < number > ;
	public chosenCard: eui.ArrayCollection;
	//判断手指滑动
	private startPos: egret.Point;
	private pageStart: boolean = false;
	private cdStartPos: egret.Point;
	private cdEndPos: egret.Point;
	//判断碰撞
	private cardRect: egret.Shape;
	private moveTarget: any;

	//+先写在前面
	private closeWindow(evt: egret.TouchEvent) {
		this.removeChildren();
	}

	private  removeCardMode(evt: egret.TouchEvent) {
		//开启删卡模式
		if(this.chooseCardID!=-1){
			new infoView(this,"您是否要移除这张卡牌(消耗20玉石)?",this.deleteCard,()=>{},true,true);
		}
	}

	private async deleteCard(){
		let that=CardEditor.self;
			let reply = await SocketAPI.getPostReply(SocketAPI.urllist["removeCard"], "username=" + String(UserInfo.username) + "&password=" + String(UserInfo.password)+"&card_id="+String(that.chooseCardID));		
			console.log(that.chooseCardID);
			if(reply['errno']==0)
			{
				UserInfo.updateUserInfo(reply);
			}else if(reply['errno']==1010){
				new infoView(that,"您的玉石不足。", ()=>{},()=>{},true,false)
			}else
			{
				new infoView(that,ErrnoHandle.errnoList[reply['errno']],()=>{},()=>{},true,false);
			}
				that.renderCardList(that.Pages["filter"]);
	}

	private tapCard(evt: egret.TouchEvent) {
		for (let card of this.cardImgList ){
			card.filters=[];
		}
		var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
			var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
			var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
    				strength, quality, inner, knockout );
	    evt.target.parent.filters = [ glowFilter ];
		this.chooseCardID=evt.target.parent.cardId;
	}

	private moveCard(evt: egret.TouchEvent) { //有Bug
		switch (evt.type) {
		case egret.TouchEvent.TOUCH_BEGIN:
			this.moveTarget = evt.target;
			this.cdStartPos = this.moveTarget.parent.globalToLocal(new egret.Point(evt.stageX, evt.stageY));
			break;
		case egret.TouchEvent.TOUCH_MOVE:
			var pos = this.moveTarget.parent.globalToLocal(evt.stageX, evt.stageY);
			this.moveTarget.x = pos.x;
			this.moveTarget.y = pos.y;
			break;
		case egret.TouchEvent.TOUCH_END:
			this.cdEndPos = new egret.Point(evt.stageX, evt.stageY);
			var isHit: boolean = this.scroller.hitTestPoint(evt.stageX, evt.stageY);
			if (isHit) {
				this.chosenCard.addItem(this.moveTarget.cardId);
			} else {
				this.moveTarget.x = this.cdStartPos.x;
				this.moveTarget.y = this.cdStartPos.y;
			}
			break;
		default:
			break;
		}
	}

	private movePage(evt: egret.TouchEvent) {
		var move = 0;
		switch (evt.type) {
		case egret.TouchEvent.TOUCH_BEGIN:

			this.startPos = new egret.Point(evt.stageX, evt.stageY);
			this.pageStart = true;
			break;
		case egret.TouchEvent.TOUCH_END:
			if (this.pageStart) {
				var endPos = new egret.Point(evt.stageX, evt.stageY);
				var t3 = endPos.x - this.startPos.x;
				var move: number = 0;
				if (Math.abs(t3) > 60) {
					if (t3 < 0) move = 1;
					else move = -1;
				}
				if (move == 1) {
					if (this.viewStack.selectedIndex < (this.cardGpNum - 1)) {
						this.viewStack.selectedIndex++;
					}
				} else if (move == -1) {
					if (this.viewStack.selectedIndex > 0) {
						this.viewStack.selectedIndex--;
					}
				}
				this.pageStart = false;
			}

			break;
		default:
			break;
		}

	}
	private renewleftCard() {

		var nowPage: number;
		this.leftCard = [];
		for (let i = 0; i < this.cardData.length; i++) {
			let card_id = this.cardData[i];
			this.leftCard.push(card_id);
		}
		for (let i = 0; i < 5; i++) {
			this.cardGp[i].removeChildren();
		}

		this.cardGpNum = Math.floor(this.leftCard.length / 24) + 1;
		for (var i = 0; i < this.leftCard.length; i++) {
			nowPage = Math.floor(i / this.pageRow / this.pageCol);
			var each_card = new CardView(this.leftCard[i]);

			each_card.x = 750 / this.pageCol * (i % this.pageCol);
			each_card.y = 500 / this.pageRow * (Math.floor(i / this.pageCol) % this.pageRow);
			this.cardGp[nowPage].addChild(each_card);
		}
	}


	public constructor() {
		super();
		this.skinName = "CardEditorSkin";
		this.init();
	}


	public init() {
		//绘制背景
        this.leftpage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftPage, this);
		this.rightpage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightPage, this);
        this.readCardData();
        this.renderCardList(this.Pages["filter"]);
		this.renderFilterButton();
		//移除按钮
		this.removeCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeCardMode, this);
		CardEditor.self=this;

	}
    private readCardData() {
		this.cardData = UserInfo.tmp_collection;
	}
    protected leftPage():void{
		if(this.Pages["nowPage"]==0){
			return;
		}
		this.jellyBtn(this.leftpage,300);
		this.releaseLinster();
		this.nowCardx = 70;
		this.nowCardy = -30;
		this.Pages["nowPage"]-=1;
		this.renderCardList(this.Pages["filter"]);
	}
    public releaseLinster(){
		for(let i = 0; i < this.cardImgList.length; i++){
			this.cardImgList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapCard, this)
		}
		this.cardImgList = [];
		this.cardImgListener = [];
	}
	protected showOneCard(card: CardView):void{
		let scale = 1;
		let Cx = card.width*scale;
		let Cy = card.height*scale;
		this.disX = (685-4*Cx)/5;
		this.disY = (366-2*Cy)/3;

		if(this.nowCardx == 0){
			this.nowCardx = this.disX;
		}else{
			this.nowCardx += this.disX + Cx;
		}
		if(this.nowCardy == 0){
			this.nowCardy = this.disY;
		}else if(this.nowCardx>(685-this.disX-Cx)){
			//需要换行
			this.nowCardx = this.disX;
			this.nowCardy = 2*this.disY+Cy;
		}
		card.x = this.nowCardx;
		card.y = this.nowCardy;
		card.setScale(scale,scale);
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
		this.MiddleGroup.addChild(card);
	}
	protected sortCard(a,b){
		return a["effect"]["card_cost"] - b["effect"]["card_cost"];
	}
	protected renderCardList(filter:number):void{
		//选择卡牌清空sty		
		this.chooseCardID=-1;
		this.Pages["nowPageCards"]=[];
		this.MiddleGroup.removeChildren();
		this.nowCardx = 0;
		this.nowCardy = 0;
		if(filter==-1){
            this.cardList = Cards.getCardListByIds(UserInfo.tmp_collection);
		}
		else {
			//重新生成this.cardList
            this.cardList = [];
            let original_cards=Cards.getCardListByIds(UserInfo.tmp_collection);
			console.log("玩家卡牌",original_cards);
			for(let i in original_cards){
				if(filter!=7){
					if(original_cards[i]["effect"]["card_cost"]==filter){
						this.cardList.push(original_cards[i]);
					}
				}else{
					if(original_cards[i]["effect"]["card_cost"]>=filter){
						this.cardList.push(original_cards[i]);
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
			eachGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapCard, this);
			this.cardImgList.push(eachGroup)
			// eachGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setVisable, this);
		}
		this.renderPageButton();
	}
    protected renderPageButton():void{
		if(this.Pages["nowPage"]==0){
			this.leftpage.visible=false;
		}else{
			this.leftpage.visible=true;
		}
		if(this.Pages["nowPage"]==this.Pages["pages"]){

			this.rightpage.visible=false;
		}else{
			this.rightpage.visible=true;
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
		img.filters = [];
	}
	protected rightPage():void{

		if(this.Pages["nowPage"]==this.Pages["pages"]){
			return;
		}
		this.jellyBtn(this.rightpage,300);
		this.releaseLinster();
		this.nowCardx = 70;
		this.nowCardy = -30;
		this.Pages["nowPage"]+=1;
		this.renderCardList(this.Pages["filter"]);
	}
    protected renderFilterButton():void{
		let d = 10;
		let t = 0;
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
			let eachLabel = new eui.Label();
			eachImg.texture = RES.getRes("mana_png");
			eachImg.width = w;
			eachImg.height = h;
			each.width = w;
			each.height = h;
			eachLabel.width = inner_w;
			eachLabel.height = inner_h;
			if(i>=10){
				eachLabel.x = inner_x+2;
			}else{
				eachLabel.x = inner_x+18;
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
					eachLabel.text = String(i)+"+";
				break;
				default:
					eachLabel.text = String(i);
			}
			eachLabel.textColor = 0x000000;
			each.addChild(eachImg);
			each.addChild(eachLabel);
			this.filterButtonList.push(each);
			this.FilterGroup.addChild(each);
			each.addEventListener(egret.TouchEvent.TOUCH_TAP,this.FilterClick,{"e":each,"id":i,"self":this});
		}
	}

    protected FilterClick():void{
		let filterNum = this["id"];
		
		let e = this["e"];
		let self = this["self"];
			if(filterNum==0 && self.Pages["filter"]==-1){
				return;
			}
			//设置当前页面为0并重新渲染卡牌	
			self.Pages['nowPage']=0;
			self.Pages["filter"] =(( filterNum==0)?-1:filterNum);
			self.renderCardList(self.Pages["filter"]);
			//去除其他亮着的星
			for (let star of self.filterButtonList){
				star.getChildAt(0).filters= [];
			}
			//对过滤费用的星星加发光滤镜
			var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
			var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
			var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
    				strength, quality, inner, knockout );

			e.getChildAt(0).filters = [ glowFilter ];

	}
}
