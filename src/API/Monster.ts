class Monster {
	public static monster;

	public static getMonster(index){
		for(let i = 0; i < this.monster.length; i++){
			if(this.monster[i]["id"] == index){
                return this.monster[i];
			}
		}
	}
    public static updateMonster(m){
        for(let i=0;i<m.length;i++){
            m[i]["skill"]=JSON.parse(m[i]["skill"]);
            m[i]["skill_description"]=JSON.parse(m[i]["skill_description"]);
        }
        this.monster = m;
    }

}
