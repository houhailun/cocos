import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 控制子弹飞行
 */
@ccclass('Bullet')
export class Bullet extends Component {
    @property
    speed: number = 200;

    start() {

    }

    update(deltaTime: number) {
        const position = this.node.position;
        console.log('position:', position.y + this.speed * deltaTime)
        // 子弹从下到上，所有y从小到大
        this.node.setPosition(position.x, position.y+this.speed * deltaTime, position.z);
        // 子弹超过屏幕自动销毁
        if (position.y > 440) {
            this.node.destroy();
        }
    }
}

