const CELL_SIZE = 32;

const PLAYER_JUMP_VELOCITY = -450;
const GRAVITY = 500;

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
    'get_mashroom': { files: ['assets/sound/nya.wav'] },
    'boss_bgm': { files: ['assets/sound/boss_bgm.mp3'], options: { volume: 0.2 } },
};
var sounds = {};

// info
var scoreText;

// game objects
var player;
var platforms;
var mashrooms;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('mashroom', 'assets/star.png');
    this.load.image('block', 'assets/block.png');
    this.load.image('item_block', 'assets/item_block.png');
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
    this.add.image(400, 220, 'sky');

    // create info
    var font = { fontSize: '16px', fill: '#fff' };
    this.add.text(32, 16, 'HIGE', font);
    this.add.text(32, 32, '000000', font);
    this.add.text(32 * 6, 32, 'x00', font);
    this.add.text(288, 16, 'WORLD', font);
    this.add.text(288, 32, ' 1-1', font);
    this.add.text(512-32 * 2, 16, 'TIME', font);
    this.add.text(512-32 * 2, 32, ' 999', font);

    // create platforms
    platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 16; i++) {
        platforms.create(CELL_SIZE * i, CELL_SIZE * 14, 'block').setOrigin(0, 0).refreshBody();
        platforms.create(CELL_SIZE * i, CELL_SIZE * 15, 'block').setOrigin(0, 0).refreshBody();
    }

    platforms.create(CELL_SIZE * 4, CELL_SIZE * 9, 'block');
    
    var x = platforms.create(CELL_SIZE * 8, CELL_SIZE * 9, 'item_block');
    x.is_block = true;

    // create mashrooms
    mashrooms = this.physics.add.group();

    // create player
    player = this.physics.add.sprite(400, 400, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // create colliders
    this.physics.add.collider(player, platforms, hitPlatform, null, this);

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

    this.cameras.main.setBounds(0, 0, CELL_SIZE * 256, CELL_SIZE * 16);
    this.physics.world.setBounds(0, 0, CELL_SIZE * 256, CELL_SIZE * 16);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
}
// sounds.boss_bgm.play();
function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
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
    if (platform.is_block) {
        let playerCenter = player.body.x + player.body.width / 2;
        // 下から当たったか判定
        if (player.body.velocity.y > 0 && platform.body.left <= playerCenter && playerCenter && platform.body.right) {
            sounds.block_break.play();

            platform.disableBody(true, true);

            var itemBlock = platforms.create(platform.body.x + platform.body.width / 2, platform.body.y + platform.body.height / 2, 'block');

            var mashroom = mashrooms.create(platform.body.x, platform.body.top - 7, 'mashroom');
            mashroom.setVelocityX(-100);
            this.physics.add.collider(mashroom, platforms, hitPlatform, null, this);
            this.physics.add.collider(player, mashroom, hitMashroom, null, this);
        }
    }
}

function hitMashroom(player, mashroom) {
    sounds.get_mashroom.play();
    mashroom.disableBody(true, true);
}
