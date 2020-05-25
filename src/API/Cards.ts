class Cards {
	public static cards: any[];
	public static cardsRareMap={"N":[],"R":[],"SR":[],"SSR":[]};
	public static setCardsData(data){
		Cards.cards = data;
		// console.log('All cards: ', data)
		this.cardsRareMap={"N":[],"R":[],"SR":[],"SSR":[]};
		for(let c of Cards.cards){
			c["effect"] = JSON.parse(c["effect"]);
			if(c["effect"]["card_rare"]=="N"){
				this.cardsRareMap["N"].push(c);
			}else if(c["effect"]["card_rare"]=="R"){
				this.cardsRareMap["R"].push(c);
			}
			else if(c["effect"]["card_rare"]=="SR"){
				this.cardsRareMap["SR"].push(c);
			}else if(c["effect"]["card_rare"]=="SSR"){
				this.cardsRareMap["SSR"].push(c);
			}
		}
	}
	public static getCardById(id){
		for(let i=0;i<Cards.cards.length;i++){
			if(Cards.cards[i]['id']==id){
				return Cards.cards[i];
			}
		}
		return null;
	}
	public static getCost(cardId){
		for(let i = 0; i < Cards.cards.length; i++){
			if(Cards.cards[i].id == cardId){
				return Cards.cards[i].effect.card_cost;
			}
		}
	}
	public static getCardListByIds(cards_id){
		let res=[];
		for(let i=0;i<cards_id.length;i++){
			res.push(Cards.getCardById(cards_id[i]));
		}
		return res;
	}

}
