window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'sky', 'assets/sky.png' );
        game.load.image('bricks','assets/bricks.png');
        game.load.spritesheet('dude', 'assets/dude.png',32,48);
        game.load.image('ground','assets/platform.png');
    }
    
    var bkg;
    var player;
    var cursors;
    var ground;
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bkg=game.add.tileSprite(0,0,1000,600,'bricks'); 
        bkg.fixedToCamera=true;
        var ground = game.add.sprite(0, game.world.height - 64, 'ground');
        ground.enableBody=true;
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
    }

    function update() {
        player.body.velocity.x=0;
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
            player.animations.play('left');
        }else if (cursors.right.isDown){
            player.body.velocity.x = 250;
            player.animations.play('right');
        }else{
            player.animations.stop();
            player.frame = 4;
        }
        if (cursors.up.isDown){
            player.body.velocity.y = -350;
        }else{
            player.body.velocity.y=350;
        }
    }
};
