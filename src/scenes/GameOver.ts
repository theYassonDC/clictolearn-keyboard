import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(394762);

        this.gameover_text = this.add.text(512, 300, 'Perdiste :(', {
            fontFamily: 'Arial Black',
            fontSize: '50px',
            strokeThickness: 8,
            color: '#ffffff',
            stroke: '#000000',
            align: 'center'
        }).setOrigin(0.5)

        const buttonWidth = 500;
        const buttonHeight = 80;
        const x = 500;  // posición x del botón
        const y = 390;  // posición y del botón
        const btnX = 255
        const btnY = 350

        // Crear el gráfico para el borde del botón
        const buttonBorder = this.add.graphics();
        buttonBorder.fillStyle(9437184, 1);
        buttonBorder.strokeRoundedRect(btnX, btnY, buttonWidth, buttonHeight, 20)
        buttonBorder.fillRoundedRect(btnX, btnY, buttonWidth, buttonHeight)

        // Crear el texto del botón
        const buttonText = this.add.text(x, y, 'Volver', {
            fontFamily: 'Arial Black',
            fontSize: '40px',
            strokeThickness: 8,
            color: '#ffffff',
            stroke: '#000000',
            align: 'center'
        });
        buttonText.setOrigin(0.5);  // Centrar el texto
        const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0x000000, 0);
        button.setInteractive()
        button.on('pointerover', () => {
            buttonText.setColor('#8f8f8f')
            buttonBorder.fillStyle(36609, 1)
        })
        button.on('pointerout', () => {
            buttonText.setColor('#ffffff')
        })
        button.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
