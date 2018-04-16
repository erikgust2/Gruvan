var game = new Phaser.Game(1440,700,Phaser.AUTO);

game.state.add('GameStart',GameStart);
game.state.add('GameState',GameState);
game.state.add('GameOver',GameOver);

game.state.start('GameStart');