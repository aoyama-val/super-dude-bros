const CELL_SIZE = 32;

const PLAYER_JUMP_VELOCITY = -550;
const GRAVITY = 1000;

const BACK = [
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                               CCCCCCCCCCCCCC              ",
    "                      q                                                                                                        CCCCCCCCCCCCCC              ",
    "                                                                                                                               CC         CCC              ",
    "                                                                                                                               CC         CCC              ",
    "                                                                                                                               CC         CCC              ",
    "          C     q   bqbqb                     pp         pp                 bqb               CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC       CCCCCCC            ",
    "                                      pp      pp         pp                                   CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC        CCCCC             ",
    "                            pp        pp      pp         pp                                                                               CCC              ",
    "                      e     pp        pp  e   pp  e e    pp                                                                                C               ",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbXXbbbbbbbbbbbbbbbXXXXbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                   b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
];
const STAGE_W = BACK[0].length;
const STAGE_H = BACK.length;

var config = {
    parent: 'game',  // html element id
    type: Phaser.AUTO,
    width: CELL_SIZE * 16,
    height: CELL_SIZE * 15,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

// input
var cursors;
var keyShot;

// sound
var soundKeys = {
    'coin': { files: ['assets/sound/coin.wav'] },
    'block_break': { files: ['assets/sound/break2.wav'] },
    'block_hit': { files: ['assets/sound/block_hit.wav'] },
    'gameover': { files: ['assets/sound/gameover.wav'] },
    'laser': { files: ['assets/sound/laser.wav'] },
    'clear': { files: ['assets/sound/clear.wav'] },
    'get_mashroom': { files: ['assets/sound/nya.wav'], options: { volume: 0.3 } },
    'boss_bgm': { files: ['assets/sound/boss_bgm.mp3'], options: { volume: 0.2 } },
    'boss_dead': { files: ['assets/sound/boss_dead.mp3'] },
};
var sounds = {};

// info
var scoreText;
var coinText;
var score = 0;
var displayingScore = 0;
var coinCount = 0;
var gameOverText;

// game objects
var player;
var platforms;
var mashrooms;
var coins;
var enemies;
var deaths;
var boss;
var weapons;
var bullets;
var sky;
var space;
var isSpaceScrolling;

var isGameOver = false;
var isJumping = false;
var shotTime = -1;
var bossLife = 165;
var bossShotTime = -1;
var bossPattern = 1;    // 0: 攻撃なし  1: 3方向  2: 弾幕
var bulletsSpawner = undefined;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('mashroom', 'assets/star.png');
    this.load.image('block', 'assets/block.png');
    this.load.image('item_block', 'assets/item_block.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('boss', 'assets/boss.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('laser', 'assets/laser.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('end', 'assets/end.png');
    this.load.image('space', 'assets/deep-space.jpg');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 32, frameHeight: 32 });

    for (let key in soundKeys) {
        this.load.audio(key, soundKeys[key].files);
    }
}

