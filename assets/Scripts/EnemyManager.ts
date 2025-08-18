import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property
    enemy0SpawnRate: number = 1;  // 敌人0产生间隔
    @property(Prefab)
    enemy0Prefab: Prefab = null;

    @property
    enemy1SpawnRate: number = 3;  // 敌人0产生间隔
    @property(Prefab)
    enemy1Prefab: Prefab = null;

    @property
    enemy2SpawnRate: number = 10;  // 敌人0产生间隔
    @property(Prefab)
    enemy2Prefab: Prefab = null;

    start() {
        // 定时器，每个一段时间调用某个方法
        this.schedule(this.enemy0Spawn, this.enemy0SpawnRate)
        this.schedule(this.enemy1Spawn, this.enemy1SpawnRate)
        this.schedule(this.enemy2Spawn, this.enemy2SpawnRate)
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        // 取消定时器
        this.unschedule(this.enemy0Spawn);
        this.unschedule(this.enemy1Spawn);
        this.unschedule(this.enemy2Spawn);
    }

    enemy0Spawn() {
        this.enemySpawn(this.enemy0Prefab, -215, 215, 450);
    }

    enemy1Spawn() {
        this.enemySpawn(this.enemy1Prefab, -200, 200, 470);
    }

    enemy2Spawn() {
        this.enemySpawn(this.enemy2Prefab, -155, 155, 550);
    }

    enemySpawn(enemtPrefab: Prefab, min_x: number, max_x: number, Y: number) {
        const enemy = instantiate(enemtPrefab);
        this.node.addChild(enemy);
        const randomX = math.randomRangeInt(min_x, max_x+1);
        enemy.setPosition(randomX, Y, 0);
    }



}

