class GuideShade extends eui.Component implements  eui.UIComponent {

	public backGroundStoryGroup:eui.Group;
	public UserImage1:eui.Image;
	public UserImage2:eui.Image;
	public BottomStoryGroup:eui.Group;
	public BottomStoryText:eui.Label;
	public BottomName:eui.Label;
	public bottomNext:eui.Group;
	public bottomShade:eui.Group;
	public ImgJumpStory:eui.Image;
	public currentName;
	public storyNum = 0;
	public jump_story = false;
	public finishPrintFlag = false;


	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();	
		this.showStory();
		PublicMethod.clickDarken(this.ImgJumpStory, this);
		this.ImgJumpStory.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jumpStory, this);
		this.bottomShade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finifshPrint, this);
		this.bottomNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNext, this);
		
	}

	public showStory(){
		this.currentName = this.guideStory["roles"][this.storyNum]["left"] || this.guideStory["roles"][this.storyNum]["right"];
		this.PrintBottomStoryText(this.guideStory["story"][this.storyNum]);
		this.loadImg(this.guideStory, 0);
	}

	
	protected PrintBottomStoryText(text){
		//关闭中间显示板,打开自己的显示板
		this.BottomStoryGroup.visible = true;
		this.bottomShade.visible = true;
		this.bottomNext.visible = false;
		this.printOneByOne(this.BottomStoryText,this.bottomShade, this.bottomNext, text, 0);
	}

	protected printOneByOne(textLabel, shade, next, text, i){
		let that = this;
		// console.log('text: ', text);
		if(this.jump_story){
			return;
		}else if(!text){
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
			setTimeout(()=>{that.printOneByOne(textLabel, shade, next, text, i)}, 50);
		}
		else{
			shade.visible = false;
			this.BottomName.text= this.currentName;
			textLabel.text = text;
			next.visible = true;
		}
	}

	protected async showNext(){
		this.bottomNext.visible = false;
		this.storyNum += 1;
		if(this.storyNum < this.guideStory['story'].length){
			this.currentName = this.guideStory["roles"][this.storyNum]["left"] || this.guideStory["roles"][this.storyNum]["right"];
			this.PrintBottomStoryText(this.guideStory["story"][this.storyNum]);
			this.loadImg(this.guideStory, this.storyNum);
		}
		if(this.storyNum == this.guideStory['story'].length){
			// this.parent.removeChild(this);
			this.backGroundStoryGroup.visible = false;
			SceneManager.getInstance().mainPage.shadeGroup.visible = false
			// this.battleGuide();
		}
	}

	protected finifshPrint(){
		this.finishPrintFlag = true;
	}

	public jumpStory(){
		this.finifshPrint();
		// this.parent.removeChild(this);
		this.backGroundStoryGroup.visible = false;
		SceneManager.getInstance().mainPage.shadeGroup.visible = false
		// this.battleGuide();
	}

	protected loadImg(story,index){			
		if(story["roles"][index]["left"]!=undefined){
			if(story["roles"][index]["left"] == "探员A"){
				this.UserImage1.texture = RES.getRes("role_standard_png");
				this.UserImage1.visible = true;		
				return;
			}
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
			if(story["roles"][index]["right"] == "探员A"){
				this.UserImage2.texture = RES.getRes("role_standard_png");
				this.UserImage2.visible = true;				
				return;
			}
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
		if(story["roles"][index]["right"]==undefined && story["roles"][index]["left"]==undefined){
			this.UserImage2.visible = false;
			this.UserImage1.visible = false;
		}
	}


	public battleGuide(){
		SceneManager.getInstance().mainPage.shadeGroup.visible = false;
		this.backGroundStoryGroup.visible = false;
		PublicMethod.createShape(650, 295, 60, this.width, this.height, this);
	}
	


	public guideStory = 
		{
			id: 'backgroundStory',
			story: [
				"你好，我是时空管理局调查A组组长，乐正箐。",
				"组长您好，我是洛柔依，今天才入职调查组。",
				"按照惯例，我会给你讲解调查组的工作，这些知识十分重要，在关键时刻会决定你的性命！",
				"（认真~）好的组长。",
				"正如你所知道的那样，我们时空管理局成立于2297年，是人类为维护多宇宙平行时空的秩序，保障自身宇宙的安全而成立的，而我们调查组，是隶属于时空管理局的行动机关。",
				"所谓平行时空不稳定波动事件，就是发生于平行时空时间线上的特异事件，这些事件会造成时空扭曲，如果不进行纠正的话，严重的时间特异点会影响平行宇宙的稳定，继而危害到当前宇宙的自洽程度。",
				"每次时空事件调查，都要保证最小化目标宇宙的熵增，所以每次只有一名时空管理局的探员会被派去执行任务，与之配合的是一名联络员。联络员的工作多由新人担任，没有危险。只有工作多年的高级资深探员才能担任执行者的任务。",
				"由于每次时空探查所实际经历的时间流与当前宇宙时空流并不相同，在执行者执行任务时是无法与管理局联络的，而联络员就负责在静置空间中执行量子观测行为，向管理局和执行者传输必要信息。",
				"（认真~）知道了组长。",
				"今天的介绍就到这里了，你先去工作了，希望你能快速适应，在这里，你会见到很多不可思议的事情。",
				"不可思议的事情？",
				"等你执行任务时就知道了。",
				"> 一个月后 <   — 时空管理局 — ",
				"组长，您终于来了！",
				"情况怎么样？",
				"不容乐观，昨天凌晨我们又观测到一起严重的时空波动事件，这起时空波动事件的位置相当关键，如果任由其发展，可能会导致那个平行时空的现有文明完全毁灭，有很大概率会影响到我们的时空，我们必须要去探查并恢复这次异常事件。",
				"事件初步报告出来了吗？",
				"嗯，这次的目标是M137平行时空 ，观测显示，那是一个和我们的时空有着相似历史的时空，直到近代才完全与我们的时空发生不可融合分叉。目标特异点的时间是公元前700年。",
				"公元前700年，我记得那是春秋时代吧，那里怎么可能发生时空特异事件。",
				"这个我们暂时还没有探查清楚，时间有限，我们能收集到的数据实在太少了，不过既然是与我们时空相似的时空，那么以现在的执行装备是完全可以应付的。",
				"本次任务的执行者是谁？",
				"中枢系统还在调度中，您也知道，现在调查部人手严重不足。",
				"那我去执行本次任务吧，正好我的调度是空闲的。",
				"好的，我立刻向中枢系统登记信息。",
				"组长，我是本次行动的联络员，洛柔依。",
				"好，事不宜迟，我们出发吧!"
			],

			roles: [{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": null,
					"right": "洛柔依"
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": null,
					"right": "洛柔依"
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": null,
					"right": "洛柔依"
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": null,
					"right": "洛柔依"
				},
				{
					"left": "乐正箐",
					"right": null
				},
				{
					"left": null,
					"right": null
				},
				{
					"left": "探员A",
					"right": null
				},
				{
					"left": null,
					"right": "乐正箐"
				},
				{
					"left": "探员A",
					"right": null
				},
				{
					"left": null,
					"right": "乐正箐"
				},
				{
					"left": "探员A",
					"right": null
				},
				{
					"left": null,
					"right": "乐正箐"
				},
				{
					"left": "探员A",
					"right": null
				},
				{
					"left": null,
					"right": "乐正箐"
				},
				{
					"left": "探员A",
					"right": null
				},
				{
					"left": null,
					"right": "乐正箐"
				},
				{
					"left": "探员A",
					"right": null
				},
				{
					"left": "洛柔依",
					"right": null
				},
				{
					"left": null,
					"right": "乐正箐"
				}

		]
	}
	
}