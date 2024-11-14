import { Scene, Utils } from 'phaser';

const advice = [
    'Mira la letra en la pantalla\ny presiona la letra que se parezca',
    'Ten en cuenta\nen mirar bien la tecla que estas presionando',
    'Primero mira la pantalla\nY luego el teclado!'
]
export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;
    headth: number = 3
    next: number = 0;
    text_headth: Phaser.GameObjects.Text;
    text_alert: Phaser.GameObjects.Text;
    arrRandom: any[] = [
        { question: 'Presiona la letra A', key: 'a' },
        { question: 'Presiona la letra B', key: 'b' },
        { question: 'Presiona la letra C', key: 'c' },
        { question: 'Presiona la letra D', key: 'd' },
        { question: 'Presiona la letra E', key: 'e' },
        { question: 'Presiona la letra F', key: 'f' },
        { question: 'Presiona la letra G', key: 'g' },
        { question: 'Presiona la letra H', key: 'h' },
        { question: 'Presiona la letra I', key: 'i' },
        { question: 'Presiona la letra J', key: 'j' },
        { question: 'Presiona la letra K', key: 'k' },
        { question: 'Presiona la letra L', key: 'l' },
        { question: 'Presiona la letra M', key: 'm' },
        { question: 'Presiona la letra N', key: 'n' },
        { question: 'Presiona la letra O', key: 'o' },
        { question: 'Presiona la letra P', key: 'p' },
        { question: 'Presiona la letra Q', key: 'q' },
        { question: 'Presiona la letra R', key: 'r' },
        { question: 'Presiona la letra S', key: 's' },
        { question: 'Presiona la letra T', key: 't' }
    ]

    constructor() {
        super('Game');
    }

    showQuestion() {
        const keyc = this.arrRandom[this.next]
        this.msg_text.setText(`${keyc.question}`)
        // this.msg_text.setText('')
        return keyc
    }

    verifyNext() {
        this.next++;
        this.msg_text.setColor('#ffffff')

        if (this.next < this.arrRandom.length) {
            this.showQuestion()
        } else {
            this.msg_text.setText('¡Felicidades¡\nlograste descubrir todas las letras que tiene el teclado')
            this.msg_text.setFontSize(30)
            this.msg_text.setColor('#2ced00')
            this.time.delayedCall(1000, () => {
                this.msg_text.setText('¡Recuerda seguir aprendiendo!')
            }, [], this)
            this.time.delayedCall(2000, () => {
                this.headth = 3
                this.scene.start('MainMenu');
            }, [], this)
        }
    }

    randomQuestions() {
        Utils.Array.Shuffle(this.arrRandom)
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(394762);
        // Text builders
        this.msg_text = this.add.text(512, 400, '', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);
        this.text_headth = this.add.text(10, 10, `VIDAS ${this.headth}`, {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ff0000',
            align: 'left'
        }).setOrigin(0)
        this.text_alert = this.add.text(512, 500, ``, {
            fontFamily: 'Arial Black', fontSize: 35, color: '#0034ed',
            align: 'center'
        })
        .setOrigin(0.5)
        .setVisible(false)
        // Game logic
        this.randomQuestions()
        this.showQuestion()
        this.input.keyboard?.on('keydown', (e: any) => {
            const keyc = this.showQuestion()
            if (keyc.key === e.key) {
                this.msg_text.setColor('#eaff00')
                this.msg_text.setText('¡Correcto!')
                this.time.delayedCall(1000, this.verifyNext, [], this)
            }
            if (keyc.key !== e.key) {
                this.msg_text.setColor('#ff0000')
                this.msg_text.setText('¡Incorrecto!')
                this.headth < 0 ? this.headth = 0 : this.headth -= 1
                this.text_headth.setText(`VIDAS ${this.headth}`)
                const msg = Math.floor(Math.random() * advice.length)
                this.text_alert.setVisible(true)
                this.text_alert.setText(advice[msg])
                this.time.delayedCall(1000, this.verifyNext, [], this)
                this.time.delayedCall(3100, () => this.text_alert.setVisible(false), [], this)
            }
            if (this.headth < 1) {
                this.headth = 3
                this.scene.start('GameOver');
            }
        })
    }
}
