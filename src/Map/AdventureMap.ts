class AdventureMap extends eui.Component implements eui.UIComponent{
    //UI

    private AdventureCardPanel;
    private isEditor:boolean=false;
    private isInfo:boolean;
    public bigMap : eui.Scroller;
    public Main:eui.Group;
    public adventureMapGroup:eui.Group;
    public adventureCardGroupText:eui.Label;

    public adventureMapBackImg:eui.Image;
	public goBack:eui.Image;
    public adventureCardPool:eui.Image;
    public divWidth:number;
    public divHeight:number;
    private targetLink:Array<[number,number,number,Array<number>]>;
    public targetList:Array<Target>=[];
    public TargetLabelList:Array<eui.Label>=[];
    public TargetImageList:Array<eui.Image>=[];

    public lastcx:number;
    public lastcy:number;
    public lastx:number;
    public lasty:number;

    public BackgroundShadow:eui.Image;
    public infoPanel:eui.Group;
    public level_name:eui.Label;
    public level_description:eui.Label;
    public level_monster_name:eui.Label;
    public level_award:eui.Label;
    public fightBtn:eui.Button;
    public hideShadow:eui.Image;
    public nowFight:number=0;//准备的战斗

    public coin:eui.Group;
    public CoinPanel:eui.Image;
    public coins:eui.Button;
    public coinNum:eui.Label;

    public initX:number;
    public initY:number;

    constructor(){
        super();
        this.skinName = 'AdventureMapSkin';

    }

    protected childrenCreated():void{
        super.childrenCreated();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        
        this.init();
        //画地图上的点只做一次
        this.renderTarget();
        this.addEventListeners();
    }
       public renderTarget(){
        //删掉之前的所有节点
        for(let i=0;i<this.targetList.length;i++){
            if(this.targetList[i].parent)
            this.targetList[i].parent.removeChild(this.targetList[i]);
        }
        for(let i=0;i<this.TargetImageList.length;i++){
            if(this.TargetImageList[i].parent)
            this.TargetImageList[i].parent.removeChild(this.TargetImageList[i]);
        }
        for(let i=0;i<this.TargetLabelList.length;i++){
            if(this.TargetLabelList[i].parent)
            this.TargetLabelList[i].parent.removeChild(this.TargetLabelList[i]);
        }
        
        this.adventureMapGroup.width = 1136*3;
       // this.adventureMapBackImg.width = this.adventureMapBackImg.width;
        this.divHeight= this.adventureMapGroup.height/7;
        let single_level = UserInfo.single_level;
		let tmp_level = UserInfo.tmp_level;
		let single_chapter = Chapter.deLevel(single_level);
		let tmp_chapter = Chapter.deLevel(tmp_level);
        if(tmp_chapter[0]>Chapter.max_segment || tmp_chapter[1]>Chapter.max_offset){
            new infoView(this,"当前关卡并未开放.",()=>{},()=>{},true,false);
            tmp_chapter[0]=single_chapter[0]-1;
            tmp_chapter[1]=0;
            return;
        }
        let ChapterInfo = Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]);
        let MonsterInfo = Monster.getMonster(parseInt(ChapterInfo["ai"]));
        let monster_type;
        if(MonsterInfo==undefined){
            monster_type = 1;
        }else{
            switch(MonsterInfo['type']){
            case '兵':monster_type=1;break;
            case '士':monster_type=2;break;
            case '相':monster_type=3;break;
            case '王':monster_type=4;break;
            };
        }

        this.targetLink = [];
        //生成targetLink
        let index=0,cx,cy;
        while(Chapter.getChapter(tmp_chapter[0],index)!=undefined){
            let tmpChapterInfo = Chapter.getChapter(tmp_chapter[0],index);
            index++;
            cx=index;
            let tmpMonsterInfo = Monster.getMonster(parseInt(tmpChapterInfo["ai"]));
            if(tmpMonsterInfo==undefined){
                monster_type=1;
            }else{
                switch(tmpMonsterInfo['type']){
                    case '兵':monster_type=1;break;
                    case '士':monster_type=2;break;
                    case '相':monster_type=3;break;
                    case '王':monster_type=4;break;
                    default:monster_type=1;
                };
            }

            cy=Math.floor(Math.random() * (6-2  +1) + 2);
            this.targetLink.push([cx,cy,monster_type,[index-1]]);
        }
         this.divWidth=  this.adventureMapGroup.width/(index+2);
        this.targetList=new Array(this.targetLink.length);
        for(var i=0;i<this.targetLink.length;i++){

            this.targetList[i]=new Target(i,this.targetLink[i][0],this.targetLink[i][1],this.targetLink[i][2],this.targetLink[i][3],this);
            this.targetList[i].x=0;
            this.targetList[i].y=0;
        }

        for(let i=0;i<this.targetLink.length;i++)
            this.targetList[i].Show();
         //根据现在关卡数，设定初始Scroller位置
       
    }
    protected async init(){
        // 音乐返回
  		if(UserInfo.soundChannel)
			UserInfo.soundChannel.stop();
		UserInfo.music = RES.getRes("forest_mp3");
  		UserInfo.soundChannel  =  UserInfo.music.play(0, -1);
        //更新玩家信息
        await UserInfo.updateUserAdventureLevel();
        // var adventureMap=new MyMap(this,1136*3,640,"adventureMap_jpg");

        this.bigMap.viewport=this.adventureMapGroup;
        this.bigMap.bounces = false;

        // this.Main.addChild(bigMap);
        this.Main.setChildIndex(this.infoPanel,100);
        this.Main.setChildIndex(this.hideShadow,101);
        this.Main.setChildIndex(this.goBack,80);
        this.Main.setChildIndex(this.BackgroundShadow,101);
        this.Main.setChildIndex(this.adventureCardPool,80);
        this.Main.setChildIndex(this.adventureCardGroupText,80);

        if(this.bigMap.horizontalScrollBar){
            this.bigMap.horizontalScrollBar.autoVisibility = false;
            this.bigMap.horizontalScrollBar.visible = false;
        }
        if(this.bigMap.verticalScrollBar){
            this.bigMap.verticalScrollBar.autoVisibility = false;
            this.bigMap.verticalScrollBar.visible = false;
        }
        this.createInfoPanel();
        //根据TargetList更新Target
        if(this.targetList.length>0){
            let tmp_level = UserInfo.tmp_level;
		    let tmp_chapter = Chapter.deLevel(tmp_level);
            if(this.targetList[tmp_chapter[1]].parent)
            this.targetList[tmp_chapter[1]].parent.removeChild(this.targetList[tmp_chapter[1]]);
            this.targetList[tmp_chapter[1]].Show();
        }
        this.bigMap.viewport.scrollH=this.initX-550; 
        if(this.bigMap.viewport.scrollH<0)this.bigMap.viewport.scrollH=0;
        if((this.bigMap.viewport.scrollH+this.bigMap.width)>this.bigMap.viewport.contentWidth)this.bigMap.viewport.scrollH=this.bigMap.viewport.contentWidth-this.bigMap.width;

        // 更新玉石数量
        this.coinNum.text = String(UserInfo.coins);
    }

    // public initShade(){
	// 	if(UserInfo.single_level == UserInfo.tmp_level && UserInfo.tmp_level == 1.0){
	// 		PublicMethod.createShape(220, 373, 60, this.width, this.height, this);
	// 	}else if(UserInfo.single_level == UserInfo.tmp_level && UserInfo.tmp_level == 1.1){
	// 		PublicMethod.createShape(220, 373, 60, this.width, this.height, this);
	// 	}else{
	// 		if(this.shadeCircle)
	// 			this.removeChild(this.shadeCircle);
	// 		if(this.shadeRect)
	// 			this.removeChild(this.shadeRect)
	// 	}
	// }

    protected addEventListeners(){
        this.adventureCardPool.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openCardPanel,this);
        this.fightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickFightBtn,this);
        this.hideShadow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hideInfoPanel,this);
        this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{SceneManager.getInstance().changeScene('chacpterPage')}, this)
        this.BackgroundShadow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hideCardPanle,this);
        this.coin.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{SceneManager.getInstance().changeScene('purchasePage')}, this)
        // 添加点击特效
        PublicMethod.clickDarken(this.fightBtn, this);
        PublicMethod.clickDarken(this.goBack, this);
        PublicMethod.clickDarken(this.coin, this);
        
    }
    public createInfoPanel(){
        //渲染Level Info数据

        let single_level = UserInfo.single_level;
		let tmp_level = UserInfo.tmp_level;
		let single_chapter = Chapter.deLevel(single_level);
		let tmp_chapter = Chapter.deLevel(tmp_level);
        let ChapterInfo = Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]);
        if(tmp_chapter[0]>Chapter.max_segment || tmp_chapter[1]>Chapter.max_offset){
            tmp_chapter[0]=single_chapter[0]-1;
            tmp_chapter[1]=0;
            return;
        }
        let MonsterInfo = Monster.getMonster(parseInt(ChapterInfo["ai"]));
        let AwardInfo="无";

        if(ChapterInfo["firstCardAward"].length>0){
            if(AwardInfo.length==1)
                AwardInfo = "";
            for(let i in ChapterInfo["firstCardAward"]){
                AwardInfo += Cards.getCardById([ChapterInfo["firstCardAward"][i]])["name"] + "、";
            }
            AwardInfo=AwardInfo.substr(0,AwardInfo.length-1);
            AwardInfo += "(首次奖励)\n";
        }

        if(ChapterInfo["generalCardAward"].length>0)
        {
            if(AwardInfo.length==1)
                AwardInfo = "";
            for(let i in ChapterInfo["generalCardAward"]){
                if(ChapterInfo["generalCardAward"][i]=="random"){
                    AwardInfo += "随机卡牌" + "、";
                }
            }
            AwardInfo=AwardInfo.substr(0,AwardInfo.length-1);
            AwardInfo += "(常规奖励)";
        }
        this.level_name.text=tmp_chapter[0]+"-"+tmp_chapter[1]+"      "+ChapterInfo["name"];
        this.level_description.text=ChapterInfo["description"];
        if(MonsterInfo==undefined){
            this.level_monster_name.text="无战斗";
        }else{
            this.level_monster_name.text=MonsterInfo["name"];
        }

        this.level_award.text=AwardInfo;
    }
    public clickFightBtn(){
        // 判断是否有剧情
        let single_chapter = Chapter.deLevel(UserInfo.tmp_level);
		let tmp_chapter = Chapter.deLevel( UserInfo.single_level);
        let nowChapter = Chapter.getChapter(single_chapter[0],single_chapter[1]);
        let context = nowChapter["context_begin"];
        // 无开始剧情
        if(context.length == 0){
            SceneManager.getInstance().storyGamePage.nowChapter = nowChapter;
            UserInfo.adventureStatus = false;           //  设定已经播放片头
            UserInfo.battleType = 1;                    // 设定战斗类型为1
            this.hideInfoPanel();
            var adventureGame  = {username: UserInfo.username, password: UserInfo.password, roleid: UserInfo.roleid};
            SocketAPI.socket.emit('adventureGame', adventureGame);
            UserInfo.singleBattleBackgroundImg = "story_bg_"+0+"_jpg";  //设置默认背景
            console.log('emmit adventure');
        // 有开始剧情
        }else{
            SceneManager.getInstance().changeScene("storyGamePage");
            this.hideInfoPanel();
            this.targetList[this.nowFight].Complelte();
        }
    }
    
    public hideCardPanle(){
        this.BackgroundShadow.visible=false;
        this.AdventureCardPanel.parent.removeChild(this.AdventureCardPanel);
        this.AdventureCardPanel=null;
    }
    public showInfoPanel(index:number){
        this.infoPanel.visible = true;
        this.hideShadow.visible = true;
        this.adventureCardPool.visible=false;
        this.adventureCardGroupText.visible = false;
        // this.goBack.visible=false;
        this.nowFight=index;

    }

    public hideInfoPanel(){
        this.infoPanel.visible=false;
        this.hideShadow.visible=false;
        this.adventureCardPool.visible=true;
        this.adventureCardGroupText.visible = true;
        // this.goBack.visible=true;
    }
    private openCardPanel(){
        if(!this.AdventureCardPanel){
            var AdventureCardPanel =new CardEditor();
            AdventureCardPanel.x = (1136-795.2)/2;
            AdventureCardPanel.y = (640-448)/2;
            this.Main.addChild(AdventureCardPanel);
            this.BackgroundShadow.visible=true;
            this.AdventureCardPanel=AdventureCardPanel;
            this.isEditor=true;
        }
    }
}
