class Chapter {
	public static chapter;
	public static max_segment=0;
	public static max_offset=0;
	public static getChapter(s,o){
		if(this.chapter==undefined) return null;
		for(let i = 0; i < this.chapter.length; i++){
			if(this.chapter[i]["section"] == s && this.chapter[i]["level"] == o){
                return this.chapter[i];
			}
		}
	}
  public static updateChapter(c){
		console.log('c: ', c)
		for(let i=0;i<c.length;i++){
			if(c[i]["section"]>this.max_segment){
				this.max_segment = c[i]["section"];
			}
			if(c[i]["level"]>this.max_offset){
				this.max_offset = c[i]["level"];
			}
			c[i]["firstCardAward"]=JSON.parse(c[i]["firstCardAward"]);
			c[i]["generalCardAward"]=JSON.parse(c[i]["generalCardAward"]);
			if(c[i]["context_end"]!=undefined){
				c[i]["context_end"]=JSON.parse(c[i]["context_end"]);
			}
			if(c[i]["context_begin"]!=undefined){
				c[i]["context_begin"]=JSON.parse(c[i]["context_begin"]);
			}
		}
    this.chapter = c;
  }



	public static deLevel(level) {
    let l = String(level);
    if (l == ".") return [0, 0];
    let division = l.indexOf(".");
    if (division == -1) {
      return [parseInt(level), 0];
    } else {
      if (division == 0) {
        return [0, parseInt(l.substr(1, l.length))];
      } else {
        return [parseInt(l.substr(0, division)), parseInt(l.substr(division + 1, l.length))]
      }
    }
  }
}
