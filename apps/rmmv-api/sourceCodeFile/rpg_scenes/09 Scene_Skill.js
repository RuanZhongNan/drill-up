//-----------------------------------------------------------------------------
// Scene_Skill
// 技能场景
// The scene class of the skill screen.
// 处理技能画面的类

function Scene_Skill() {
	this.initialize.apply(this, arguments);
}

//设置原形
Scene_Skill.prototype = Object.create(Scene_ItemBase.prototype);
//设置创造者
Scene_Skill.prototype.constructor = Scene_Skill;
//初始化
Scene_Skill.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
};
//创建
Scene_Skill.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createSkillTypeWindow();
	this.createStatusWindow();
	this.createItemWindow();
	this.createActorWindow();
	this.refreshActor();
};
//创建技能种类窗口
Scene_Skill.prototype.createSkillTypeWindow = function () {
	var wy = this._helpWindow.height;
	this._skillTypeWindow = new Window_SkillType(0, wy);
	this._skillTypeWindow.setHelpWindow(this._helpWindow);
	this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
	this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
	this._skillTypeWindow.setHandler("pagedown", this.nextActor.bind(this));
	this._skillTypeWindow.setHandler("pageup", this.previousActor.bind(this));
	this.addWindow(this._skillTypeWindow);
};
//创建状态窗口
Scene_Skill.prototype.createStatusWindow = function () {
	var wx = this._skillTypeWindow.width;
	var wy = this._helpWindow.height;
	var ww = Graphics.boxWidth - wx;
	var wh = this._skillTypeWindow.height;
	this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
	this.addWindow(this._statusWindow);
};
//创建物品窗口
Scene_Skill.prototype.createItemWindow = function () {
	var wx = 0;
	var wy = this._statusWindow.y + this._statusWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy;
	this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this._skillTypeWindow.setSkillWindow(this._itemWindow);
	this.addWindow(this._itemWindow);
};
//刷新角色
Scene_Skill.prototype.refreshActor = function () {
	var actor = this.actor();
	this._skillTypeWindow.setActor(actor);
	this._statusWindow.setActor(actor);
	this._itemWindow.setActor(actor);
};
//使用者
Scene_Skill.prototype.user = function () {
	return this.actor();
};
//命令技能
Scene_Skill.prototype.commandSkill = function () {
	this._itemWindow.activate();
	this._itemWindow.selectLast();
};
//当物品确定
Scene_Skill.prototype.onItemOk = function () {
	this.actor().setLastMenuSkill(this.item());
	this.determineItem();
};
//当物品取消
Scene_Skill.prototype.onItemCancel = function () {
	this._itemWindow.deselect();
	this._skillTypeWindow.activate();
};
//播放se为物品
Scene_Skill.prototype.playSeForItem = function () {
	SoundManager.playUseSkill();
};
//用物品
Scene_Skill.prototype.useItem = function () {
	Scene_ItemBase.prototype.useItem.call(this);
	this._statusWindow.refresh();
	this._itemWindow.refresh();
};
//当角色改变
Scene_Skill.prototype.onActorChange = function () {
	this.refreshActor();
	this._skillTypeWindow.activate();
};
