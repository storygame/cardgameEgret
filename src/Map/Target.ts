class Target extends eui.Image{
    public index:number;
    public isAppear:boolean;
    public enable:boolean;
    public adjacent:Array<number>;
    public type:number;//1普通怪物,2.精英怪 3.小Boss 4. 大Boss
    public cx:number;
    public cy:number;

    // public targetList:Array<Target>;
    private adventureMap:AdventureMap;
    public constructor(index:number,x:number,y:number,type:number,adjacent:Array<number>,adventureMap:AdventureMap){
        super();
        this.index=index;
        this.cx=x;
        this.cy=y;
        this.adjacent=adjacent;
        this.type=type;
        this.enable=false;
        this.isAppear=false;
        this.adventureMap=adventureMap;
        // console.log("target :"+index+" x:"+x+" ,y: "+y);
        // this.targetList=adventureMap.targetList;
    }
    public beShow(evt:TargetShowEvent){
        if(this.isAppear)return;//如果已经显示，返回
        this.Show();
    }
    public Show(){
        //显示关卡
        var name:string;
        if(this.type==1)name="monster_png";
        else if(this.type==2)name="monster_png";
        else if(this.type==3)name="boss_png";
        else if(this.type==4)name="boss_png";
        // let icon = new eui.Image();
        let icon=this;
        icon.texture=RES.getRes(name);
        // console.log("++++",this.adventureMap.divWidth,this.adventureMap.divHeight,this.cx,this.cy);
        icon.x = this.adventureMap.divWidth*this.cx;
        icon.y = this.adventureMap.divHeight*this.cy;
        // console.log(this.adventureMap.divWidth +"  "+this.cx+ " disx: "+icon.x+" disy: "+icon.y);
        icon.anchorOffsetX=this.width/2;
        icon.anchorOffsetY=this.height/2;
        icon.scaleX=0.5;
        icon.scaleY=0.5;
        // this.addChild(icon);
        this.enable=true;
        this.isAppear=true;
        //添加触摸显示信息的监听
        //只给当前开放的管关卡添加点击事件
        let single_level = UserInfo.single_level;
		let tmp_level = UserInfo.tmp_level;
		let single_chapter = Chapter.deLevel(single_level);
		let tmp_chapter = Chapter.deLevel(tmp_level);
        var distance:number = 6;           /// 阴影的偏移距离，以像素为单位
        var angle:number = 45;              /// 阴影的角度，0 到 360 度
        var color:number = 0x000000;        /// 阴影的颜色，不包含透明度
        var alpha:number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
        var blurX:number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
        var inner:boolean = false;            /// 指定发光是否为内侧发光
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果
        var dropShadowFilter:egret.DropShadowFilter =  new egret.DropShadowFilter( distance, angle, color, alpha, blurX, blurY,
            strength, quality, inner, knockout );
        this.filters = [dropShadowFilter];
        if(this.index==tmp_chapter[1]){
            this.touchEnabled=true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OpenInfo,this);
            //添加发光滤镜
            var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
            var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
            var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
            var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
            var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
            var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
            var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
                strength, quality, inner, knockout );
            this.filters=[dropShadowFilter,glowFilter];
        }else if(this.index<tmp_chapter[1]){
            //打过的关卡加灰色滤镜
            var colorMatrix = [
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0,0,0,1,0
            ];
            var greyColorFilter = new egret.ColorMatrixFilter(colorMatrix);
            this.filters = [dropShadowFilter,greyColorFilter];
        }
        if(this.index==tmp_chapter[1]){
            this.adventureMap.initX=this.x;
            this.adventureMap.initY=this.y;
        }
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Complelte,this);
        //添加与其他关卡的关联
        // for(var i =0;i<this.adjacent.length;i++)
        // {
        //     this.addEventListener(TargetShowEvent.DATE,this.targetList[this.adjacent[i]].beShow,this.targetList[this.adjacent[i]]);
        // }
        // console.log("添加元素");
       
//  console.log("bg begin\n");
        let chapter_bg=new eui.Image;
        chapter_bg.texture=RES.getRes("chapter_bg_png");
        chapter_bg.x=this.x-10; chapter_bg.y=this.y-12;
        chapter_bg.scaleX=0.1;   chapter_bg.scaleY=0.1;
        this.adventureMap.TargetImageList.push(chapter_bg);
        this.adventureMap.adventureMapGroup.addChildAt(chapter_bg,78);

        //  console.log("bg over\n");
         let chapter_label=new eui.Label;
        chapter_label.text=tmp_chapter[0]+"-"+this.index;
        chapter_label.textColor=0xffffff;
        chapter_label.x=this.x+35; chapter_label.y=this.y-12;
        this.adventureMap.TargetLabelList.push(chapter_label);
        this.adventureMap.adventureMapGroup.addChildAt(chapter_label,79);
        this.adventureMap.adventureMapGroup.addChildAt(this,80);
// console.log("label over\n");
        if(this.adventureMap.lastx&&this.adventureMap.lasty&&this.adventureMap.lastcx&&this.adventureMap.lastcy){
            // var shp:egret.Shape = new egret.Shape();
            // shp.graphics.lineStyle(10, 0x442252,1,true,"","","",999,[20,20]);//20，,20代表虚线
            // var x0=this.adventureMap.lastcx*this.adventureMap.lastx//+1/2*this.width*this.scaleX;//起点坐标
            // var y0=this.adventureMap.lastcy*this.adventureMap.lasty//+1/2*this.height*this.scaleY;
            // var x1=this.cx*this.adventureMap.divWidth//+1/2*this.width*this.scaleX;//终点坐标
            // var y1= this.cy*this.adventureMap.divHeight//+1/2*this.height*this.scaleY;
            // shp.graphics.moveTo( x0,y0);
            // shp.graphics.cubicCurveTo(x0,y1,x1,y0 ,x1,y1);
            // shp.graphics.endFill();
            // this.adventureMap.adventureMapGroup.addChildAt(shp,2);

            this.adventureMap.lastcx = this.cx;
            this.adventureMap.lastcy = this.cy;
            this.adventureMap.lastx = this.adventureMap.divWidth;
            this.adventureMap.lasty = this.adventureMap.divHeight;
        }else{
            this.adventureMap.lastcx = this.cx;
            this.adventureMap.lastcy = this.cy;
            this.adventureMap.lastx = this.adventureMap.divWidth;
            this.adventureMap.lasty = this.adventureMap.divHeight;
        }
        return;
    }
    public Complelte(){
        var showEvent = new TargetShowEvent(TargetShowEvent.DATE);
        // 取消触摸显示信息的监听
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.OpenInfo,this);
        //禁用当前关卡
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var greyColorFilter = new egret.ColorMatrixFilter(colorMatrix);
        this.filters = [greyColorFilter];
        this.dispatchEvent(showEvent);//显示相邻关卡
        // for(var i =0;i<this.adjacent.length;i++)//取消与其他关卡的关联
        // {
        //     console.log(this.adjacent[i]+" ");
        //     this.removeEventListener(TargetShowEvent.DATE,this.targetList[this.adjacent[i]].beShow,this.targetList[this.adjacent[i]]);
        // }
    }

    public OpenInfo(){
         this.adventureMap.showInfoPanel(this.index);
    }


}

class TargetShowEvent extends egret.Event//
{
    public static DATE:string = "Show";
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}