function create() {
    // create input
    cursors = this.input.keyboard.createCursorKeys();
    keyShot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    // create sounds
    for (let key in soundKeys) {
        sounds[key] = this.sound.add(key, soundKeys[key].options);
    }

    // create background
    sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
    space = this.add.tileSprite(256, 256, 512, 512, 'space').setScrollFactor(0);
    space.visible = false;

    // create groups
    platforms = this.physics.add.staticGroup();
    deaths = this.physics.add.staticGroup();
    enemies = this.physics.add.group();
    mashrooms = this.physics.add.group();
    coins = this.physics.add.group();
    weapons = this.physics.add.group();
    bullets = this.physics.add.group();

    // create platforms
    const createPlatform = (x, y, image) => {
        let platform = platforms.create(CELL_SIZE * x, CELL_SIZE * y, image);
        platform.setOrigin(0, 0).refreshBody();
        return platform;
    };
    for (let y = 0; y < STAGE_H; y++) {
        for (let x = 0; x < STAGE_W; x++) {
            let platform;
            switch (BACK[y][x]) {
                case "b": // ブロック
                    platform = createPlatform(x, y, "block");
                    platform.is_breakable = true;
                    break;
                case "q": // はてなブロック
                    platform = createPlatform(x, y, "item_block");
                    platform.has_item = true;
                    break;
                case "p": // パイプ
                    platform = createPlatform(x, y, "pipe");
                    break;
                case "C": // コイン
                    coin = coins.create(CELL_SIZE * x, CELL_SIZE * y, "coin").setOrigin(0, 0).refreshBody();
                    coin.setImmovable();
                    coin.body.setAllowGravity(false);
                    coin.setBounceY(0);
                    //https://phaser.discourse.group/t/body-onfloor-true-when-overlapping-with-staticgroup-body/1746
                    break;
                case "X": // 接触したら死
                    let death = deaths.create(CELL_SIZE * x, CELL_SIZE * y, "death").setOrigin(0, 0).refreshBody();
                    break;
                case "e": // 敵
                    let enemy = enemies.create(CELL_SIZE * x, CELL_SIZE * y, "enemy").setOrigin(0, 0).refreshBody();
                    enemy.body.setVelocityX(-50);
                    enemy.setBounceX(1.0);
                    break;
                default:
                    continue;
            }
        }
    }

    this.physics.add.collider(enemies, platforms);
    boss = enemies.create(4800, 1400, 'boss');
    boss.flipX = true;
    boss.setBounce(0.0, 1.0);

    // create player
    // player = this.physics.add.sprite(CELL_SIZE * 3.5, CELL_SIZE * 13 + 8, 'dude');
    // fall
    // player = this.physics.add.sprite(CELL_SIZE * 73.5, CELL_SIZE * 13 + 8, 'dude');
    // boss
    player = this.physics.add.sprite(CELL_SIZE * 135, CELL_SIZE * 13 + 8, 'dude');
    player.setBounce(0.0);
    player.setCollideWorldBounds(true, undefined, undefined, true);

    // create colliders
    this.physics.add.collider(player, platforms, hitPlatform, null, this);
    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.collider(player, deaths, hitDeath, null, this);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
    this.physics.add.collider(mashrooms, platforms);
    this.physics.add.collider(boss, platforms);
    this.physics.add.overlap(weapons, boss, weaponHitBoss, null, this);

    // create animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20,
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'fly',
        frames: [{ key: 'dude', frame: 5 }],
        frameRate: 10,
    });

    this.anims.create({ key: 'explosion', frames: this.anims.generateFrameNames('explosion'), repeat: 0 });
    player.anims.play('right', true);

    // create info
    var font = { fontSize: '16px', fill: '#fff' };
    this.add.text(32, 16, 'YOU', font).setScrollFactor(0);
    scoreText = this.add.text(32, 32, '000000', font).setScrollFactor(0);
    this.add.image(32 * 5 + 16, 32 + 8, 'coin').setScrollFactor(0);
    coinText = this.add.text(32 * 6, 32, 'x00', font).setScrollFactor(0);
    this.add.text(288, 16, 'WORLD', font).setScrollFactor(0);
    this.add.text(288, 32, ' 1-1', font).setScrollFactor(0);
    this.add.text(512 - 32 * 2, 16, 'TIME', font).setScrollFactor(0);
    this.add.text(512 - 32 * 2, 32, ' 999', font).setScrollFactor(0);

    // camera
    this.cameras.main.setBounds(0, 0, CELL_SIZE * STAGE_W, CELL_SIZE * 16);
    this.physics.world.setBounds(0, 0, CELL_SIZE * STAGE_W, CELL_SIZE * STAGE_H);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
}

