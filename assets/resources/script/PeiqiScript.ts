// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //监听peiqi节点的拖动事件: 发生拖动，则累加节点的横纵坐标值
         this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
           console.log("您挪动了peiqi")
           var delta =event.getDelta();
           this.node.x +=delta.x;
           this.node.y +=delta.y;
        }, this);
        
        // 启用碰撞监听
        this.node.getComponent(cc.RigidBody).enabledContactListener = true; 
		//开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //设置调试绘制碰撞体标志
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit ||cc.PhysicsManager.DrawBits.e_pairBit;
    }

    start () {

    }

    // update (dt) {}

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact (contact, selfCollider, otherCollider) {
        cc.log("碰撞体开始接触");
    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact (contact, selfCollider, otherCollider) {
        cc.log("碰撞体结束接触");
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve (contact, selfCollider, otherCollider) {
        cc.log("碰撞体接触时")
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve (contact, selfCollider, otherCollider) {
        cc.log("处理完碰撞体接触逻辑")
    }
}
