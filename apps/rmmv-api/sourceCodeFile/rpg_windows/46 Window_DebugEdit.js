//-----------------------------------------------------------------------------
// Window_DebugEdit
// 窗口调试编辑
// The window for displaying switches and variables on the debug screen.
// 显示调试画面开关变量的窗口

function Window_DebugEdit() {
	this.initialize.apply(this, arguments);
}

//设置原形
Window_DebugEdit.prototype = Object.create(Window_Selectable.prototype);
//设置创造者
Window_DebugEdit.prototype.constructor = Window_DebugEdit;
//初始化
Window_DebugEdit.prototype.initialize = function (x, y, width) {
	var height = this.fittingHeight(10);
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._mode = "switch";
	this._topId = 1;
	this.refresh();
};
//最大项目
Window_DebugEdit.prototype.maxItems = function () {
	return 10;
};
//刷新
Window_DebugEdit.prototype.refresh = function () {
	this.contents.clear();
	this.drawAllItems();
};
//绘制项目
Window_DebugEdit.prototype.drawItem = function (index) {
	var dataId = this._topId + index;
	var idText = dataId.padZero(4) + ":";
	var idWidth = this.textWidth(idText);
	var statusWidth = this.textWidth("-00000000");
	var name = this.itemName(dataId);
	var status = this.itemStatus(dataId);
	var rect = this.itemRectForText(index);
	this.resetTextColor();
	this.drawText(idText, rect.x, rect.y, rect.width);
	rect.x += idWidth;
	rect.width -= idWidth + statusWidth;
	this.drawText(name, rect.x, rect.y, rect.width);
	this.drawText(status, rect.x + rect.width, rect.y, statusWidth, "right");
};
//项目名称
Window_DebugEdit.prototype.itemName = function (dataId) {
	if (this._mode === "switch") {
		return $dataSystem.switches[dataId];
	} else {
		return $dataSystem.variables[dataId];
	}
};
//项目状态
Window_DebugEdit.prototype.itemStatus = function (dataId) {
	if (this._mode === "switch") {
		return $gameSwitches.value(dataId) ? "[ON]" : "[OFF]";
	} else {
		return String($gameVariables.value(dataId));
	}
};
//设置模式
Window_DebugEdit.prototype.setMode = function (mode) {
	if (this._mode !== mode) {
		this._mode = mode;
		this.refresh();
	}
};
//设置顶部id
Window_DebugEdit.prototype.setTopId = function (id) {
	if (this._topId !== id) {
		this._topId = id;
		this.refresh();
	}
};
//当前id
Window_DebugEdit.prototype.currentId = function () {
	return this._topId + this.index();
};
//更新
Window_DebugEdit.prototype.update = function () {
	Window_Selectable.prototype.update.call(this);
	if (this.active) {
		if (this._mode === "switch") {
			this.updateSwitch();
		} else {
			this.updateVariable();
		}
	}
};
//更新开关
Window_DebugEdit.prototype.updateSwitch = function () {
	if (Input.isRepeated("ok")) {
		var switchId = this.currentId();
		SoundManager.playCursor();
		$gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
		this.redrawCurrentItem();
	}
};
//更新变量
Window_DebugEdit.prototype.updateVariable = function () {
	var variableId = this.currentId();
	var value = $gameVariables.value(variableId);
	if (typeof value === "number") {
		if (Input.isRepeated("right")) {
			value++;
		}
		if (Input.isRepeated("left")) {
			value--;
		}
		if (Input.isRepeated("pagedown")) {
			value += 10;
		}
		if (Input.isRepeated("pageup")) {
			value -= 10;
		}
		if ($gameVariables.value(variableId) !== value) {
			$gameVariables.setValue(variableId, value);
			SoundManager.playCursor();
			this.redrawCurrentItem();
		}
	}
};
