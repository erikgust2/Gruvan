var GameState = {
    
    create: function(){
        this.add.tileSprite(0,0,/*1440*/3000,1000,'background');
        game.world.setBounds(0,0,3000,1000);
        
        //Skapar platformar 
        /*var platformar = [
        platform1 = this.add.sprite(20,300,'platform'),
        platform2 = this.add.sprite(400,500,'platform')
        ];*/
        
        this.add.sprite(200,200,'lodrat');
        
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
        var platformData = [
            {"x": 20, "y":300},
            {"x": 400, "y": 500},
            {"x": 800, "y": 400},
            {"x": 100,"y": 600},
            {"x": 1200, "y": 350},
            {"x": 1500, "y": 600},
            {"x": 1800, "y": 550},
            {"x": 2050, "y": 550},
            {"x": 2300, "y": 550}
        ];
        platformData.forEach(function(element){
            this.platforms.create(element.x,element.y, 'platform');
        }, this);
        
        //Sätter plattformars fysik
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.allowGravity', false);
        
        //Skapar spelare
        player = this.add.sprite(200,20,'player');
        player.inputEnabled = true;
        player.frame = 2;
        
        //Skapar fiende
        enemy = this.add.sprite(2300, 470,'enemy');
        riktning = 'v';
        enemy.anchor.setTo(0.5,0.5);
        enemy.animations.add('slingra',[0,1,2,3],7,true);
        enemy.enableBody = true;
        
        //Sätter fysiken
        this.physics.enable([player,enemy],Phaser.Physics.ARCADE);
        this.physics.enable(this.platforms,Phaser.Physics.ARCADE);
        player.body.gravity.y = 1000;
        enemy.body.gravity.y = 600;
        
        //Tvingar kameran att följa spelaren
        game.camera.follow(player);
        
        //Kontroller
        pil = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //Ljud
        tryck = this.add.audio('plopp');
        song = this.add.audio('musik');
        song.play();
        
        player.events.onInputDown.add(this.ploppa);
    },
    
    
    
    update: function(){
        
        //Kontroller för att röra sig höger och vänster
        if(pil.right.isDown){
            player.x += 8;
        }else if(pil.left.isDown){
            player.x -= 8;
        }
        
        //Spelar fiendens animation och får den att röra sig
        enemy.animations.play('slingra');
        if(enemy.x == 2500){
            riktning = 'v';
            enemy.scale.x = 1;
        }else if (enemy.x == 1900){
            riktning = 'h';
            enemy.scale.x = -1;
        }
        if(riktning == 'v'){
            enemy.x -= 1;
        }else if(riktning == 'h'){
            enemy.x += 1;
        }
        
        //Skapar kollision och trigger for kollision med fiende
        this.physics.arcade.collide(player,this.platforms);
        this.physics.arcade.collide(enemy,this.platforms);
        game.physics.arcade.overlap(enemy, player, this.collisionHandler, null, this);
        
        //Kollar ifall bollen är i kontakt med plattform och låter en hoppa med spacebar
        if(jumpButton.isDown && player.body.touching.down){
            player.body.velocity.y = -500;
        }
        
        if(player.body.touching.down && pil.down.isDown == false){
            player.frame = 0;
        }
        
        //Kollar ifall man faller ur världen och dör
        if(player.y > game.world.height){
            this.state.start('GameOver',true,false);
        }
        console.log(pil.down.isDown);
        
    },
    
    ploppa: function(){
            tryck.play();
        },
    
    
    //Event for kollision med fiende som dödar spelaren
    collisionHandler: function(){
        this.state.start('GameOver',true,false);
    }
};  