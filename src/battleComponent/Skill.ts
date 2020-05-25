class Skill extends eui.Component implements  eui.UIComponent{
	
	public constructor(useable: number) {
		super();
		this.useableNum = useable;
		this.skinName = 'skill';
	}

	public usedSkillImg:eui.Image;
	public unusedSkillImg:eui.Image;
	public useableNum: number;


	protected childrenCreated():void
	{
		super.childrenCreated();
		if(this.useableNum > 0){
			this.unusedSkillImg.visible = true;
			this.usedSkillImg.visible = false;
		}else{
			this.unusedSkillImg.visible = false;
			this.usedSkillImg.visible = true;
		}
	}

	public reverseBtn() {
		return new Promise((resolve,reject)=>{
			egret.Tween.get(this).to({ skewY: this.skewY + 90 }, 200, egret.Ease.quadOut).call(() => {
				if(this.usedSkillImg.visible == true){
					this.usedSkillImg.visible = false;
				}else{
					this.usedSkillImg.visible = true;
				}
				if(this.unusedSkillImg.visible == true){
					this.unusedSkillImg.visible = false;
				}else{
					this.unusedSkillImg.visible = true;
				}
				this.rotation = 0;
			}).to({ skewY: this.skewY + 180, scaleX: 1, scaleY: 1 }, 200, egret.Ease.quadOut).call(function (): void {
				egret.Tween.removeTweens(this);
				resolve();
			})
		});
	
	}
	

}