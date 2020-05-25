class RoleLibPage extends eui.Component implements  eui.UIComponent {

	public clsBtn:eui.Image;
	public leftBtn:eui.Button;
	public rightBtn:eui.Button;
	public iconNum:eui.Label;
	public roleImg:eui.Image;
	public unlock:eui.Group;
	public unlocckRoles: any;
	public allRoles:any;
	public Nowroles=0;
	public selfInfoScroller:eui.Scroller;
	public roleInfoLabel:eui.Label;
	public InsufficientGroup:eui.Group;
	public ActiveRoleMap: {};	// id -- RoleObject 键值对， RoleObject 含active
	public roleList = [];	// RoleObject,  RoleObject 含active
	public currentRoleId: number;

	public purchaseResultGroup:eui.Group;
	public purchaseResultLabel:eui.Label;
	public backToRoleLibBtn:eui.Image;



	public constructor() {
		super();
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.init();
		this.addLinsters();
	}



	private async init(){

		//更新角色信息
      	
		this.updateRole();	
		
		this.clsBtn.touchEnabled = true;
		this.leftBtn.touchEnabled = true;
		this.rightBtn.touchEnabled = true;
		//this.unlock.touchEnabled = true;
		this.iconNum.text =String(UserInfo.coins);
		this.initRole();

		// 取消滚动条可见以及水平滚动
		this.selfInfoScroller.verticalScrollBar.autoVisibility = false;
		this.selfInfoScroller.verticalScrollBar.visible = false;
		this.selfInfoScroller.horizontalScrollBar.autoVisibility = false;
		this.selfInfoScroller.horizontalScrollBar.visible = false;
		this.selfInfoScroller.scrollPolicyH = "off";
		this.selfInfoScroller.scrollPolicyV = "on";

		// 购买结果面板
		this.purchaseResultGroup.visible = false;
		var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
		UserInfo.updateUserInfo(loginReply);


	}

	public addLinsters(){
		this.unlock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.unlockRole, this)
		this.clsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePage, this);
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftrole, this);
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightrole, this);
		this.backToRoleLibBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.purchaseResultGroup.visible = false}, this);
	}

	public rightrole(){
		this.jellyBtn(this.rightBtn, 200);
		let upper = Roles.roles.length-1;
		let lower = 0;
		this.Nowroles +=1;
		if(this.Nowroles>upper){
			this.Nowroles = lower;
		}
		let currentRole =  this.roleList[this.Nowroles];
		let role_name = currentRole["name"];
		let role_id = currentRole["id"];
		this.currentRoleId = role_id;
		//在设置纹理之前要中英转换
		let resources=Resource.getResource(role_name);
		this.roleImg.texture = RES.getRes("role"+(this.currentRoleId)+"_1_all_png");
		// console.log("资源名：","role"+(this.currentRoleId)+"_1_all_png");
		if(currentRole['active'] == true){
			this.unlock.visible = false;
		}else{
			this.unlock.visible = true;
		}
		this.showContain();
	}

	public leftrole(){	
		this.jellyBtn(this.leftBtn, 200);
		let upper = Roles.roles.length-1;
		let lower = 0;
		this.Nowroles -=1;
		if(this.Nowroles<lower){
			this.Nowroles = upper;
		}
		let currentRole =  this.roleList[this.Nowroles];
		
		let role_name = currentRole["name"];
		let role_id = currentRole["id"];
		this.currentRoleId = role_id;
		//在设置纹理之前要中英转换
		let resources=Resource.getResource(role_name);
		this.roleImg.texture = RES.getRes("role"+(this.currentRoleId)+"_1_all_png");
		if(currentRole['active'] == true){
			this.unlock.visible = false;
		}else{
			this.unlock.visible = true;
		}
		this.showContain();
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

    private initRole():void{
		this.Nowroles = 0
		this.unlock.visible = false;
		let currentRole =  this.roleList[this.Nowroles];
		let role_name = currentRole["name"];
		let role_id = currentRole["id"];
		this.currentRoleId = role_id;
		//在设置纹理之前要中英转换
		let resources=Resource.getResource(role_name);console.log(role_name);
		this.roleImg.texture = RES.getRes("role"+(this.currentRoleId)+"_1_all_png");
		this.roleInfoLabel.text = '';
		this.roleInfoLabel.text += ('[姓名]  ' + currentRole.name + '\n');
		this.roleInfoLabel.text += ('[职位]  ' + currentRole.race + '\n');
		this.roleInfoLabel.text += ('[技能]  ' + currentRole.skill_name + '\n');
		this.roleInfoLabel.text += ('[技能详情]  ' + currentRole.skill_description + '\n');
		this.roleInfoLabel.text += ('[格言]  ' + currentRole.motto + '\n');
		this.roleInfoLabel.text += ('[喜好]  ' + currentRole.favorite + '\n');
		this.roleInfoLabel.text += ('[梦想]  ' + currentRole.dream + '\n');
		this.roleInfoLabel.text += ('[故事]  ' + currentRole.story + '\n');
		this.roleInfoLabel.text += ('---------------------------------------------------------------\n');
		// console.log("当前角色信息",currentRole);
		for(let i=0;i<currentRole.life_story.length;i++){
			this.roleInfoLabel.text += " \n";
			this.roleInfoLabel.text += ('[事迹'+(i+1)+']  ' + currentRole.life_story[i]+ '\n');	
			this.roleInfoLabel.text += ('---------------------------------------------------------------\n');
		}
    }

	// 
	public async unlockRole(){
		let message = `userid=${UserInfo.userid}&roleid=${this.currentRoleId}`;
		console.log(message);
		var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['activeRole'], message);
		console.log('loginReply: ', loginReply)
		if(loginReply['errno'] == 0){
			// 购买成功
			this.purchaseResultLabel.text = '购买成功';
			this.purchaseResultGroup.visible = true;
			// 更新角色信息
			var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
			UserInfo.updateUserInfo(loginReply);
			this.updateRole();
			this.unlock.visible = false;
			
		}else if(loginReply['errno'] == 1010){
			// 钱不够
			this.purchaseResultLabel.text = '购买失败, 余额不足';
			this.purchaseResultGroup.visible = true;
		}else{
			console.log('error in unlockRole: ', loginReply);
			throw new Error('error in unlockRole');
		}
	}


	public showContain(this){
		let currentRole = this.roleList[this.Nowroles];
		this.roleInfoLabel.text = '';
		this.roleInfoLabel.text += ('[姓名]  ' + currentRole.name + '\n');
		this.roleInfoLabel.text += ('[职位]  ' + currentRole.race + '\n');
		this.roleInfoLabel.text += ('[技能]  ' + currentRole.skill_name + '\n');
		this.roleInfoLabel.text += ('[技能详情]  ' + currentRole.skill_description + '\n');
		this.roleInfoLabel.text += ('[格言]  ' + currentRole.motto + '\n');
		this.roleInfoLabel.text += ('[喜好]  ' + currentRole.favorite + '\n');
		this.roleInfoLabel.text += ('[梦想]  ' + currentRole.dream + '\n');
		this.roleInfoLabel.text += ('[故事]  ' + currentRole.story + '\n');
		// console.log("当前角色信息",currentRole);
		for(let i=0;i<currentRole.life_story.length;i++){
			this.roleInfoLabel.text += ('[事迹'+(i+1)+']  ' + currentRole.life_story[i]+ '\n');	
		}
		
	}


	public closePage():void{
		console.log("closeroleLibPage");
		SceneManager.getInstance().changeScene("mainPage");
	}

	public updateRole(){
		this.ActiveRoleMap={};
		//构建以id为键的map
		for(let i in Roles.roles){
			this.ActiveRoleMap[Roles.roles[i]["id"]]=Roles.roles[i];
		}
		// console.log(UserInfo.activeRole);
		let activeRoleList=[];
		for(let i in UserInfo.activeRole){
			if(UserInfo.activeRole[i]["active"]==true ||UserInfo.activeRole[i]["active"]=="true"){
				this.ActiveRoleMap[UserInfo.activeRole[i]["id"]]["active"]=true;
				activeRoleList.push(this.ActiveRoleMap[UserInfo.activeRole[i]["id"]]);
			}
		}
		
		let unactiveRoleList=[];
		for(let i in Roles.roles){
			let flag=false;
			for(let k in activeRoleList){
				if(activeRoleList[k]["id"]==Roles.roles[i]["id"]){
					flag = true;
					break;
				}
			}

			if(flag == false){
				Roles.roles[i]["active"]=false;
				unactiveRoleList.push(Roles.roles[i]);
			}
		}
		this.roleList= activeRoleList.concat(unactiveRoleList);
		// console.log('[*]', this.roleList);
	}


}