const CELL_SIZE = 32;

const PLAYER_JUMP_VELOCITY = -450;
const GRAVITY = 500;

const BACK = [
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                               CCCCCCCCCCCCC               ",
    "                      q                                                                                                        CCCCCCCCCCCCC               ",
    "                                                                                                                               CC         CC               ",
    "                                                                                                                               CC         CC               ",
    "                                                                                                                               CC         CC               ",
    "          C     q   bqbqb                     pp         pp                 bqb               CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC      CCCCCCC             ",
    "                                      pp      pp         pp                                   CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC       CCCCC              ",
    "                            pp        pp      pp         pp                                                                              CCC               ",
    "                            pp        pp      pp         pp                                                                               C                ",
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
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb  bbbbbbbbbbbbbbb    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb    bbbbbbbbbbbbbb",
];
const STAGE_W = BACK[0].length;
const STAGE_H = BACK.length;

var config = {
    type: Phaser.AUTO,
    width: CELL_SIZE * 16,
    height: CELL_SIZE * 16,
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

// sound
var soundKeys = {
    'coin': { files: ['assets/sound/coin.wav'] },
    'block_break': { files: ['assets/sound/block_break.wav'] },
    'get_mashroom': { files: ['assets/sound/nya.wav'], options: { volume: 0.3 } },
    'boss_bgm': { files: ['assets/sound/boss_bgm.mp3'], options: { volume: 0.2 } },
};
var sounds = {};

// info
var scoreText;
var coinText;
var coinCount = 0;

// game objects
var player;
var platforms;
var mashrooms;
var coins;
var enemies;

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
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    
    for (let key in soundKeys) {
        this.load.audio(key, soundKeys[key].files);
    }
}

function create() {
    // create input
    cursors = this.input.keyboard.createCursorKeys();

    // create sounds
    for (let key in soundKeys) {
        sounds[key] = this.sound.add(key, soundKeys[key].options);
    }

    // create background
    this.add.tileSprite(400, 300, 10000, 600, 'sky');

    // create info
    var font = { fontSize: '16px', fill: '#fff' };
    this.add.text(32, 16, 'HIGE', font).setScrollFactor(0);
    scoreText = this.add.text(32, 32, '000000', font).setScrollFactor(0);
    this.add.image(32 * 5 + 16, 32 + 8, 'coin').setScrollFactor(0);
    coinText = this.add.text(32 * 6, 32, 'x00', font).setScrollFactor(0);
    this.add.text(288, 16, 'WORLD', font).setScrollFactor(0);
    this.add.text(288, 32, ' 1-1', font).setScrollFactor(0);
    this.add.text(512 - 32 * 2, 16, 'TIME', font).setScrollFactor(0);
    this.add.text(512 - 32 * 2, 32, ' 999', font).setScrollFactor(0);

    // create platforms
    platforms = this.physics.add.staticGroup();
    coins = this.physics.add.staticGroup();
    const createPlatform = (x, y, image) => {
        let platform = platforms.create(CELL_SIZE * x, CELL_SIZE * y, image);
        platform.setOrigin(0, 0).refreshBody();
        return platform;
    };
    for (let y = 0; y < STAGE_H; y++) {
        for (let x = 0; x < STAGE_W; x++) {
            let image;
            let platform;
            switch (BACK[y][x]) {
                case "b": // ブロック
                    platform = createPlatform(x, y, "block");
                    break;
                case "q": // はてなブロック
                    platform = createPlatform(x, y, "item_block");
                    platform.has_item = true;
                    break;
                case "p": // パイプ
                    platform = createPlatform(x, y, "pipe");
                    break;
                case "C": // コイン
                    coin = coins.create(CELL_SIZE * x, CELL_SIZE * y, "coin").setOrigin(0, 0).refreshBody()
                    break;
                default:
                    continue;
            }
        }
    }

    // create mashrooms
    mashrooms = this.physics.add.group();

    enemies = this.physics.add.group();
    this.physics.add.collider(enemies, platforms);
    var boss = enemies.create(380, 0, 'boss');
    boss.flipX = true;

    // create player
    player = this.physics.add.sprite(CELL_SIZE * 3.5, CELL_SIZE * 13 + 8, 'dude');
    player.setBounce(0.0);
    // player.setCollideWorldBounds(false, undefined, undefined, true);
    // player.events.onOutOfBounds.add(playerOutOfBounds, this);

    // create colliders
    this.physics.add.collider(player, platforms, hitPlatform, null, this);
    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.collider(mashrooms, platforms);

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

    this.cameras.main.setBounds(0, 0, CELL_SIZE * STAGE_W, CELL_SIZE * 16);
    this.physics.world.setBounds(0, 0, CELL_SIZE * STAGE_W, CELL_SIZE * STAGE_H);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);

    // 効かない
    // player.onWorldBounds = function (arg) {
    //     console.log("out", arg);
    // };
    // this.physics.world.on('worldbounds', (body) => {
    //     console.log("out aa");
    //     body.gameObject.onWorldBounds();
    // });

    // sounds.boss_bgm.play();
}
function update() {
    // if (player.body.x < 0) {
    //     player.setVelocityX(0);
    //     player.body.x = 0;
    // }
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        console.log(player.body.x, player.body.y);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(PLAYER_JUMP_VELOCITY);
    }
}

function hitPlatform(player, platform) {
    if (platform.has_item) {
        console.log("has item");
        // 下から当たったか判定
        if (player.body.touching.up && platform.body.touching.down) {
            sounds.block_break.play();

            platform.disableBody(true, true);

            var itemBlock = platforms.create(platform.body.x + platform.body.width / 2, platform.body.y + platform.body.height / 2, 'block');

            var mashroom = mashrooms.create(platform.body.x, platform.body.top - 7, 'mashroom');
            mashroom.setVelocityX(100);
            mashroom.setBounce(1.0, 0.0); // x方向だけ跳ね返るように
            this.physics.add.collider(mashroom, platforms, hitPlatform, null, this);
            this.physics.add.collider(player, mashroom, hitMashroom, null, this);
        }
    }
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);

    coinCount += 1;
    if (coinCount >= 100) {
        coinCount = 0;
    }
    coinText.setText("x" + ("00" + String(coinCount)).slice(-2));
}

function hitMashroom(player, mashroom) {
    sounds.get_mashroom.play();
    mashroom.disableBody(true, true);
}


function playerOutOfBounds(player) {
    console.log("out of bounds");
    console.log(player);
}