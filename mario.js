const PLAYER_JUMP_VELOCITY = -450;
const GRAVITY = 500;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    'coin'        : [ 'assets/sound/coin.wav' ],
    'block_break' : [ 'assets/sound/block_break.wav' ],
    'get_mashroom' : [ 'assets/sound/nya.wav' ],
};
var sounds = {};

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
        this.load.audio(key, soundKeys[key]);
    }
}

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    var x = platforms.create(300, 400, 'item_block');
    x.is_block = true;
    console.log(x);

    player = this.physics.add.sprite(400, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    for (let key in soundKeys) {
        sounds[key] = this.sound.add(key);
    }

    this.physics.add.collider(player, platforms, hitPlatform, null, this);

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

    mashrooms = this.physics.add.group();

    cursors = this.input.keyboard.createCursorKeys();
}

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