var isBossStarted = false;
function update(time, delta) {
    if (isGameOver) {
        return;
    }

    updateScoreText();

    sky.x = 400 + this.cameras.main.scrollX; // カメラにスクロールに合わせて背景を移動させることで、常に同じ背景を表示する

    if (!isBossStarted) {
        // 通常モード
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
            console.log(player.body.x, player.body.y);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
        }
        if (player.body.touching.down) {
            isJumping = false;
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if (player.body.touching.down) {
                player.setVelocityY(PLAYER_JUMP_VELOCITY);
                isJumping = true;
            }
        } else if (!cursors.up.isDown) {
            if (isJumping) {
                // y方向速度を反転する方式だと、小ジャンプしたときの落ち方が速くなりすぎるので、0にする方がよい
                player.setVelocityY(0);
                // player.setVelocityY(-player.body.velocity.y);
                isJumping = false;
            }
        }

        // カメラ変更
        if (player.body.y > CELL_SIZE * 16) {
            this.cameras.main.setBounds(0, 0, CELL_SIZE * STAGE_W, CELL_SIZE * STAGE_H);
        }

        if (player.body.y > 1400 && player.body.x > 4500) {
            // BGM変更
            sounds.boss_bgm.loop = true;
            sounds.boss_bgm.play();

            // space.visible = true;
            isSpaceScrolling = true;

            // カメラ
            this.cameras.main.stopFollow();
            this.cameras.main.pan(4650, 1450);
            // console.log(this.cameras.main.toJSON());

            // プレイヤー挙動変更
            player.anims.play('fly');
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.body.setAllowGravity(false);

            isBossStarted = true;
            bossShotTime = time + 2500;  // 少し遅らせて撃ち始めるように
        }
    } else {
        if (isSpaceScrolling) {
            space.tilePositionX += 5;
        }

        // ボスモード
        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
        } else if (cursors.left.isDown) {
            console.log(player.body.x, player.body.y);
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);
        }
        if (keyShot.isDown) {
            if (time - shotTime > 200) {
                let weapon = weapons.create(player.body.x, player.body.y, "laser");
                weapon.body.setAllowGravity(false);
                weapon.body.setVelocityX(550);
                sounds.laser.play();
                shotTime = time;
            }
        }
        switch (bossPattern) {
            case 0:
                break;
            case 1:
                if (bossLife > 30) {
                    if (time - bossShotTime > 500) {
                        for (let i = 0; i < 3; i++) {
                            let bullet = bullets.create(boss.x, boss.y, "bullet");
                            let angle = 150 + 30 * i;
                            let speed = 200;
                            bullet.body.setAllowGravity(false);
                            bullet.body.setVelocityX(speed * Math.cos(Phaser.Math.DegToRad(angle)));
                            bullet.body.setVelocityY(speed * Math.sin(Phaser.Math.DegToRad(angle)));
                        }
                        bossShotTime = time;
                    }
                } else {
                    if (bulletsSpawner == undefined) {
                        // space.visible = true;
                        this.cameras.main.shake(100000000, 0.005);
                        boss.setPosition(4800, 1400);
                        boss.body.setVelocityX(0);
                        boss.body.setVelocityY(0);
                        boss.body.setAllowGravity(false);
                        bulletsSpawner = new BulletSpawner(boss.x, boss.y);
                    }
                }
                break;
            // case 2:
            //     if (bulletsSpawner == undefined) {
            //         bulletsSpawner = new BulletSpawner(boss.x, boss.y);
            //     }
            //     break;
        }

        if (bulletsSpawner != undefined) {
            bulletsSpawner.update();
        }

        bullets.children.each((bullet) => {
            debugger;
            if (!this.cameras.main.worldView.contains(bullet.body.x, bullet.body.y)) {
                bullet.destroy();
            }
        }, this);

    }
}

function hitPlatform(player, platform) {
    // 下から当たったか判定
    if (player.body.touching.up && platform.body.touching.down) {
        if (platform.has_item) {
            sounds.block_hit.play();

            platform.disableBody(true, true);

            var itemBlock = platforms.create(platform.body.x + platform.body.width / 2, platform.body.y + platform.body.height / 2, 'block');

            var mashroom = mashrooms.create(platform.body.x, platform.body.top - 7, 'mashroom');
            mashroom.setVelocityX(100);
            mashroom.setBounce(1.0, 0.0); // x方向だけ跳ね返るように
            this.physics.add.collider(mashroom, platforms, hitPlatform, null, this);
            this.physics.add.collider(player, mashroom, hitMashroom, null, this);
        } else if (platform.is_breakable) {
            sounds.block_break.play();

            platform.disableBody(true, true);
        }
    }
}

