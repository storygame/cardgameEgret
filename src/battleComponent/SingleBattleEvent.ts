class SingleBattleEvent extends egret.Event {

	public static SINGLEBATTLEEVENT: string = "SINGLEBATTLEEVENT";

	// 护甲事件
	public static ProtectEvent: string = "ProtectEvent"
	public static decreaseProtect : string = "DecreaseProtect";
	public static increaseProtect : string = "DecreaseProtect";
	public static destoryProtect: string = "DestoryProtect";
	public static formProtect: string = "FormProtect";
	public static immunityDamage: string = "ImmunityDamage";
	public static immunityOnce:  string = "ImmunityOnce";
	public static increaseFailProtect: string = "IncreaseFailProtect";

	// 血量事件
	public static HPEvent: string = "HPEvent";
	public static decreaseHP: string = "DecreaseHP";
	public static increaseHP: string = "IncreaseHP";

	// 令事件
	public static ManaEvent: string = "ManaEvent";
	public static decreaseMana: string = "DecreaseMana";
	public static increaseMana: string = "IncreaseMana";
	public static decreaseToZeroMana: string = "DecreaseToZeroMana";
	public static increaseToFullMana: string = "IncreaseToFullMana";

	// 回合事件
	public static ExtraTurnEvent: string = "ExtraTurnEvent";
	public static increaseExtraTurn: string = "IncreaseExtraTurn";

	public static ConditionEvent: string = "ConditionEvent";
	public static addConditionSuccess: string = "AddConditionSuccess";
	public static addConditionFail: string = "AddConditionFail";
	public static removeCondition: string = "RemoveCondition";

	public static SecretEvent: string = "SecretEvent";
	public static addSecretSuccess: string = "AddSecretSuccess";
	public static addSecretFail: string = "AddSecretFail";
	public static removeSecret: string = "RemoveSecret";

	public static BuffEvent: string = "BuffEvent";
	public static addBuffSuccess: string = "AddBuffSuccess";
	public static addBuffFail: string = "AddBuffFail";
	public static removeBuff: string = "RemoveBuff";

	public static CardEvent: string = "CardEvent";
	public static cards999: string = "Cards999";
	public static cards_999: string = "Cards_999";
	public static drawCardSuccess: string = "DrawCardSuccess";
	public static drawCardFail: string = "DrawCardFail";
	public static drawNoCardTired: string = "DrawNoCardTired";
	public static disCard: string = "DisCard";
	

    private baseType: string;	// 基本类型
	private player: any;		//效果接受者的id
	private miniType: string;	// 详细类型
	private card_effect: any;	// card_effect

	public constructor(type: string, baseType: any, miniType: string, player: any, card_effect: any, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
		this.baseType = baseType;
        this.player = player;
		this.miniType = miniType;
		this.card_effect = card_effect
		
    }
}