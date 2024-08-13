//=============================================================================
// Drill_MouseTriggerEvent.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        鼠标 - 鼠标触发事件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseTriggerEvent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在鼠标悬停、点击事件时，触发事件的独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下列插件才能运行。
 * 基于：
 *   - Drill_EventMouseSwitch        物体-鼠标响应开关
 *   - Drill_EventMouseHoverSwitch   物体-鼠标悬停响应开关
 *     插件需要基于上述插件才能运行。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   作用于事件，单独对鼠标有效。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 * 旧版本：
 *   (1.该插件的实际功能已被分离到 物体-鼠标响应开关 和 物体-鼠标悬停响应开关
 *      两个插件中。
 *   (2.该插件的 事件注释和插件指令 仍然有效，但最好写 基于的插件 的注释和指令，
 *      因为 基于的插件 格式更加标准一些，区分持续触发和单次触发。
 * 细节：
 *   (1.鼠标触发范围为事件行走图大小。空的行走图则表示没有触发范围。
 *      事件必须设置行走图，鼠标触发才能生效。
 *      事件必须设置行走图，鼠标触发才能生效。
 *      事件必须设置行走图，鼠标触发才能生效。
 *      重要的事情说三遍，大部分群友总是犯低级错误，快去好好看文档。
 *      插件主要基于 鼠标悬停响应开关，所以必须要设置行走图，作为悬停范围。
 *   (2.你可以设置对话框弹出时，鼠标仍然可触发事件。
 *      但是，事件指令仍然会被阻塞，只有对话框结束后才会执行事件的指令。
 * 设计：
 *   (1.左键按下 + 移动路线"接近鼠标" + 任何位置左键释放 = 拖拽事件效果。
 *      具体可以去华容道设计关卡看看。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 持续触发
 * 设置鼠标能触发指定的事件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释(旧)：=>鼠标触发 : 悬停 : 开启独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 不在悬停区域时 : 关闭独立开关 : A
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停时开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不在悬停区域时关闭
 * 
 * 事件注释(旧)：=>鼠标触发 : 左键按下[持续] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 右键按下[持续] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 滚轮按下[持续] : 触发独立开关 : A
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停左键按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停右键按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停滚轮按下
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   注意，旧指令没写"悬停"二字，但实际功能有"悬停"条件。
 *   上述指令实际功能来自 物体-鼠标悬停响应开关 插件。
 * 2.注释设置全部跨事件页，切换事件页不能关闭鼠标触发。
 *   因此，最好将所有 鼠标触发 的注释都写在事件页的第一页，然后根据
 *   每页的条件来设计不同的指令。
 * 3.旧指令"悬停" 与 "悬停时开启" 等价。
 *   旧指令"不在悬停区域时" 与 "不在悬停区域时关闭" 等价。
 *   "绑定持续触发-悬停" 就是 "悬停时开启"的触发+"不在悬停区域时关闭"的触发 两个触发。
 *   旧指令"左键按下[持续]" 与 "绑定持续触发-悬停左键按下" 等价。
 *   旧指令"右键按下[持续]" 与 "绑定持续触发-悬停右键按下" 等价。
 *   旧指令"滚轮按下[持续]" 与 "绑定持续触发-悬停滚轮按下" 等价。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 单次触发
 * 设置鼠标能触发指定的事件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释(旧)：=>鼠标触发 : 左键按下[一帧] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 左键释放[一帧] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 左键双击[一帧] : 触发独立开关 : A
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键双击[一帧]时 : 开启
 * 
 * 事件注释(旧)：=>鼠标触发 : 右键按下[一帧] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 右键释放[一帧] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 右键双击[一帧] : 触发独立开关 : A
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键双击[一帧]时 : 开启
 * 
 * 事件注释(旧)：=>鼠标触发 : 滚轮按下[一帧] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 滚轮释放[一帧] : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 滚轮双击[一帧] : 触发独立开关 : A
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮双击[一帧]时 : 开启
 *
 * 事件注释(旧)：=>鼠标触发 : 滚轮上滚 : 触发独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 滚轮下滚 : 触发独立开关 : A
 *
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮上滚时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮下滚时 : 开启
 * 
 * 1.当前为单次触发，只在满足条件的那一帧执行一次开启/关闭。
 *   注意，旧指令没写"悬停"二字，但实际功能有"悬停"条件。
 *   上述指令实际功能来自 物体-鼠标悬停响应开关 插件。
 * 2.注释设置全部跨事件页，切换事件页不能关闭鼠标触发。
 *   因此，最好将所有 鼠标触发 的注释都写在事件页的第一页，然后根据
 *   每页的条件来设计不同的指令。
 * 3."持续"和"一帧"的区别，即 持续触发与单次触发 的区别。
 *   持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   单次触发，只在满足条件的那一帧执行一次开启/关闭。
 * 4.上述的指令互斥，每个独立开关（如ABCD）只能绑定上述的一个鼠标类型。
 *   但有个例外，左键和右键 能叠加，写 左键注释和右键注释 能叠加触发同一个独立开关。
 * 5.旧指令"左键按下[一帧]" 与 "绑定单次触发-悬停左键按下[一帧]时" 等价。
 *   旧指令"左键释放[一帧]" 与 "绑定单次触发-悬停左键释放[一帧]时" 等价。
 *   旧指令"左键双击[一帧]" 与 "绑定单次触发-悬停左键双击[一帧]时" 等价。
 *   旧指令"右键按下[一帧]" 与 "绑定单次触发-悬停右键按下[一帧]时" 等价。
 *   旧指令"右键释放[一帧]" 与 "绑定单次触发-悬停右键释放[一帧]时" 等价。
 *   旧指令"右键双击[一帧]" 与 "绑定单次触发-悬停右键双击[一帧]时" 等价。
 *   旧指令"滚轮按下[一帧]" 与 "绑定单次触发-悬停滚轮按下[一帧]时" 等价。
 *   旧指令"滚轮释放[一帧]" 与 "绑定单次触发-悬停滚轮释放[一帧]时" 等价。
 *   旧指令"滚轮双击[一帧]" 与 "绑定单次触发-悬停滚轮双击[一帧]时" 等价。
 *   旧指令"滚轮上滚" 与 "绑定单次触发-悬停滚轮上滚时" 等价。
 *   旧指令"滚轮下滚" 与 "绑定单次触发-悬停滚轮下滚时" 等价。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 任何位置单次触发
 * 设置鼠标能触发指定的事件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释(旧)：=>鼠标触发 : 任何位置左键释放[一帧] : 关闭独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 任何位置右键释放[一帧] : 关闭独立开关 : A
 * 事件注释(旧)：=>鼠标触发 : 任何位置滚轮释放[一帧] : 关闭独立开关 : A
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键释放[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键释放[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮释放[一帧]时 : 开启
 *
 * 1.当前为单次触发，只在满足条件的那一帧执行一次开启/关闭。
 *   "任何位置左键释放[一帧]"表示 只要鼠标左键释放，就能关闭独立开关，与"悬停"无关。
 *   上述指令实际功能来自 物体-鼠标响应开关 插件。
 * 2.上述的指令互斥，每个独立开关（如ABCD）只能绑定上述的一个鼠标类型。
 *   但有个例外，这里的单次触发与前面"悬停"的单次触发 能叠加，控制同一个独立开关。
 * 3.旧指令"任何位置左键释放[一帧]" 与 "绑定单次触发-左键释放[一帧]时" 等价。
 *   旧指令"任何位置右键释放[一帧]" 与 "绑定单次触发-右键释放[一帧]时" 等价。
 *   旧指令"任何位置滚轮释放[一帧]" 与 "绑定单次触发-滚轮释放[一帧]时" 等价。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   直接在设计华容道地图中测试性能。
 * 测试结果：   地图界面中消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件的功能转移到了 物体-鼠标响应开关 和 物体-鼠标悬停响应开关。
 *   因此该插件的消耗几乎没有。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 大幅度优化了插件性能，并添加了性能测试说明。
 * [v1.2]
 * 修改了对事件一体化的支持。
 * [v1.3]
 * 添加了镜头缩放时，鼠标触发的支持。
 * 修复了保存后再读取，鼠标触发失效的bug。
 * [v1.4]
 * 修复了切换事件页 + 离开地图 + 再回来，开关失效的bug。
 * 修改了注释说明。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 * [v1.6]
 * 将插件功能进行细化，并分离出了 鼠标响应开关 和 鼠标悬停响应开关。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MTE (Mouse_Trigger_Event)
//		临时全局变量	DrillUp.g_MTE_xxx
//		临时局部变量	this._drill_MTE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		无
//		★性能测试因素	无
//		★性能测试消耗	4.3ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆事件注释
//			
//			
//		★家谱：
//			大家族-开关
//		
//		★脚本文档：
//			8.物体 > 大家族-开关（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件的功能已被分离出去了，见基于的插件。
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_MTE_PluginTip_curName = "Drill_MouseTriggerEvent.js 鼠标-鼠标触发事件";
	DrillUp.g_MTE_PluginTip_baseList = [
		"Drill_EventMouseSwitch.js 物体-鼠标响应开关",
		"Drill_EventMouseHoverSwitch.js 物体-鼠标悬停响应开关"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MTE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MTE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MTE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MTE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MTE_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseTriggerEvent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseTriggerEvent');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventMouseSwitch &&
	Imported.Drill_EventMouseHoverSwitch ){
	
	
//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_MTE_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){ 
	_drill_MTE_initMembers.call(this);
	this._drill_MTE_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定（Sprite_Character）
//==============================
var _drill_MTE_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character){ 		//图像改变，范围就改变
	_drill_MTE_setCharacter.call(this,character);
    this.drill_MTE_setupTrigger();
};
//==============================
// * 事件注释 - 初始化绑定（Sprite_Character）
//==============================
Sprite_Character.prototype.drill_MTE_setupTrigger = function(){ 
	if( this._character && this._character instanceof Game_Event ){
		var ch = this._character;
		
		// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
		if( !ch._erased && ch.event() && ch.event().pages[0] && ch._drill_MTE_isFirstBirth == true ){ 
			ch._drill_MTE_isFirstBirth = undefined;		//『节约临时参数存储空间』
			ch.drill_MTE_readPage( ch.event().pages[0].list );
		}
		
		// > 读取当前页注释
		if( !ch._erased && ch.page() ){ 
			ch.drill_MTE_readPage( ch.list() );
		}
	}
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_MTE_readPage = function( page_list ){
	page_list.forEach( function(l){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>鼠标触发" ){
				
				if( args.length == 6 ){		//=>鼠标触发 : 悬停 : 触发独立开关 : A
					var type  = String(args[1]);
					var value = String(args[3]);
					var switch_str = String(args[5]);
					if( value == "触发独立开关" || value == "开启独立开关" ){ 
						value = true;
					}else{
						value = false;
					}
					
					/*-----------------物体 - 鼠标悬停响应开关------------------*/
					// > 持续触发
					if( type == "悬停" ){			//（固定为 悬停时开启）
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setMouseType( switch_str, type );
					}
					if( type == "不在悬停区域时" ){ //（固定为 不在悬停区域时关闭）
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						this.drill_EMoHS_setMouseType( switch_str, type );
					}
					if( type == "左键按下[持续]" || 
						type == "右键按下[持续]" || 
						type == "滚轮按下[持续]" ){
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						this.drill_EMoHS_setMouseType( switch_str, type );
					}
					
					// > 单次触发
					if( type == "左键按下[一帧]" || 
						type == "左键释放[一帧]" || 
						type == "左键双击[一帧]" || 
						type == "右键按下[一帧]" || 
						type == "右键释放[一帧]" || 
						type == "右键双击[一帧]" || 
						type == "滚轮按下[一帧]" || 
						type == "滚轮释放[一帧]" || 
						type == "滚轮双击[一帧]" || 
						type == "滚轮上滚" || 
						type == "滚轮下滚" ){
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						this.drill_EMoHS_setMouseType( switch_str, "悬停"+type );	//多了"悬停二字"
					}
					if( type == "悬停左键按下[一帧]" || 
						type == "悬停左键释放[一帧]" || 
						type == "悬停左键双击[一帧]" || 
						type == "悬停右键按下[一帧]" || 
						type == "悬停右键释放[一帧]" || 
						type == "悬停右键双击[一帧]" || 
						type == "悬停滚轮按下[一帧]" || 
						type == "悬停滚轮释放[一帧]" || 
						type == "悬停滚轮双击[一帧]" || 
						type == "悬停滚轮上滚" || 
						type == "悬停滚轮下滚" ){
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						this.drill_EMoHS_setMouseType( switch_str, type );
					}
					
					
					/*-----------------物体 - 鼠标响应开关------------------*/
					// > 单次触发
					if( type == "任何位置左键释放[一帧]" ){
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						this.drill_EMoS_setMouseType( switch_str, "左键释放[一帧]" );
					}
					if( type == "任何位置右键释放[一帧]" ){
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						this.drill_EMoS_setMouseType( switch_str, "右键释放[一帧]" );
					}
					if( type == "任何位置滚轮释放[一帧]" ){
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						this.drill_EMoS_setMouseType( switch_str, "滚轮释放[一帧]" );
					}
				}
			};
		};
	}, this);
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseTriggerEvent = false;
		var pluginTip = DrillUp.drill_MTE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


