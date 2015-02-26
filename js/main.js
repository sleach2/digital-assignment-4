window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'sky', 'assets/sky.png' );
        game.load.image('bricks','assets/bricks.png');
        game.load.spritesheet('dude', 'assets/dude.png',32,48);
        game.load.image('ground','assets/platform.png');
        game.load.image('city', 'assets/city.png');
        game.load.image('hospital', 'assets/hospital.png');
        game.load.image('brain', 'assets/brain.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('lungs', 'assets/lungs.png');
        game.load.spritesheet('man','assets/man.png',25,23);
    }
    
    var bkg;
    var player;
    var cursors;
    var platforms;
    var enemies;
    var hbol=false;
    var bbol=false;
    var lbol=false;
    
    function create() {
        game.world.setBounds(0,0,4000,600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bkg=game.add.tileSprite(0,0,4000,600,'city'); 
        //bkg.fixedToCamera=true;
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 32, 'ground');
        ground.scale.setTo(60, 1);
        ground.body.immovable = true;
        game.add.sprite(0,game.world.height-155,'hospital');
        //game.add.sprite(0,0,'man');
        player = game.add.sprite(200, game.world.height - 90, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
        enemies=game.add.group();
        enemies.enableBody=true;
        for(var i=0; i<20; i++){
            var man = enemies.create(game.rnd.integerInRange(500,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'man');
            man.body.gravity.y=350;
            man.animations.add('l',[0,1,2],10,true);
            man.animations.add('r',[4,5,6],10,true);
            man.frame=3;
            man.body.collideWorldBounds=true;
        }
        //spawn();
        var heart=game.add.sprite(game.rnd.integerInRange(500,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'heart');
        var brain=game.add.sprite(game.rnd.integerInRange(500,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'brain');
        var lungs=game.add.sprite(game.rnd.integerInRange(500,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'lungs');
        timer = game.time.create(false);
        timer.loop(2000,moveL, this);
        timer.loop(4000,moveR,this);
        timer.start();
    }

    /*function spawn(){
        for(var i=0; i<20; i++){
            var man = enemies.create(game.rnd.integerInRange(500,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'man');
            man.body.gravity.y=350;
            man.animations.add('l',[0,1,2],10,true);
            man.animations.add('r',[4,5,6],10,true);
            man.frame=3;
            man.body.collideWorldBounds=true;
        }
    }*/

    function moveL(){
        enemies.forEach(function(man){
            man.animations.play('l');
            man.body.velocity.x=-250;
        },this);
    }

    function moveR(){
        enemies.forEach(function(man){
            man.animations.play('r');
            man.body.velocity.x=250;
        },this);
    }
    
    function update() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(enemies,platforms);
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
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -350;
        }
    }
};
