class Login extends eui.Component implements  eui.UIComponent {
	public login:eui.Image;
  public startGame:eui.Label;
  public static loginPass = false;
  public loginStatus = false;     // 登录为true，否则为false
  // 遮罩
  public loginShadeGroup:eui.Group;

	public constructor() {
		super();
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}


	public init(){
		this.login.touchEnabled = true;
    let xP = 364/1136;
      let yP = 424/640;
      let wP = 409/1136;
      let hP = 156/640;
    
    // console.log('$$$$$$$ Main.development: ', Main.development);
    if(!Main.development){
      // 微信版本使用
      this.createWxInfoBtn(xP,yP,wP,hP);
    }

    this.startGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginTouch, this);
	}
  public createWxInfoBtn(xPercent,yPercent,wPercent,hPercent){
    //创建微信用户信息获取按钮
    let wx = platform.wx;
    	let sysInfo = wx.getSystemInfoSync();
			let sdkVersion = sysInfo.SDKVersion;
		//获取微信界面大小
		  let width = sysInfo.screenWidth;
		  let height = sysInfo.screenHeight;
			if (sdkVersion >= "2.0.1") {
				let button = wx.createUserInfoButton({
					type: 'text',
					text: '',
					//image: "resource/assets_game/main/button_wx_getuserinfo.png",
					style: {
						left: width*xPercent,
						top: height*yPercent,
						width: width*wPercent,
						height: height*hPercent,
						// backgroundColor: '#ff0000',
						//color: '#ffffff',
					}
				});
				button.onTap(async (res) => {
          button.hide();
          this.startGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginTouch, this);
          this.startGame.visible = false;
          let loginRes;
          //显示遮罩层
          // this.showShade();
          if(Login.loginPass!=false){
            loginRes = true;
          }else{
            loginRes = await this.getUserData();
          }
          if(loginRes){
            this.loginSuccessHandle();
          }else{
            this.hideShade();
            console.log("[*]Error: 登录失败");
          }
          // button.hide();
				});
			}
  }

	private async loginTouch(){
    //显示遮罩层

    this.showShade();
    //取消监听
    console.log("取消登录监听");
    this.startGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginTouch, this);
    this.startGame.visible = false;
    let loginRes;
    if(!Main.development){
      //微信版本使用
      if(Login.loginPass!=false){
        loginRes = true;
      }else{
        loginRes=await this.getUserData();
      }
    }else{
      //本地版本使用
      UserInfo.updatUseridPassword('admin_rt', 'admin123');
      loginRes=true;
    }

		if(loginRes){
      this.loginSuccessHandle();
    }else{
      console.log("[*]Error: 登录失败");
    }
  }
  private async loginSuccessHandle(){
    if(this.loginStatus == false){
      this.loginStatus = true;
       console.log("登陆成功");
      // this.hideShade();
      this.showShade();
      var loginReply = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
      
      this.handelLoginReply(loginReply);
      SceneManager.getInstance().socketOn();
      await SocketAPI.socket.emit('resurgence', {username: UserInfo.username, password: UserInfo.password});
      SceneManager.getInstance().changeScene('mainPage');
    }
   
  }

	public async getUserData() {
		let wx = platform.wx;
    return new Promise((resolve, reject) => {
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success(data) {
                  let userinfo = data.userInfo;
                  console.log("微信原生用户信息:",userinfo);
                  wx.login({
                    success(res) {
                      if (res.code) {
                        let optionData = {
                          code: res.code,
                          userInfo: JSON.stringify(userinfo)
                        };
                        // 发起网络请求
                        wx.request({
                          url: SocketAPI.urllist["wxLogin"],
                          data: optionData,
                          success(res) {
                            res = res["data"];
                            if (res["errno"] == 0) {
                              let userinfo = res["data"]["userinfo"];
                              console.log(userinfo);
                              UserInfo.updatUseridPassword(userinfo["username"], userinfo["weixin_openid"]);
                              UserInfo.updateUserWxInfo(userinfo["nickname"], data.userInfo["avatarUrl"]);
                              resolve(true);
                            } else {
                              console.log("[*] Error: 微信登录失败", res);
                              resolve(false);
                            }
                          }
                        });
                      } else {
                        console.log('登录失败！' + res.errMsg)
                      }
                    }
                  })
                }
              });
            } else {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  wx.getUserInfo({
                    success(data) {
                      let userinfo = data.userInfo;
                      wx.login({
                        success(res) {
                          if (res.code) {
                            let optionData = {
                              code: res.code,
                              userInfo:JSON.stringify(userinfo)
                            };
                            // 发起网络请求
                            wx.request({
                              url: SocketAPI.urllist["wxLogin"],
                              data: optionData,
                              success(res) {
                                res = res["data"];
                                if (res["errno"] == 0) {
                                  let userinfo = res["data"]["userinfo"];
                                  console.log(userinfo);
                                  UserInfo.updatUseridPassword(userinfo["username"], userinfo["weixin_openid"]);
                                  UserInfo.updateUserWxInfo(userinfo["nickname"],data.userInfo["avatarUrl"]);
                                  resolve(true);
                                } else {
                                  console.log("[*] Error: 微信登录失败", res);
                                  resolve(false);
                                }
                              }
                            });
                          } else {
                            console.log('登录失败！' + res.errMsg)
                            resolve(false);
                          }
                        }
                      })
                    }
                  });
                }
              })
            }
          }
        })
    });
}



	public async handelLoginReply(response){
		if(response['errno'] == 0){
			this.loadCards();
			this.loadRoles();
			this.loadChapters();
			this.loadMonsters();
      this.loadResources();
			UserInfo.updateUserInfo(response);
		}else{
			//TODO: 处理其他errno
      console.log("Error! 登录返回状态码错误");
		}
	}

	public async loadCards(){
		var cards = await SocketAPI.getPostReply(SocketAPI.urllist["Cards"], UserInfo.UserInfoString);
		Cards.setCardsData(cards["data"]);
		return;
	}
  public async loadResources(){
    let resource = await SocketAPI.getPostReply(SocketAPI.urllist["resource"], UserInfo.UserInfoString);
		if(resource["errno"]==0){
			Resource.updateResource(resource["data"]);
		}else{
			console.log("[*] Error occured when post resource data.");
		}
  }
	public async loadChapters(){
		var chapters = await SocketAPI.getPostReply(SocketAPI.urllist["chapter"], UserInfo.UserInfoString);
		if(chapters["errno"]==0){
			Chapter.updateChapter(chapters["data"]);
		}else{
			console.log("[*] Error occured when post chapter data.");
		}

	}
	public async loadMonsters(){
		var monsters = await SocketAPI.getPostReply(SocketAPI.urllist["monster"], UserInfo.UserInfoString);
		if(monsters["errno"]==0){
			Monster.updateMonster(monsters["data"]);
		}else{
			console.log("[*] Error occured when post monster data.");
		}
	}
	public async loadRoles(){
		var roles = await SocketAPI.getPostReply(SocketAPI.urllist["Roles"], UserInfo.UserInfoString);
    Roles.updateRoles(roles['data']);
		return
	}

	public release(){
		if(this.login.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			//释放监听
		}
	}

  // 显示遮罩
  public showShade(){
    //打开遮罩层
    console.log("打开遮罩层");
    this.loginShadeGroup.visible = true;
  }

  public hideShade(){
    //关闭遮罩层
    this.loginShadeGroup.visible = false;
  }

}
