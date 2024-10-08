/*
 * @Author: your name
 * @Date: 2022-01-03 22:09:41
 * @LastEditTime: 2022-02-08 10:48:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \RPGMV-project\sourceCodeFile\rpg_windows\33 Window_ScrollText.js
 */

//-----------------------------------------------------------------------------
// Window_ScrollText
// 窗口滚动文本
// The window for displaying scrolling text. No frame is displayed, but it
// is handled as a window for convenience.
// 显示滚动文本的窗口.没有显示框但运用一个窗口比较方便

function Window_ScrollText() {
	this.initialize.apply(this, arguments);
}

//设置原形
Window_ScrollText.prototype = Object.create(Window_Base.prototype);
//设置创造者
Window_ScrollText.prototype.constructor = Window_ScrollText;
//初始化
Window_ScrollText.prototype.initialize = function () {
	var width = Graphics.boxWidth;
	var height = Graphics.boxHeight;
	Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	this.opacity = 0;
	this.hide();
	this._text = "";
	this._allTextHeight = 0;
};
//更新
Window_ScrollText.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	if ($gameMessage.scrollMode()) {
		if (this._text) {
			this.updateMessage();
		}
		if (!this._text && $gameMessage.hasText()) {
			this.startMessage();
		}
	}
};
//开始消息
Window_ScrollText.prototype.startMessage = function () {
	this._text = $gameMessage.allText();
	this.refresh();
	this.show();
};
//刷新
Window_ScrollText.prototype.refresh = function () {
	var textState = {
		index: 0,
	};
	textState.text = this.convertEscapeCharacters(this._text);
	this.resetFontSettings();
	this._allTextHeight = this.calcTextHeight(textState, true);
	this.createContents();
	this.origin.y = -this.height;
	this.drawTextEx(this._text, this.textPadding(), 1);
};
//内容高
Window_ScrollText.prototype.contentsHeight = function () {
	return Math.max(this._allTextHeight, 1);
};
//更新消息
Window_ScrollText.prototype.updateMessage = function () {
	this.origin.y += this.scrollSpeed();
	if (this.origin.y >= this.contents.height) {
		this.terminateMessage();
	}
};
//滚动速度
Window_ScrollText.prototype.scrollSpeed = function () {
	var speed = $gameMessage.scrollSpeed() / 2;
	if (this.isFastForward()) {
		speed *= this.fastForwardRate();
	}
	return speed;
};
//是快发送
Window_ScrollText.prototype.isFastForward = function () {
	if ($gameMessage.scrollNoFast()) {
		return false;
	} else {
		return Input.isPressed("ok") || Input.isPressed("shift") || TouchInput.isPressed();
	}
};
//快发送比例
Window_ScrollText.prototype.fastForwardRate = function () {
	return 3;
};
//终止消息
Window_ScrollText.prototype.terminateMessage = function () {
	this._text = null;
	$gameMessage.clear();
	this.hide();
};
