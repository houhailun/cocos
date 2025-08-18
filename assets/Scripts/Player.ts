import { _decorator, Component, Node, input, Input, EventTouch, Vec3, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum ShootType {
    OneShot,
    TwoShot
};

/**
 * 角色控制
 */
@ccclass('Player')
export class Player extends Component {

    
    @property
    shootRate: number = 0.5;    // 子弹发射频率
    @property(Prefab)
    bullet1Prefab: Prefab = null;
    @property(Node)
    bulletParent: Node = null;
    @property(Node)
    position1: Node = null;

    @property(Prefab)
    bullet2Prefab: Prefab = null;
    @property(Node)
    position2: Node = null;
    @property(Node)
    position3: Node = null;

    shootTimer: number = 0;     // 子弹发射计时器

    @property
    shootType: ShootType = ShootType.OneShot;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        const p = this.node.position;

        let targetPos = new Vec3(p.x + event.getDeltaX(), p.y + event.getDeltaY(), p.z);
        // getDeltaX(): 获取触点距离上一次事件移动的 x 轴距离
        // getDeltaY(): 获取触点距离上一次事件移动的 y 轴距离

        // 防止飞机移出屏幕:左右下上边界
        if (targetPos.x < -230) {
            targetPos.x = -230;
        }
        if (targetPos.x > 230) {
            targetPos.x = 230;
        }
        if (targetPos.y < -380) {
            targetPos.y = -380;
        }
        if (targetPos.y > 380) {
            targetPos.y = 380;
        }

        this.node.setPosition(targetPos);
    }

    protected update(dt: number): void {
        switch(this.shootType) {
            case ShootType.OneShot:
                this.oneShot(dt)
                break;
            case ShootType.TwoShot:
                this.twoShot(dt)
                break;
        }
    }

    oneShot(dt: number) {
        this.shootTimer += dt;
        if (this.shootTimer >= this.shootRate) {
            this.shootTimer = 0;

            // 实例化子弹，并添加到父节点下
            const bullet1 = instantiate(this.bullet1Prefab);
            bullet1.setParent(this.bulletParent);

            // 注意这里是世界坐标
            bullet1.setWorldPosition(this.position1.worldPosition)
        }
    }

    twoShot(dt: number) {
        this.shootTimer += dt;
        if (this.shootTimer >= this.shootRate) {
            this.shootTimer = 0;

            // 实例化子弹，并添加到父节点下
            const bullet1 = instantiate(this.bullet2Prefab);
            const bullet2 = instantiate(this.bullet2Prefab);
            bullet1.setParent(this.bulletParent);
            bullet2.setParent(this.bulletParent);

            // 注意这里是世界坐标
            bullet1.setWorldPosition(this.position2.worldPosition)
            bullet2.setWorldPosition(this.position3.worldPosition)
        }
    }
}
