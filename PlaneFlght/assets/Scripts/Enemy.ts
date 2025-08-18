import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property
    speed: number = 300;
    @property(Animation)
    anim: Animation = null;


    start() {
        // this.anim.play();
    }

    update(deltaTime: number) {
        const p = this.node.position;
        this.node.setPosition(p.x, p.y-this.speed * deltaTime, p.z);
    }
}

