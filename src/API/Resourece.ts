class Resource {
	public static resource;

	public static getResource(name_zh){
		for(let i = 0; i < this.resource.length; i++){
			if(this.resource[i]["name_zh"]==name_zh){
                return this.resource[i];
			}
		}
	}
    public static updateResource(r){
        this.resource = r;
    }
	
}
