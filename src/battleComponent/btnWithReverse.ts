class btnWithReverse extends eui.Component implements  eui.UIComponent {
	
	public constructor(playerNo: number) {
		super();
		this.playerNo = playerNo;
		this.skinName = 'btnWithReverseSkin';
	}

	public enemyTurn:eui.Image;
	public turnOver:eui.Image;
	public playerNo: number;

	protected childrenCreated():void
	{
		super.childrenCreated();
		if(this.playerNo == 1){
			this.turnOver.visible = true;
			this.enemyTurn.visible = false;
		}else{
			this.turnOver.visible = false;
			this.enemyTurn.visible = true;
		}
	}

	public reverseBtn() {
		return new Promise((resolve,reject)=>{
			egret.Tween.get(this).to({ skewX: this.skewX + 90 }, 200, egret.Ease.quadOut).call(() => {
				if(this.enemyTurn.visible == true){
					this.enemyTurn.visible = false;
				}else{
					this.enemyTurn.visible = true;
				}
				if(this.turnOver.visible == true){
					this.turnOver.visible = false;
				}else{
					this.turnOver.visible = true;
				}
				// this.rotation = 0;
			}).to({ skewX: this.skewX + 180, scaleX: 1, scaleY: 1 }, 200, egret.Ease.quadOut).call(function (): void {
				egret.Tween.removeTweens(this);
				resolve();
			})
		});
	}
	
}