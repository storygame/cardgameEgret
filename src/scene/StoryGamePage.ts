class StoryGamePage extends eui.Component implements  eui.UIComponent {

	public SceneImage:eui.Image;
	public UserImage1:eui.Image;
	public UserImage2:eui.Image;
	public BottomStoryGroup:eui.Group;
	public BottomStoryText:eui.Label;
	public MiddleTextGroup:eui.Group;
	public MiddleStoryText:eui.Label;
	public autoFlag: boolean = false;
	public finishPrintFlag: boolean = false;
	public bottomShade:eui.Group;
	public middleShade:eui.Group;
	public middleNext:eui.Group;
	public bottomNext: eui.Group;
	public BottomName:eui.Label;
	public contextNum: number = 0;
	public storyNum:  number = 0;
	public nowChapter;
	public context;
	public before_battle;
	public single_level;
	public tmp_level;
	public jump_story: boolean = false;
	public ImgJumpStory: eui.Image;
	public currentName: string;	//当前人物名称
	public goBack:eui.Image; //返回到地图页面

	// 无对战结算
	public balanceGroup:eui.Group;
	public balancePannel:eui.Group;
	public Coins:eui.Label;
	public Exp:eui.Label;
	public Lv:eui.Label;
	public LvBar:eui.ProgressBar;
	public presentCardScoller:eui.Scroller;
	public presentCardLabel:eui.Label;

	public ticks: number;
	public changeExp: number;

	public endStory: boolean = false;			// 是否为后置剧情 true  是


	public constructor() {
		super();
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.init();
		this.initPresentCardScroller();
	}

	public initPresentCardScroller(){
		// 取消滚动条可见以及水平滚动
		this.presentCardScoller.verticalScrollBar.autoVisibility = false;
		this.presentCardScoller.verticalScrollBar.visible = false;
		this.presentCardScoller.horizontalScrollBar.autoVisibility = false;
		this.presentCardScoller.horizontalScrollBar.visible = false;
		this.presentCardScoller.scrollPolicyV = "off";
	}

	protected init(){
		console.log('init==========')
		this.before_battle = UserInfo.adventureStatus;
		
		this.nowChapter=Chapter.getChapter(1,0);
		
		this.tmp_level = UserInfo.tmp_level;
		this.single_level = UserInfo.single_level;
		let single_chapter = Chapter.deLevel(this.single_level);
		let tmp_chapter = Chapter.deLevel(this.tmp_level);

		// 设置人物不可见
		this.UserImage1.visible = false;
		this.UserImage2.visible = false;
		
		if(single_chapter[0]==tmp_chapter[0] && single_chapter[1]==tmp_chapter[1]){
			// 临时实装跳过
			this.ImgJumpStory.visible = true;
			this.ImgJumpStory.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jumpStory, this);


			//第一次打
			this.nowChapter = Chapter.getChapter(single_chapter[0],single_chapter[1]);
			// 更新对战背景图片
			UserInfo.enemyroleid = this.nowChapter['ai'];
			let len = this.nowChapter["context_begin"][0]["scene"].length;
			UserInfo.singleBattleBackgroundImg = "story_bg_"+this.nowChapter["context_begin"][0]["scene"][len-1]+"_jpg"; 

			if(this.before_battle){
				this.context = this.nowChapter["context_begin"];
			}else{
				// 没有下一段或者战斗失败
				this.nowChapter = Chapter.getChapter(single_chapter[0],single_chapter[1]-1);
				if(this.nowChapter==undefined){
					UserInfo.adventureStatus = true;
					UserInfo.updateUserAdventureLevel();
					SceneManager.getInstance().changeScene('chacpterPage');
					UserInfo.WinSingleGame = false;
					return;
				}else if(this.nowChapter["context_end"]==undefined || this.nowChapter["context_end"]['length']==0 || (!UserInfo.WinSingleGame)){
					// 置为begin剧情
					UserInfo.adventureStatus = true;
					UserInfo.updateUserAdventureLevel();
					SceneManager.getInstance().changeScene('adventureMap');
					UserInfo.WinSingleGame = false;
					return;
				}else{
					this.endStory = true;
					
					this.context = this.nowChapter["context_end"];
				}
			}
		}else{
			console.log('general section')
			//general section		
			// this.ImgJumpStory.visible = true;
			this.ImgJumpStory.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jumpStory, this);
			this.nowChapter = Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]);
			if(this.before_battle){
				this.context = this.nowChapter["context_begin"];
				console.log('this.before_battle')
			}else{
				console.log('this.end_battle')
				this.nowChapter = Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]-1);
				// 没有下一段或者战斗失败
				if(this.nowChapter==undefined){
					UserInfo.adventureStatus = true;
					UserInfo.updateUserAdventureLevel();
					SceneManager.getInstance().changeScene('chacpterPage');
					return;
				}else if(this.nowChapter["context_end"]==undefined || (!UserInfo.WinSingleGame)){
					// 置为begin剧情
					UserInfo.adventureStatus = true;
					UserInfo.updateUserAdventureLevel();
					SceneManager.getInstance().changeScene('adventureMap');
					return;
				}else{
					
					this.endStory = true;
					
					this.context = this.nowChapter["context_end"];
				}
			}
		}
		this.showStory();
		this.goBack.touchEnabled = true;
		this.bottomShade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finifshPrint, this)
		this.middleShade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finifshPrint, this)		
		this.bottomNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNext, this);
		this.middleNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNext, this);
		this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goback, this);
		this.balanceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.balanceGroupClick, this);
		PublicMethod.clickDarken(this.goBack, this);
		PublicMethod.clickDarken(this.ImgJumpStory, this);

	}



	public goback(){
		SceneManager.getInstance().changeScene("adventureMap");
		UserInfo.adventureStatus = true;
	}

	protected async showStory(){

		this.storyNum = 0;
		this.contextNum = 0;
		let story = this.context[this.contextNum];
		
		if(story["pos"]=="middle"){
			this.PrintMidStoryText(story["story"][this.storyNum]);
			this.loadImg(story, 0);
		}else{
			this.currentName = story["roles"][this.storyNum]["left"] || story["roles"][this.storyNum]["right"];
			this.PrintBottomStoryText(story["story"][this.storyNum]);
			this.loadImg(story, 0);
		}
	
	}

	protected loadImg(story,index){
		if(story["roles"][index]["left"]!=undefined){
			let resources=Resource.getResource(story["roles"][index]["left"]);
			if(!resources){
				this.UserImage2.visible = false;
				this.UserImage1.visible = false;
				return;
			}
			this.UserImage1.texture = RES.getRes(resources["name_en"]+"_png");
			this.UserImage2.visible = false;
			this.UserImage1.visible = true;
		}
		//加载人物2图片
		if(story["roles"][index]["right"]!=undefined){
			let resources=Resource.getResource(story["roles"][index]["right"]);
			if(!resources){
				this.UserImage2.visible = false;
				this.UserImage1.visible = false;
				return;
			}
			this.UserImage2.texture = RES.getRes(resources["name_en"]+"_png");
			this.UserImage1.visible = false;
			this.UserImage2.visible = true;
		}

		if((index<story["scene"].length)&& (story["scene"][index]!=undefined) ){
			// UserInfo.singleBattleBackgroundImg = "story_bg_"+story["scene"][index]+"_jpg";
			this.SceneImage.texture=RES.getRes("story_bg_"+story["scene"][index]+"_jpg");
		}
	}
	
	protected PrintBottomStoryText(text){
		//关闭中间显示板,打开自己的显示板
		this.MiddleTextGroup.visible=false;
		this.BottomStoryGroup.visible = true;
		this.bottomShade.visible = true;
		this.bottomNext.visible = false;
		this.printOneByOne(this.BottomStoryText,this.bottomShade, this.bottomNext, text, 0);
	}

	protected PrintMidStoryText(text){
		//关闭底部显示板,打开自己的显示板
		this.MiddleTextGroup.visible=true;
		this.BottomStoryGroup.visible = false;
		this.middleShade.visible = true;
		this.middleNext.visible = false;
		this.printOneByOne(this.MiddleStoryText, this.middleShade, this.middleNext, text, 0);
	}

	protected printOneByOne(textLabel, shade, next, text, i){
		if(this.jump_story){
			return;
		}else if(!text){
			this.changeBackImage();
			this.showNext();
		}else if(i <= text.length){
			if(this.finishPrintFlag == true){
				shade.visible = false;
				this.BottomName.text= this.currentName;
				textLabel.text = text;
				this.finishPrintFlag = false;
				next.visible = true;
				return;
			}
			this.BottomName.text= this.currentName;
			textLabel.text = text.slice(0, i++);
			setTimeout(()=>{this.printOneByOne(textLabel, shade, next, text, i)}, 50);
		}
		else{
			shade.visible = false;
			this.BottomName.text= this.currentName;
			textLabel.text = text;
			next.visible = true;
		}
	}

	protected finifshPrint(){
		this.finishPrintFlag = true;
	}

	protected async showNext(){
		this.bottomNext.visible = false;
		this.middleNext.visible = false;

		if(this.storyNum < this.context[this.contextNum]['story'].length-1){
			let story = this.context[this.contextNum];
			this.currentName = story["roles"][this.storyNum+1]["left"] || story["roles"][this.storyNum+1]["right"];
			if(story["pos"]=="middle"){
				this.PrintMidStoryText(story["story"][++this.storyNum]);
				this.loadImg(story, this.storyNum);
			}else{
				this.PrintBottomStoryText(story["story"][++this.storyNum]);
				this.loadImg(story, this.storyNum);
			}
		}else if(this.contextNum < this.context.length-1){
			let story = this.context[++this.contextNum];
			this.storyNum = 0;
			if(story["pos"]=="middle"){
				this.PrintMidStoryText(story["story"][this.storyNum]);
				this.loadImg(story, this.storyNum);
			}else{
				this.PrintBottomStoryText(story["story"][this.storyNum]);
				this.loadImg(story, this.storyNum);
			}
		}else{			
			this.storyNum = 0;
			this.contextNum = 0;
			// 播放后置剧情
			if(UserInfo.adventureStatus== false){
				// 置为begin剧情
				this.endStory = false;
				UserInfo.adventureStatus = true;
				var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
				if(loginReply['errno'] == 0){
					UserInfo.updateUserInfo(loginReply);
				}
				UserInfo.updateUserAdventureLevel();
				SceneManager.getInstance().changeScene('adventureMap');
				return;

			}
			UserInfo.battleType = 1;
			// 有战斗，进入战斗
			if(this.nowChapter["isFight"]==1 && UserInfo.adventureStatus == true){
				UserInfo.adventureStatus=false; //设置这里,并进入对战,再出来的时候会显示战斗后对战
				var adventureGame  = {username: UserInfo.username, password: UserInfo.password, roleid: UserInfo.roleid};
				SocketAPI.socket.emit('adventureGame', adventureGame);
				console.log('emmit adventure');
			// 无战斗
			}else{
				UserInfo.adventureStatus=false;
				console.log('无战斗');												
				this.dealNoFight();
			}
		}
	}

	protected async jumpStory(){
		UserInfo.battleType = 1;
		console.log('[#]设定对战格式为1在jumpStory: ', UserInfo.battleType);
		this.jump_story = true;
		console.log('this.jumpStory: ', this.jumpStory);
		this.finifshPrint();
		if(this.nowChapter["isFight"]==1 && (UserInfo.adventureStatus == true)){
			UserInfo.adventureStatus=false; //设置这里,并进入对战,再出来的时候会显示战斗后对战
			var adventureGame  = {username: UserInfo.username, password: UserInfo.password, roleid: UserInfo.roleid};
			SocketAPI.socket.emit('adventureGame', adventureGame);
			console.log('emmit adventure');
		// 无战斗
		}else if(this.endStory){
			this.endStory = false;
			UserInfo.adventureStatus = true;
			var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
			if(loginReply['errno'] == 0){
				UserInfo.updateUserInfo(loginReply);
			}
			UserInfo.updateUserAdventureLevel();
			SceneManager.getInstance().changeScene('adventureMap');
		}else{
			UserInfo.adventureStatus=false;
			console.log('无战斗');												
			this.dealNoFight();
		}
		this.jump_story = false;
	}

	public async dealNoFight(){
		console.log('deal no fight and emit closegmae: ');
		var closeGame  = {session: UserInfo.session, userid: UserInfo.userid, noFight:1};
		await SocketAPI.socket.emit('closeGame', closeGame);
	}

	public async dealAdventureGameReply(data){
		console.log('dealAdventureGameReply');
		if(this.nowChapter["isFight"]==1){
			
			//这个剧情有对战,进入对战
			
			let game_info = data["data"];
			UserInfo.session = game_info["session"];
			UserInfo.self_player = "player1";
			UserInfo.enemy_player = "player2";
			SceneManager.getInstance().singleBattlePage.dealReadyGameReply(data);
		}
	}


	public async dealCloseGameReply(data){
		console.log('deal closegame in story game page')
		UserInfo.battleType = 0;
		console.log('设定对战格式为0, UserInfo.battleType: ', UserInfo.battleType);
		
		// 有对战，结算经验
		if(this.nowChapter["isFight"]){
			console.log('[#]有对战，结算经验')
			// 显示结算
			SceneManager.getInstance().singleBattlePage.dealCloseGameReply(data);
		// 无对战，肯定胜利,结算
		}else{
			// 禁用触摸
			this.goBack.touchEnabled = false;
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
			let ChapterInfo = Chapter.getChapter(tmp_chapter[0],tmp_chapter[1]-1);
			let cardList = ChapterInfo["firstCardAward"];
			for(let i = 0; i < cardList.length; i++){
				let cardInfo = Cards.getCardById(cardList[i]);
				if(cardInfo['effect']['card_rare'] == 'N')
					str += `<font color=0xc3c9df>${cardInfo["name"]}</font>`;
				if(cardInfo['effect']['card_rare'] == 'R')
					str += `<font color=0x4e6fff>${cardInfo["name"]}</font>`;
				if(cardInfo['effect']['card_rare'] == 'SR')
					str += `<font color=0x6c2081>${cardInfo["name"]}</font>`;
				if(cardInfo['effect']['card_rare'] == 'SSR')
					str += `<font color=0xe93808>${cardInfo["name"]}</font>`;
				str += '\n';
			}
			if(cardList.length == 0){
				str = '无';
			}
			this.presentCardLabel.textFlow = new egret.HtmlTextParser().parser(str);


			let newLevel = UserInfo.level;
			let changeExp = UserInfo.exp - oldExp;
			console.log('### oldExp: ' ,oldExp)
			console.log('### UserInfo.exp: ', UserInfo.exp);
			this.changeExp = changeExp;
			this.LvBar.maximum = parseInt(UserInfo.levelTable[oldLevel]+"");
			this.LvBar.minimum = 0;
			this.LvBar.value = oldExp;
			this.Lv.text = oldLevel + '';
			this.balanceGroup.visible = true;
			if(this.changeExp != 0){
				this.balanceGroup.touchEnabled = false;
				this.ticks = 0;				// 计数 +1
				var barTimer:egret.Timer = new egret.Timer(50,changeExp);
				barTimer.addEventListener(egret.TimerEvent.TIMER,this.lvBarTween,this);
				barTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.lvBarTweenComplement,this);
				barTimer.start();	
			}

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

	public balanceGroupClick(){
		this.init();
		this.balanceGroup.visible = false;
	}


	protected changeBackImage(){
		console.log('@@@ change backImage to ', this.context[0]['scene'][this.storyNum+1]);
		
	}
}
