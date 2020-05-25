class UserInfo {
	public static username: string;
	public static password: string;
	public static nickname:string;
	public static avatar:string;
	public static userid: number;
	public static roleid: number = 1;
	
	public static UserInfoString: string;
	public static enemyroleid: number = 3;
	public static session: number;
	public static matchReply: string;
	public static opponentReadyGameReply: string;
	public static readyGameReply: string;
	public static beginTurnReply: string;
	public static useCardReply: string;
	public static endTurnReply: string;
	public static forceEndTurnReply: string;
	public static resurgenceReply: string;
	public static closeGameReply: string;
	public static chooseCardReply: string;
	// @watch('statusChange1')
	public static status: number = -1;	//0表示在匹配中,1表示匹配完成但未准备,2表示已准备但未开始游戏,3表示开始对局在游戏中, -1表示未点击匹配
	// @watch('statusChange2')
	public static enemyStatus:number = -1;

	public static adventureStatus=true; //true表示单人冒险,渲染context_begin,false表示渲染context_end.
	public static self_player: string;
	public static enemy_player: string;
	public static coins: number;
	public static friendsList: any[];
	public static activeRole;
	public static chatReply: string;
	public static chatWorldReply: string = 'chatWorldReply';
	public static exp: number;
	public static level: number;
	public static tmp_collection;
	public static cards_collection;
	public static day_mission;
	public static main_mission;
	public static single_level;
	public static tmp_level;
	public static adventureGameReply: string;
	public static WinSingleGame: boolean = false;  //单人剧情，如果胜利为true，失败为false
	public static goBackClicker: number = 0; // 返回按钮触发者: 0:无触发, 1:自己

	public static battleType: number = 0;	//战斗类型 0:无战斗; 1:单人对战; 2:双人对战

	public static levelTable = [55.7, 118.7, 190.9, 274.8, 373.8, 491.7, 633.7, 806.0, 1016.2, 1273.8, 1589.9, 1977.5, 2451.6, 3028.9, 3727.0, 4563.8, 5556.3, 6718.9, 8062.4, 9592.4, 1308.9, 13206.3, 15273.8, 17497.0, 19858.9, 22341.6, 24927.5, 27599.9, 30343.8, 33187.7];
	//{userid:xxx, username: xxx}
	
	public static singleBattleBackgroundImg: string;		//单人战斗背景

	public static music: egret.Sound;						// 音乐
	public static soundChannel: egret.SoundChannel;			// souondChannel

	public static development: boolean = false;				// 

	public static first = true;

	public static updatUseridPassword(username, password){
		UserInfo.username = username;
		UserInfo.password = password;
		UserInfo.UserInfoString = `username=${username}&password=${password}`;
	}
	public static updateUserWxInfo(nickname,avatar){
		console.log("更新微信信息",avatar,nickname);
		UserInfo.avatar=avatar;
		UserInfo.nickname = nickname;
	}
	//仅登录一次更新玩家关卡信息
	public static async updateUserAdventureLevel(){
		var response = await SocketAPI.getPostReply(SocketAPI.urllist['Login'], UserInfo.UserInfoString);
		if(response['errno'] == 0){
			UserInfo.single_level = response["data"]["userinfo"][0]["single_level"];
			UserInfo.tmp_level = response["data"]["userinfo"][0]["tmp_level"];
			UserInfo.tmp_collection = JSON.parse(response["data"]["userinfo"][0]["tmp_collection"]);
			console.log("更新单人关卡信息:",UserInfo.single_level,UserInfo.tmp_level);
		}
	}
	public static updateUserInfo(response){
		if(response['errno'] == 0){
			UserInfo.updateUserId(response['data']['userinfo'][0]['id']);
			UserInfo.updateFriendsList(JSON.parse(response['data']['userinfo'][0]['friends_list']));
			UserInfo.updateCoins(response['data']['userinfo'][0]['coins'])
			UserInfo.updateExp(response['data']['userinfo'][0]['exp']);
			UserInfo.activeRole = JSON.parse(response['data']['userinfo'][0]['active_role']);
			UserInfo.single_level = response["data"]["userinfo"][0]["single_level"];
			UserInfo.main_mission = JSON.parse(response["data"]["userinfo"][0]["main_mission"]);
			UserInfo.day_mission = JSON.parse(response["data"]["userinfo"][0]["day_mission"]);
			UserInfo.cards_collection = JSON.parse(response["data"]["userinfo"][0]["cards_collection"]);
			UserInfo.tmp_level = response["data"]["userinfo"][0]["tmp_level"];
			UserInfo.tmp_collection = JSON.parse(response["data"]["userinfo"][0]["tmp_collection"]);
		}else{
			console.log('data: ', response);
			throw new Error('error in updateUserInfo');
		}
	}
	public static updateUserId(userid){
		UserInfo.userid = userid;
		UserInfo.matchReply = "matchReply" + userid;
		UserInfo.opponentReadyGameReply = "opponentReadyGameReply" + userid;
		UserInfo.readyGameReply = "readyGameReply" + userid;
		UserInfo.beginTurnReply = "beginTurnReply" + userid;
		UserInfo.useCardReply = "useCardReply" + userid;
		UserInfo.endTurnReply = "endTurnReply" + userid;
		UserInfo.forceEndTurnReply = "forceEndTurn" + userid;
		UserInfo.resurgenceReply = "resurgenceReply" + userid;
		UserInfo.closeGameReply = "closeGameReply" + userid;
		UserInfo.chatReply = "chatReply" + userid;
		UserInfo.adventureGameReply = "adventureGameReply" + userid;
		UserInfo.chooseCardReply = "chooseCardReply" + userid;
		
	}

	public static updateRoldId(roleid){
		UserInfo.roleid = roleid;
	}

	public static updateEnemyRoleid(enemyroleid){
		UserInfo.enemyroleid = enemyroleid;
	}

	public static updateFriendsList(friendsList){
		//检查头像是否存在
		for(let i in friendsList){
			if(friendsList[i]["avatar"]==undefined || friendsList[i]["avatar"]==null){
				friendsList[i]["avatar"]="role1_avatar_png";
			}
		}
		UserInfo.friendsList = friendsList;
		
	}

	public static updateCoins(coins){
		UserInfo.coins = coins;
	}
	public static updateLv(exp){
		var lvValue = 1;//从1级开始
		if(exp < UserInfo.levelTable[0]){
			UserInfo.level  = 0;
			return;
		}
		if(exp>=UserInfo.levelTable[UserInfo.levelTable.length-1]){
			UserInfo.level = UserInfo.levelTable.length+1;
			return;
		}
		for(let i = 1; i < UserInfo.levelTable.length-1; i++){
			if(exp >= UserInfo.levelTable[i-1] && exp < UserInfo.levelTable[i])
			{
				UserInfo.level = i;
				return;
			}
		}
	}

	public static updateExp(exp){
		UserInfo.exp = exp;
		UserInfo.updateLv(exp);
	}
}
