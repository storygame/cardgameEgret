// // 用于微信发布
// declare let io: any;
declare interface Window {
	io: any
}


class SocketAPI{
	// public static RootUrl ="https://storygame.top:8360/";
	// public static SocketUrl = "wss://storygame.top:8360";

	public static SocketUrl = "127.0.0.1:8360";
	public static RootUrl ="http://127.0.0.1:8360/";


	public static urllist = {
		"ApiRootUrl" : SocketAPI.RootUrl,
		"IndexUrl": SocketAPI.RootUrl + "index/index",
		"Login": SocketAPI.RootUrl + "player/login",
		"Cards": SocketAPI.RootUrl + "card/selectCards",
		"Roles": SocketAPI.RootUrl + "role/roleInfo",
		"addFriend": SocketAPI.RootUrl + "player/addFriend",
		"chapter": SocketAPI.RootUrl + "chapter/selectChapters",
		"monster": SocketAPI.RootUrl + "monster/selectMonsters",
		"wxLogin": SocketAPI.RootUrl + "player/wxLogin",
		"activeRole": SocketAPI.RootUrl + "player/activeRole",
		"buyCard": SocketAPI.RootUrl + "player/buyCardBag",
		"resource": SocketAPI.RootUrl + "resource/selectResource",
		"checkin": SocketAPI.RootUrl + "player/checkin",
		"getMail": SocketAPI.RootUrl + "mail/selectMail",
		"readMail": SocketAPI.RootUrl + "mail/readMail",
		"removeCard": SocketAPI.RootUrl + "player/deleteTmpCard"
	}

	// 用于微信发布
	// static socket;

	static socket: SocketIOClient.Socket;


	public static async getPostReply(url: string, data: string){
		//注意此处请求数据格式： "username=test&password=test123456"
		let replyData = await this.postRequest(url, data);
		if(typeof replyData == "string")
			return JSON.parse(replyData);
		else
			return replyData;
    }

	public static async postRequest(url: string, data: string): Promise<any> {
		return new Promise<any>(function (resolve, reject) {
			const request = new XMLHttpRequest();
			request.withCredentials = true;
			request.open('POST', url);
			request.onload = function () {
				if (request.status === 200) {
					resolve(request.response);
	        	} else {
					reject(new Error(request.statusText));
	        	}
			};
			request.onerror = function () {
				reject(new Error('XMLHttpRequest Error: ' + request.statusText));
			};
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(data);
    	});
    }


}
