//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

// class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

//     public constructor() {
//         super();
//         this.createView();
//     }

//     private textField: egret.TextField;

//     private createView(): void {
//         this.textField = new egret.TextField();
//         this.addChild(this.textField);
//         this.textField.y = 300;
//         this.textField.width = 480;
//         this.textField.height = 100;
//         this.textField.textAlign = "center";
//     }

//     public onProgress(current: number, total: number): void {
//         this.textField.text = `Loading...${current}/${total}`;
//     }
// }

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        // 当被添加到舞台的时候触发 (被添加到舞台,说明资源组已经加载完成)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this)
    }

    private textField: egret.TextField; // 文本
    private bgImg: egret.Bitmap // 背景图
    private loadImg: egret.Bitmap // loading图标
    public loaded: number;
    public static current_showed: number = 0;
    public static current_actual: number = 0;
    public static total: number = 500;
    public static progressBar: ProgressBar;
    public flag = false;

    private createView(): void {
        var width: number = 1136;
        var height: number = 640;

        // 加载背景
        let backImg = new eui.Image();
        backImg.width = width;
        backImg.height = height;
        backImg.x = Main.xPosition;
        backImg.y = 0;
        backImg.texture = RES.getRes('loading_background1_jpg');

        // 加载名字
        let nameImg = new eui.Image();
        nameImg.texture = RES.getRes('game_name_png');
        nameImg.width = 1187.5;
        nameImg.height = 250;
        nameImg.x = Main.xPosition - 30;
        nameImg.y = 50;

        

        var config: number[][][] = [
            //[["宽度", "高度", "间隙宽度"], ["斜线", "进度条", "进度条背景", "边框"]]
            [[800, 40, 20], [0x19AA90, 0x39C3AE, 0x135050, 0x18547A]],
            [[800, 40, 30], [0x19AA90, 0x39C3AE, 0x135050, 0x18547A]],
            [[800, 40, 40], [0x19AA90, 0x39C3AE, 0x135050, 0x18547A]],
        ];

        var date: number[][];
        var size: number[];
        var color: number[];
        date = config[Math.floor(Math.random() * 3)];
        size = date[0];
        color = date[1];
        LoadingUI.progressBar = new ProgressBar();
        // console.log('LoadingUI.progressBar out load: ', LoadingUI.progressBar)
        // console.log('this out load : ', this);
        
        LoadingUI.progressBar.switch(size, color);
        LoadingUI.progressBar.x = Main.xPosition + 168;
        LoadingUI.progressBar.y = 475;

        // addChild
        this.addChild(backImg);
        this.addChild(nameImg);
        this.addChild(LoadingUI.progressBar);
    }
    // 这个函数在加载中会自动调用
    public onProgress(current: number, total: number): void {
        // console.log('current: ', current);
        // console.log('total: ', total);
        // LoadingUI.current_showed = 0;
        LoadingUI.current_actual = current;
        LoadingUI.total = total;
        if(!this.flag){
            
            egret.startTick(LoadingUI.load, null);
            this.flag = true;
        }

    }

    public static load() {
        if(LoadingUI.current_showed < LoadingUI.current_actual){
            LoadingUI.current_showed ++;
            LoadingUI.progressBar.update(LoadingUI.current_showed/ LoadingUI.total);
        }
        else if((LoadingUI.current_showed == LoadingUI.current_actual) && (LoadingUI.current_actual != LoadingUI.total)){
            LoadingUI.current_showed;
            LoadingUI.progressBar.update(LoadingUI.current_showed/ LoadingUI.total);
        }
        else if(LoadingUI.current_showed == LoadingUI.total){
            egret.stopTick(LoadingUI.load, null);
            LoadingUI.progressBar.stop();
                // SceneManager.getInstance().changeScene('login');
            // LoadingUI.progressBar.update(LoadingUI.current_showed/ LoadingUI.total);
        }
        return false;
    };
}

class ProgressBar extends egret.DisplayObjectContainer {

	private scrollbar1: egret.Bitmap;
	private scrollbar2: egret.Bitmap;
	private swidth: number;
	private func: Function;

	public constructor() {
		super();
	}

	private setStyle(size: number[], color: number[]): void {
		var width: number = size[0];
		var height: number = size[1];
		
		var shape: egret.Shape = new egret.Shape();
		var graphics: egret.Graphics = shape.graphics;
        graphics.beginFill(color[3]);
        graphics.drawRoundRect(0, 0, width, height, height);
		graphics.endFill();
		this.addChild(shape);
		shape = new egret.Shape();
		graphics = shape.graphics;
        graphics.beginFill(color[2]);
        graphics.drawRoundRect(5, 5, width - 10, height - 10, height - 10);
        graphics.endFill();
		this.addChild(shape);

		var spacing: number = size[2];
		var amount: number = Math.floor(width / spacing);
		var swidth: number = amount * spacing;
		shape = new egret.Shape();
        graphics = shape.graphics;
        graphics.beginFill(color[1]);
        graphics.drawRect(0, 0, swidth, height);
        graphics.lineStyle(5, color[0]);
        for (var i = 0; i < amount; i++) {
            graphics.moveTo(i * spacing, 0);
            graphics.lineTo((i + 1) * spacing, height);
        }
		graphics.endFill();
        // console.log('2222222222222')
        var renderTexture: egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(shape);
		var scrollbar1: egret.Bitmap = new egret.Bitmap(renderTexture);
		var scrollbar2: egret.Bitmap = new egret.Bitmap(renderTexture);
		scrollbar1.x = -swidth;
		var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		this.scrollbar1 = scrollbar1;
		this.scrollbar2 = scrollbar2;
		this.swidth = swidth;
		container.addChild(scrollbar1);
		container.addChild(scrollbar2);
		this.addChild(container);

		shape = new egret.Shape();
		graphics = shape.graphics;
		this.func = (function(): Function {
			var w: number = width - 14;
			var h: number = height - 14;
			var halfH: number = height / 2;
			return function(progress: number): void {
				var $w: number = progress * w;
				var $h: number = h;
				if ($w < h) $h = $w;
				graphics.clear();
				graphics.beginFill(0x000000);
				graphics.drawRoundRect(7, halfH, $w, $h, $h);
				graphics.endFill();
				shape.anchorOffsetY = shape.height / 2;
			};
		})();
		this.func(0);
		this.addChild(shape);
		container.mask = shape;
	}

	private animation(): boolean {
		var scrollbar1: egret.Bitmap = this.scrollbar1;
		var scrollbar2: egret.Bitmap = this.scrollbar2;
		var speed: number = 2;
		var width: number = this.swidth;
		scrollbar1.x += speed;
		scrollbar2.x += speed;
		if (scrollbar1.x > width) scrollbar1.x = scrollbar2.x - width;
		if (scrollbar2.x > width) scrollbar2.x = scrollbar1.x - width;
		return false;
	}

	public start(): void {
		egret.startTick(this.animation, this);
	}

	public stop(): void {
		egret.stopTick(this.animation, this);
		//if (this.parent != null) this.parent.removeChild(this);
	}

	public update(progress: number): void {
		this.func(progress);
	}

	public switch(size: number[], color: number[]): void {
		// this.stop();
		// this.removeChildren();
		this.setStyle(size, color);
		this.start();
	}
}


