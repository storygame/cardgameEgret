class Roles {
	public static roles
	public static updateRoles(roles){
		for(let i =0;i<roles.length;i++){
			//format it
			roles[i]["life_story"]=JSON.parse(roles[i]["life_story"]);
		}
		// console.log("获取角色信息:",roles);
		Roles.roles = roles;
	}
	public getRolesById(id){
		for(let i=0;i<Roles.roles.length;i++){
			if(Roles.roles[i]["id"]==id){
				return Roles.roles[i];
			}
		}
		return null;
	}
	public getRolesByName(name){
		for(let i=0;i<Roles.roles.length;i++){
			if(Roles.roles[i]["name"]==name){
				return Roles.roles[i];
			}
		}
		return null;
	}
}