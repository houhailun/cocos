import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartUI')
export class StartUI extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    /**
     * 开始按钮点击
     */
    onStartButtonClick() {
        director.loadScene('02-GameScene');
    }
}

