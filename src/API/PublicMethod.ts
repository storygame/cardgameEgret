interface UpdateData {
    dir: number;//当前牌面
    changed: boolean;//是否切换了牌面
}

class PublicMethod extends egret.DisplayObjectContainer {

    
	public static cardout: any;
	public static poke;
    public static poke1: any;
	public static poke2: any;
	public static self;
    public static a: number = 0;
    public static ShadowFilter;


    public static getDropShadowFilter(distance=10, angle=45, color=0x000000, alpha=0.7, blurX=32, blurY=32,
			strength=0.65, quality=egret.BitmapFilterQuality.LOW, inner=false, knockout=false,old=true): egret.DropShadowFilter{
        distance = distance || 10; /// 阴影的偏移距离，以像素为单位
        angle = angle || 45;              /// 阴影的角度，0 到 360 度
        color = color || 0x000000;        /// 阴影的颜色，不包含透明度
        alpha = alpha || 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
        blurX = blurX || 32;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        blurY = blurY || 32;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        strength = strength || 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        quality = quality || egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
        inner = inner || false;            /// 指定发光是否为内侧发光
        knockout = knockout || false;            /// 指定对象是否具有挖空效果

        let dropShadowFilter:egret.DropShadowFilter;
        if(old==true && PublicMethod.ShadowFilter){
            dropShadowFilter = PublicMethod.ShadowFilter;
        }else{
            dropShadowFilter =  new egret.DropShadowFilter( distance, angle, color, alpha, blurX, blurY,strength, quality, inner, knockout );
            PublicMethod.ShadowFilter = dropShadowFilter;
        }
        return dropShadowFilter;

    }
    
    // 查询mana
    public static getCardCost(id): number{
        for(let i = 0; i < Cards.cards.length; i++){
            if(Cards.cards[i]['id'] == id){
                return Cards.cards[i]['effect']['card_cost'];
            }
        }
        console.log('can not find card: ', id);
        throw new Error('cna not find card in get card cost');
    }

    // 点击阴影效果
    public static clickDarken(obj, that){
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, PublicMethod.touchBegin, that);
		obj.addEventListener(egret.TouchEvent.TOUCH_END, PublicMethod.touchEndOrReleaseOutside, that);
		obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, PublicMethod.touchEndOrReleaseOutside, that);
		
    }
    // 释放点击监听
    public static releaseClickDarken(obj, that){
        obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, PublicMethod.touchBegin, that);
		obj.removeEventListener(egret.TouchEvent.TOUCH_END, PublicMethod.touchEndOrReleaseOutside, that);
		obj.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, PublicMethod.touchEndOrReleaseOutside, that);
		
    }
    // 按下
	public static touchBegin(e: egret.TouchEvent){
		let target = e.target;
		var colorMatrix = [
			0.8,0,0,0,0,
			0,0.8,0,0,0,
			0,0,0.8,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		target.filters = [colorFlilter];
	}

    // 抬起
	public static touchEndOrReleaseOutside(e: egret.TouchEvent){
		let target = e.target;
		target.filters = null;
	}

    // 遮罩

    public static drawCircle(x, y, r, that):egret.Sprite{
        let sp:egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(0xff0000);
        sp.graphics.drawCircle(x,y,r);
        sp.graphics.endFill();
        that.addChild(sp);
        that['shadeCircle'] = sp;        
        return sp;
    }

    public static init(dp:egret.DisplayObject, w, h, that):void {
        let container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
 
        let bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x505151, 0.7);
        bg.graphics.drawRect(0, 0, w, h);
        bg.graphics.endFill();
 
        container.addChild(bg);
 
        container.addChild(dp);
 
        dp.blendMode = egret.BlendMode.ERASE;
 
        let renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(container);
 
        let bitmap:egret.Bitmap = new egret.Bitmap(renderTexture);
        that.addChild(bitmap);
        that['shadeRect'] = bitmap;
        bitmap.touchEnabled = true;  //允许点击
        bitmap.pixelHitTest = true;  //镂空区域不响应点击，这样可以穿透点击到下面的背景
    }

    public static createShape(x, y, r, w, h, that){
        let sp = PublicMethod.drawCircle(x, y, r, that);
        PublicMethod.init(sp, w, h, that);
    }
}