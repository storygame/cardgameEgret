class LoadingPage extends eui.Component implements  eui.UIComponent {

	// 旋转小圈
	public loadCircleImg:eui.Image;

	public constructor() {
		console.log('loadingPage created');
		super();
		this.addEventListener( egret.Event.REMOVED_FROM_STAGE, () => {
			console.log('loadingPage be removed');			
            if( this.hasEventListener( egret.Event.ENTER_FRAME ) ){
                this.removeEventListener( egret.Event.ENTER_FRAME, this.runLoading, this );
				this.loadCircleImg.rotation = 0;
            }
        }, this );
		
        this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
			console.log('loadingPage be added');
            this.addEventListener( egret.Event.ENTER_FRAME, this.runLoading, this );
        }, this );
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	private runLoading( evt:egret.Event ){
        this.loadCircleImg.rotation += 3;
    }
	
}