module.exports = class Monster {
    constructor({monsterName = 'Unknown', minimumLife = 0, currentLife = 100}) {
       this.monsterName = monsterName
       this.minimumLife = minimumLife
       this.currentLife = currentLife 
       this.isAlive = currentLife >= minimumLife ? true : false

    } 
    updateLife = (lifeChangeAmount) => {
        this.currentLife = this.currentLife - lifeChangeAmount;
        this.currentLife < 0 ? this.currentLife = 0 : this.currentLife;
        this.isAlive = this.currentLife > this.minimumLife ? true : false
    }
    randomLifeDrain = (minimumLifeDrain, maximumLifeDrain) => {
        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        let randomLifeDrain = getRandomInteger(minimumLifeDrain, (maximumLifeDrain + 1))
        this.updateLife(randomLifeDrain)
        console.log(`${this.monsterName} random power drain of ${randomLifeDrain}`)

    }
}