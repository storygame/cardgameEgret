const GameRules = {
	// 玩家的萌化值的初始默认值
	CuteValueDefault: 30,
	//玩家萌化值下限
	MinCuteValue: 0,
	//玩家的萌化值上限
	MaxCuteValue: 100,
	// 玩家的星星的初始默认值
	StarValueDefault: 0,
	//玩家的星星上限
	MaxStarValue: 10,
	//玩家冷漠值的初始默认值
	ProtectValueDefault: 0,
	//玩家的冷漠值上限
	MaxProtectValue: 300,
	// 手牌的初始
	CardsValueDefault: 4,
	//玩家的手牌上限
	MaxCardsValue: 8,
	// 卡池里牌的初始数量,也是卡池的上限
	CardsPoolValueDefault: 30,
	// 最大回合数
	MaxBattleTurns: 60,
	//玩家最大额外回合上限
	MaxExtraTurns: 3,
	// 每回合开始时抽牌几张
	DrawCardsPerTurn: 1,
	// 每回合开始时增加星星
	AddStarPerTurn: 1,
	//玩家的buff槽位上限
	MaxBuffNum: 5,
	//玩家的触发槽位上限
	MaxConditionNum: 5,
	//玩家的奥秘槽位上限
	MaxSecretNum: 5,
}


const consoleSymbol = {
	"yes": "\u001b[0;32;40m[✓]\u001b[0m",
	"no": "\u001b[0;31;40m[✗]\u001b[0m",
	"info": "\u001b[1;34;40m[*]\u001b[0m"
};
