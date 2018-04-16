var GameStart = {
    preload: function(){
        this.load.image('background','assets/rocks.png');
        this.load.image('platform','assets/sten.png');
        this.load.image('boll','assets/boll.png');
        this.load.image('play','assets/playbutt.png');
        this.load.image('lodrat','assets/lodrat.png');
        this.load.spritesheet('enemy','assets/masken60.png',128,60);
        this.load.spritesheet('player','assets/tempelrunner.png', 50,60,13)
        this.load.audio('musik',['assets/Secret-Catacombs.mp3','assets/Secret-Catacombs.ogg']);
        this.load.audio('plopp',['assets/plopp.mp3','assets/plopp.ogg']);
    },
    create: function(){
        this.add.tileSprite(0,0,1440,1000,'background');
        
        var namn = this.add.text(game.world.centerX,200,'Gruvan',{fontsize: '55px',fill:'#fff'});
        namn.anchor.setTo(0.5);
        
        var button = game.add.button(game.world.centerX,game.world.centerY,'play');
        button.anchor.setTo(0.5);
        
        button.events.onInputUp.add(function(){
            this.state.start('GameState',true,false);
        },this);
    }
};