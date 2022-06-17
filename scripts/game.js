let game = {

    lockMode: false,
    fistCard: null,
    secondCard: null,
    cards: null,
    
    techs: ['bootstrap', 'css', 'electron', 'firebase',
            'html', 'javascript', 'jquery', 'mongo', 
            'node', 'react'],

            // techs: ['bootstrap', 'css'],

    setCard: function (id){

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.fistCard){
            this.fistCard = card;
            this.fistCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {
        if(!this.firstCard && !this.secondCard) {
            return false;
        }
        return this.fistCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.fistCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.fistCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    // função para criação de cartas a partir das tecnologias do array 'techs'
    createCardsFromTechs: function () {

        // array de 'cards' vazio
        this.cards = [];

        // para cada tech do array 'techs' cria um par de cartas de ícone igual dentro do array 'cards'
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })

        // desmembra os itens do array (e de arrays internos caso possua) retornando os mesmos
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        // return this.cards;
    },

    // função que cria um array de 2 posições [0,1] contendo dois 'cards' para cada tecnologia
    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech), // chamada da função para criação de id random 
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    // função para concatenação de nome da 'tech' + criação de id random 
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

        // função para embaralhamento dos 'cards'
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length; // tamanho do currentIndex é igual ao tamanho do array cards
        let randomIndex = 0; // randomIndex inicia com valor 0

        while (currentIndex !== 0) {

            // multiplica numero randômico inteiro (entre 0 e 1) * valor do currentIndex
            randomIndex = Math.floor(Math.random() * currentIndex);  
            currentIndex--; 

            //inverte os valores dos 'cards' começando do ultimo para o primeiro de forma aleatória
            // diminuindo o 'currentIndex' a cada iteração
            [this.cards[randomIndex], this.cards[currentIndex]] = 
            [this.cards[currentIndex], this.cards[randomIndex]]; 
        }
    }
}