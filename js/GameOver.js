var GameOver = {
    create: function(){
        
        //Skapar bakgrund
        this.add.tileSprite(0,0,1440,1000,'background');
        
        //stilarna som används i texten
        var stil = {font: '50px Arial', fill: '#fff'};
        var stil2 = {font: '40px Arial', fill: '#fff'};
        
        //Skapar texten 'Game Over'
        var text = this.add.text(game.world.centerX,game.world.centerY,'Game Over', stil);
        text.anchor.setTo(0.5);
        text.fixedToCamera = true;
        text.cameraOffset.setTo(720,350);
        
        //Skapar texten som säger hur man startar om
        var restarttext = this.add.text(720,450,'Tryck SPACEBAR för att börja om', stil2);
        restarttext.anchor.setTo(0.5);
        restarttext.fixedtoCamera = true;
        restarttext.cameraOffset.setTo(720, 350);
        
        //Lägger till SPACEBAR som en key
        restartButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    update: function(){
        
        //Laddar om hemsidan vid nedtryckning av SPACEBAR
        if(restartButton.isDown){
            location.reload();
        }
        
    }
    
};