function hitEnemy(player, enemy) {
    // 上から当たったか判定
    if (player.body.touching.down && enemy.body.touching.up) {
        enemy.disableBody(true, true);
        sounds.block_hit.play();
        score += 100;
    } else {
        setGameOver(this);
    }
}

function weaponHitBoss(boss, weapon) {
    weapon.disableBody(true, true);
    boss.setTint(0xff0000);
    this.time.addEvent({
        delay: 20,
        callback: () => { boss.setTint(0xffffff) },
    });

    bossLife -= 1;
    score += 100;
    console.log("bossLife:", bossLife);
    if (bossLife <= 0) {
        boss.disableBody(true, true);
        this.physics.pause();

        sounds.boss_bgm.stop();
        sounds.boss_dead.play();
        isSpaceScrolling = false;
        // this.cameras.main.shake(100000000, 0.025);

        const explosion = this.add.sprite(boss.x, boss.y, 'exp').play('explosion', true);
        explosion.scaleX = 8.0;
        explosion.scaleY = 8.0;

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                // shake stop
                this.cameras.main.shakeEffect.reset();

                sounds.clear.play();

                score += 500000;

                this.time.addEvent({
                    delay: 8500,
                    callback: () => {
                        // THE END
                        this.add.image(config.width / 2, config.height / 2, 'end').setScrollFactor(0);
                        var effect = this.cameras.main.postFX.addColorMatrix();
                        effect.grayscale(1, false);
                    }
                });
            },
        });
    }
}

function setGameOver(_this) {
    isGameOver = true;

    const screenCenterX = _this.cameras.main.worldView.x + _this.cameras.main.width / 2;
    const screenCenterY = _this.cameras.main.worldView.y + _this.cameras.main.height / 2;
    var font = { fontSize: '32px', fill: '#ff0000' };
    const loadingText = _this.add.text(screenCenterX, screenCenterY, 'GAME OVER', font).setOrigin(0.5);

    player.anims.play('turn');

    sounds.gameover.play();

    _this.physics.pause();
}

function hitDeath(player, death) {
    setGameOver(this);
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);

    sounds.coin.play();

    coinCount += 1;
    score += 200;
    if (coinCount >= 100) {
        coinCount = 0;
    }
    coinText.setText("x" + ("00" + String(coinCount)).slice(-2));
}

function updateScoreText() {
    if (displayingScore < score) {
        displayingScore += 1000;
        if (displayingScore > score) {
            displayingScore = score;
        }
        scoreText.setText(("000000" + String(displayingScore)).slice(-6));
    }
}

function hitMashroom(player, mashroom) {
    sounds.get_mashroom.play();
    mashroom.disableBody(true, true);
}

function playerOutOfBounds(player) {
    console.log("out of bounds");
    console.log(player);
}

class BulletSpawner {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.frame = -1;
    }

    update() {
        this.frame += 1;

        {
            let bullet = bullets.create(this.x, this.y, "bullet");
            let angle = 150 + this.frame * 9.1;
            let speed = 100;
            bullet.body.setAllowGravity(false);
            bullet.body.setVelocityX(speed * Math.cos(Phaser.Math.DegToRad(angle)));
            bullet.body.setVelocityY(speed * Math.sin(Phaser.Math.DegToRad(angle)));
        }

        {
            let bullet = bullets.create(this.x, this.y, "bullet");
            let angle = 150 - this.frame * 15.1;
            let speed = 150;
            bullet.body.setAllowGravity(false);
            bullet.body.setVelocityX(speed * Math.cos(Phaser.Math.DegToRad(angle)));
            bullet.body.setVelocityY(speed * Math.sin(Phaser.Math.DegToRad(angle)));
        }
    }
}