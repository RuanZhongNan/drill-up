//-----------------------------------------------------------------------------
/**包含游戏窗口的层
 * The layer which contains game windows.
 * 窗口层
 * @class WindowLayer
 * @constructor
 */
function WindowLayer() {
	this.initialize.apply(this, arguments);
}

WindowLayer.prototype = Object.create(PIXI.Container.prototype);
WindowLayer.prototype.constructor = WindowLayer;
//初始化
WindowLayer.prototype.initialize = function () {
	PIXI.Container.call(this);
	this._width = 0;
	this._height = 0;
	this._tempCanvas = null;
	this._translationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

	this._windowMask = new PIXI.Graphics();
	//填充颜色，且不透明。填充白色。
	this._windowMask.beginFill(0xffffff, 1);
	this._windowMask.drawRect(0, 0, 0, 0);
	this._windowMask.endFill();
	this._windowRect = this._windowMask.graphicsData[0].shape;

	this._renderSprite = null;
	this.filterArea = new PIXI.Rectangle();
	this.filters = [WindowLayer.voidFilter];
};

WindowLayer.voidFilter = new PIXI.filters.VoidFilter();

/**在窗口层的宽度
 * The width of the window layer in pixels.
 *
 * @property width
 * @type Number
 */
//定义属性
Object.defineProperty(WindowLayer.prototype, "width", {
	get: function () {
		return this._width;
	},
	set: function (value) {
		this._width = value;
	},
	configurable: true,
});

/**在窗口层中高度
 * The height of the window layer in pixels.
 *
 * @property height
 * @type Number
 */
//定义属性
Object.defineProperty(WindowLayer.prototype, "height", {
	get: function () {
		return this._height;
	},
	set: function (value) {
		this._height = value;
	},
	configurable: true,
});

/**设置X，Y，宽度和高度
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window layer
 * @param {Number} y The y coordinate of the window layer
 * @param {Number} width The width of the window layer
 * @param {Number} height The height of the window layer
 */
WindowLayer.prototype.move = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

/**更新窗口层对于每一帧
 * Updates the window layer for each frame.
 *
 * @method update
 */
WindowLayer.prototype.update = function () {
	this.children.forEach(function (child) {
		if (child.update) {
			child.update();
		}
	});
};

/**渲染画布
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype.renderCanvas = function (renderer) {
	if (!this.visible || !this.renderable) {
		return;
	}

	if (!this._tempCanvas) {
		this._tempCanvas = document.createElement("canvas");
	}

	this._tempCanvas.width = Graphics.width;
	this._tempCanvas.height = Graphics.height;

	var realCanvasContext = renderer.context;
	var context = this._tempCanvas.getContext("2d");

	context.save();
	context.clearRect(0, 0, Graphics.width, Graphics.height);
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.closePath();
	context.clip();

	renderer.context = context;

	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (child._isWindow && child.visible && child.openness > 0) {
			this._canvasClearWindowRect(renderer, child);
			context.save();
			child.renderCanvas(renderer);
			context.restore();
		}
	}

	context.restore();

	renderer.context = realCanvasContext;
	renderer.context.setTransform(1, 0, 0, 1, 0, 0);
	renderer.context.globalCompositeOperation = "source-over";
	renderer.context.globalAlpha = 1;
	renderer.context.drawImage(this._tempCanvas, 0, 0);

	for (var j = 0; j < this.children.length; j++) {
		if (!this.children[j]._isWindow) {
			this.children[j].renderCanvas(renderer);
		}
	}
};

/**画布清除窗口矩形
 * @method _canvasClearWindowRect
 * @param {Object} renderSession
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._canvasClearWindowRect = function (renderSession, window) {
	var rx = this.x + window.x;
	var ry = this.y + window.y + (window.height / 2) * (1 - window._openness / 255);
	var rw = window.width;
	var rh = (window.height * window._openness) / 255;
	renderSession.context.clearRect(rx, ry, rw, rh);
};

/**渲染webgl
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype.renderWebGL = function (renderer) {
	if (!this.visible || !this.renderable) {
		return;
	}

	renderer.currentRenderer.flush();
	this.filterArea.copy(this);
	renderer.filterManager.pushFilter(this, this.filters);
	renderer.currentRenderer.start();

	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (child._isWindow && child.visible && child.openness > 0) {
			this._maskWindow(child);
			renderer.maskManager.pushScissorMask(this, this._windowMask);
			renderer.clear();
			renderer.maskManager.popScissorMask();
			renderer.currentRenderer.start();
			child.renderWebGL(renderer);
			renderer.currentRenderer.flush();
		}
	}

	renderer.filterManager.popFilter();
	renderer.maskManager.popScissorMask();

	for (var j = 0; j < this.children.length; j++) {
		if (!this.children[j]._isWindow) {
			this.children[j].renderWebGL(renderer);
		}
	}
};

/**遮蔽窗口
 * @method _maskWindow
 * @param {Window} window
 * @private
 */
//遮蔽窗口
WindowLayer.prototype._maskWindow = function (window) {
	this._windowMask._currentBounds = null;
	this._windowMask.boundsDirty = true;
	var rect = this._windowRect;
	rect.x = window.x;
	rect.y = window.y + (window.height / 2) * (1 - window._openness / 255);
	rect.width = window.width;
	rect.height = (window.height * window._openness) / 255;
};

// The important members from Pixi.js
//Pixi.js的重要成员

/**窗口层的x坐标
 * The x coordinate of the window layer.
 *
 * @property x
 * @type Number
 */

/**窗口层的y坐标
 * The y coordinate of the window layer.
 *
 * @property y
 * @type Number
 */

/**[只读]窗口层子项的数组
 * [read-only] The array of children of the window layer.
 *
 * @property children
 * @type Array
 */

/**[只读]包含窗口层的对象
 * [read-only] The object that contains the window layer.
 *
 * @property parent
 * @type Object
 */

/**容器增加子项
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**添加一个子项到容器中指定索引处
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**从容器中删除一个子项
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**从指定索引位置的删除一个子项
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */
