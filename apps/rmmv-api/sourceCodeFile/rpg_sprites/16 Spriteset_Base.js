//-----------------------------------------------------------------------------
// Spriteset_Base
// 基础精灵组
// The superclass of Spriteset_Map and Spriteset_Battle.
// 处理 地图精灵 和 战斗精灵 的超级类

function Spriteset_Base() {
	this.initialize.apply(this, arguments);
}

//设置原形
Spriteset_Base.prototype = Object.create(Sprite.prototype);
//设置创造者
Spriteset_Base.prototype.constructor = Spriteset_Base;
//初始化
Spriteset_Base.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.setFrame(0, 0, Graphics.width, Graphics.height);
	this._tone = [0, 0, 0, 0];
	this.opaque = true;
	this.createLowerLayer();
	this.createToneChanger();
	this.createUpperLayer();
	this.update();
};
//创建较下的层
Spriteset_Base.prototype.createLowerLayer = function () {
	this.createBaseSprite();
};
//创建上面的层
Spriteset_Base.prototype.createUpperLayer = function () {
	this.createPictures();
	this.createTimer();
	this.createScreenSprites();
};
//更新
Spriteset_Base.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.updateScreenSprites();
	this.updateToneChanger();
	this.updatePosition();
};
//创建基本精灵
Spriteset_Base.prototype.createBaseSprite = function () {
	this._baseSprite = new Sprite();
	this._baseSprite.setFrame(0, 0, this.width, this.height);
	this._blackScreen = new ScreenSprite();
	this._blackScreen.opacity = 255;
	this.addChild(this._baseSprite);
	this._baseSprite.addChild(this._blackScreen);
};
//创建颜色改变
Spriteset_Base.prototype.createToneChanger = function () {
	if (Graphics.isWebGL()) {
		this.createWebGLToneChanger();
	} else {
		this.createCanvasToneChanger();
	}
};
//创建webgl 颜色改变
Spriteset_Base.prototype.createWebGLToneChanger = function () {
	var margin = 48;
	var width = Graphics.width + margin * 2;
	var height = Graphics.height + margin * 2;
	this._toneFilter = new ToneFilter();
	this._baseSprite.filters = [this._toneFilter];
	this._baseSprite.filterArea = new Rectangle(-margin, -margin, width, height);
};
//创建画布颜色改变
Spriteset_Base.prototype.createCanvasToneChanger = function () {
	this._toneSprite = new ToneSprite();
	this.addChild(this._toneSprite);
};
//创建图画
Spriteset_Base.prototype.createPictures = function () {
	var width = Graphics.boxWidth;
	var height = Graphics.boxHeight;
	var x = (Graphics.width - width) / 2;
	var y = (Graphics.height - height) / 2;
	this._pictureContainer = new Sprite();
	this._pictureContainer.setFrame(x, y, width, height);
	for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
		this._pictureContainer.addChild(new Sprite_Picture(i));
	}
	this.addChild(this._pictureContainer);
};
//创建计时器
Spriteset_Base.prototype.createTimer = function () {
	this._timerSprite = new Sprite_Timer();
	this.addChild(this._timerSprite);
};
//创建画面精灵
Spriteset_Base.prototype.createScreenSprites = function () {
	this._flashSprite = new ScreenSprite();
	this._fadeSprite = new ScreenSprite();
	this.addChild(this._flashSprite);
	this.addChild(this._fadeSprite);
};
//更新画面精灵
Spriteset_Base.prototype.updateScreenSprites = function () {
	var color = $gameScreen.flashColor();
	this._flashSprite.setColor(color[0], color[1], color[2]);
	this._flashSprite.opacity = color[3];
	this._fadeSprite.opacity = 255 - $gameScreen.brightness();
};
//更新颜色改变
Spriteset_Base.prototype.updateToneChanger = function () {
	var tone = $gameScreen.tone();
	if (!this._tone.equals(tone)) {
		this._tone = tone.clone();
		if (Graphics.isWebGL()) {
			this.updateWebGLToneChanger();
		} else {
			this.updateCanvasToneChanger();
		}
	}
};
//更新webgl 颜色改变
Spriteset_Base.prototype.updateWebGLToneChanger = function () {
	var tone = this._tone;
	this._toneFilter.reset();
	this._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
	this._toneFilter.adjustSaturation(-tone[3]);
};
//更新画布颜色改变
Spriteset_Base.prototype.updateCanvasToneChanger = function () {
	var tone = this._tone;
	this._toneSprite.setTone(tone[0], tone[1], tone[2], tone[3]);
};
//更新位置
Spriteset_Base.prototype.updatePosition = function () {
	var screen = $gameScreen;
	var scale = screen.zoomScale();
	this.scale.x = scale;
	this.scale.y = scale;
	this.x = Math.round(-screen.zoomX() * (scale - 1));
	this.y = Math.round(-screen.zoomY() * (scale - 1));
	this.x += Math.round(screen.shake());
};
