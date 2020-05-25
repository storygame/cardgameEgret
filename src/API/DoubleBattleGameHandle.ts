class DoubleBattleGameHandle extends eui.Component{
	beginTurn(game_info) {
		let player, nowTurnSerialNum;
		if (game_info["now_turn"] == game_info["player1"]['id']) {
			player = game_info["player1"];
			nowTurnSerialNum = 1;
		}
		if (game_info["now_turn"] == game_info["player2"]['id']) {
			player = game_info["player2"];
			nowTurnSerialNum = 2;
		}
		if (game_info["game_status"]['RUNNING'] == undefined || game_info["game_status"] !== player) {
			game_info["game_status"]['RUNNING'] = player;
		}
		// console.log(consoleSymbol["info"] + " Now Turn:", game_info["now_turn"], " Now player:", player['id']);

		//回合开始进行condition结算
		game_info = this.game_condition(game_info, undefined, 'begin');
		// console.log(consoleSymbol["info"]+" game_condtion ", game_info == undefined, game_info["player1"] == undefined);
		//回合开始进行buff结算
		game_info = this.game_buff(game_info, 'begin');
		// console.log(consoleSymbol["info"]+" game_buff ", game_info == undefined, game_info["player1"] == undefined);
		//回合开始时玩家抽牌并增加魔法水晶,设置now_star =  star_value
		// console.log(consoleSymbol["yes"] + " Add star for player", player['id']);
		player = this._card(game_info, player, GameRules['DrawCardsPerTurn']);
		// console.log(consoleSymbol["info"]+" draw card ", game_info == undefined, game_info["player1"] == undefined);
		player = this._star(player, GameRules['AddStarPerTurn']);
		//重置本回合水晶
		player["now_star"] = player["star_value"];
		// console.log(consoleSymbol["info"]+" star add ", game_info == undefined, game_info["player1"] == undefined);
		// this.IsFinished(game_info);
		return game_info;
	}
	useOneCard(game_info, sourcePlayer, card_effect) {
		let c = card_effect;
		//判断玩家能否使用这张卡牌,令是否足够
		if (sourcePlayer == undefined) {
			console.log(consoleSymbol["no"] + " source is invalid and can not get rignt player object.");
		} else {
			if (sourcePlayer["now_star"] >= c["card_cost"]) {
				//可以使用这张牌，玩家本回合费用减少
				sourcePlayer["now_star"] -= c["card_cost"];
				console.log(consoleSymbol["yes"] + " 玩家使用了一张卡, 减去 " + c["card_cost"] + " 个令 ,还剩下 " + sourcePlayer["now_star"] + " 个令");
				sourcePlayer["cards_value"]--;
				//使用这张卡牌,将last_card置为这张卡牌
				game_info["last_card"] = c;
			} else {
				//玩家不能使用这张牌,上次使用的卡牌为空
				game_info["last_card"] = {};
				console.log(consoleSymbol["no"] + " 玩家没有足够的费用使用这张牌,已拒绝.");
				return game_info;
			}
		}
		//出牌前进行source指定playerSerialNum
		let playerSerialNum;
		if (sourcePlayer["id"] == game_info["player1"]["id"]) {
			playerSerialNum = 1;
		}
		if (sourcePlayer["id"] == game_info["player2"]["id"]) {
			playerSerialNum = 2;
		}
		let nowCard = card_effect;
		nowCard["source"] = playerSerialNum;
		while (nowCard["other_card_effect"] != undefined) {
			nowCard = nowCard["other_card_effect"];
			nowCard["source"] = playerSerialNum;
		}
		//出牌前要进行condition结算(有可能触发condition)
		game_info = this.game_condition(game_info, card_effect, 1);
		// pointer = 0的卡牌不应该存在

		this.run_card_effect(game_info, card_effect);

		//出牌后要进行condition结算(结算后的状态有可能触发静态condition和后结算动态condition)
		game_info = this.game_condition(game_info, card_effect, 2);
		// this.IsFinished(game_info);
		return game_info;
	}
	endTurn(game_info) {
		let player, nowTurnSerialNum, opponent, opponentSerialNum;
		if (game_info["now_turn"] == game_info["player1"]['id']) {
			player = game_info["player1"];
			nowTurnSerialNum = 1;
			opponent = game_info["player2"];
			opponentSerialNum = 2;
		}
		if (game_info["now_turn"] == game_info["player2"]['id']) {
			player = game_info["player2"];
			nowTurnSerialNum = 2;
			opponent = game_info["player1"];
			opponentSerialNum = 1;
		}
		//回合结束进行condition结算
		game_info = this.game_condition(game_info, undefined, 'end');
		//回合结束进行buff结算
		game_info = this.game_buff(game_info, 'end');

		if (game_info["mode"] == "PVE" && player["id"] != 0) {
			//冒险模式中,玩家回合结束会检查手牌和牌库是否都为空,如果为空会为玩家重置牌库
			if (player["cards_pool"].length == 0 && player["cards_list"].length == 0) {
				player["cards_pool"] = player["cards_original_pool"].concat();
				if (player["cards_pool"].length > 0) {
					//shuffle 整个cards_pool,以免每次抽出来的牌都一样
					//shuffle实现为Durstenfeld shuffle
					for (let i = player["cards_pool"].length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						const temp = player["cards_pool"][i];
						player["cards_pool"][i] = player["cards_pool"][j];
						player["cards_pool"][j] = temp;
					}
				}
				console.log(consoleSymbol["info"] + " 重置玩家牌库.");
			}
		}

		//进行回合变更
		// 判断extra_turn信息并更改now_turn,game_status['RUNNING'],增加turns
		if (game_info["extra_turn"]["player" + String(nowTurnSerialNum)] > 0) {
			// 存在extra_turn,不切换回合
			game_info["extra_turn"]["player" + String(nowTurnSerialNum)]--;
			// this.IsFinished(game_info);
		} else {
			game_info["now_turn"] = opponent['id'];
			game_info["game_status"]['RUNNING'] = opponent;
			game_info['turns']++;
			// this.IsFinished(game_info);
		}
		return game_info;
	}
	useSkill(game_info, sourcePlayer) {
		let card_effect = sourcePlayer["skill"];
		let c = card_effect;
		if (sourcePlayer == undefined) {
			console.log(consoleSymbol["no"] + " source is invalid and can not get rignt player object.");
		} else {
			if (sourcePlayer["now_star"] >= c["card_cost"]) {
				//可以使用这张牌，玩家本回合费用减少
				sourcePlayer["now_star"] -= c["card_cost"];
				console.log(consoleSymbol["yes"] + " 玩家使用了技能, 减去 " + c["card_cost"] + " 个令 ,还剩下 " + sourcePlayer["now_star"] + " 个令");
			} else {
				//玩家不能使用技能
				console.log(consoleSymbol["no"] + " 玩家没有足够的费用使用技能,已拒绝.");
				return game_info;
			}
		}

		//出牌前进行source指定playerSerialNum
		let playerSerialNum;
		if (sourcePlayer["id"] == game_info["player1"]["id"]) {
			playerSerialNum = 1;
		}
		if (sourcePlayer["id"] == game_info["player2"]["id"]) {
			playerSerialNum = 2;
		}
		let nowCard = card_effect;
		nowCard["source"] = playerSerialNum;
		while (nowCard["other_card_effect"] != undefined) {
			nowCard = nowCard["other_card_effect"];
			nowCard["source"] = playerSerialNum;
		}
		//使用技能前要进行condition结算(有可能触发condition)
		game_info = this.game_condition(game_info, card_effect, 1);

		this.run_card_effect(game_info, card_effect);

		//使用技能后要进行condition结算(结算后的状态有可能触发静态condition和后结算动态condition)
		game_info = this.game_condition(game_info, card_effect, 2);
		// this.IsFinished(game_info);
		return game_info;
	}

	/*
	 * 这个函数执行了一个card_effect的解析,单独剥离这个过程是为了让other_card_effect的递归执行过程更加方便
	 * 与大多数函数一样,这个函数不返回任何值(返回也不会被接收),所有对于card_effect和game_info的更改都是对引用的更改,无需返回即可生效
	 */
	run_card_effect(game_info, card_effect) {
		let c = card_effect;
		if (c['pointer'] == 0) {
			console.log(consoleSymbol["no"] + " There is a valid card with pointer 0.");
			return game_info;
		}
		//condition使用的话要加入condition列表
		if (c['condition'] !== undefined && c['condition']['pointer'] > 0 && c['condition']['pointer'] < 5) {
			if (c['condition']['secret'] == true && c['source'] == 1) {
				//添加到玩家1的secret槽位中
				if (this._addSecret(game_info["player1"], card_effect)) {
					game_info["condition1"].push(c);
				}
			}
			if (c['condition']['secret'] == true && c['source'] == 2) {
				//添加到玩家2的secret槽位中
				if (this._addSecret(game_info["player2"], card_effect)) {
					game_info["condition2"].push(c);
				}
			}
			if (c['condition']['secret'] !== true && c["source"] == 1) {
				//添加到玩家1的condition槽位中
				if (this._addCondition(game_info["player1"], card_effect)) {
					game_info["condition"].push(c);
				}
			}
			if (c['condition']['secret'] !== true && c["source"] == 2) {
				//添加到玩家2的condition槽位中
				if (this._addCondition(game_info["player2"], card_effect)) {
					game_info["condition"].push(c);
				}
			}
		} else {
			//非condition
			if (c["buff_turn"] > 0) {
				//buff结算
				if (c["source"] == 1) {
					if (this._addBuff(game_info["player1"], card_effect)) {
						if (c['settlement'] == 1 || c['settlement'] == 3 || c['settlement'] == 5) {
							//回合开始结算的buff
							game_info["buff_list1"].push(c);
						}
						if (c['settlement'] == 2 || c['settlement'] == 4 || c['settlement'] == 6) {
							game_info["buff_list2"].push(c);
						}
					}
				}
				if (c["source"] == 2) {
					if (this._addBuff(game_info["player2"], card_effect)) {
						if (c['settlement'] == 1 || c['settlement'] == 3 || c['settlement'] == 5) {
							//回合开始结算的buff
							game_info["buff_list1"].push(c);
						}
						if (c['settlement'] == 2 || c['settlement'] == 4 || c['settlement'] == 6) {
							game_info["buff_list2"].push(c);
						}
					}
				}
			} else {
				//非buff结算
				this._normal(game_info, card_effect);
			}
		}
		//执行完一层结算,根据是否拥有other_card_effect执行递归结算
		if (c["other_card_effect"] != undefined) {
			console.log("递归结算卡牌或技能", c["other_card_effect"]);
			this.run_card_effect(game_info, c["other_card_effect"]);
		}
	}
	/*
	 * 负责对game_info里的condition列表进行维护和结算应该结算的condition
	 * 很明显这里的结算是直接算符合条件的静态condition和动态condition
	 * 参数重载:如果card_effect为undefined,视为结算静态condition,否则是动态
	 */

	game_condition(game_info, card_effect, condition_time) {
		let player;
		//这是一个不该存在的bug
		if (game_info['condition'] == undefined) {
			console.log(consoleSymbol["no"] + " Why this condition is undefined? forget it, only god knows the reason.");
			game_info['condition'] = [];
			return game_info;
		}
		//针对condition列表进行结算
		for (let c of game_info['condition']) {
			// console.log(consoleSymbol["no"] + " Debug:判断奥秘是否执行,", c);
			if (this._condition(game_info, c, card_effect, condition_time)) {
				//执行condition,并在game_info['condition']和player['condition_list']移除它
				for (let o in game_info['condition']) {
					if (game_info['condition'][o] == c) {
						game_info['condition'].splice(o, 1);
					}
				}
				if (c["source"] == 1) {
					player = game_info["player1"];
				}
				if (c["source"] == 2) {
					player = game_info["player2"];
				}
				for (let o in player["condition_list"]) {
					if (player["condition_list"][o] == c) {
						player["condition_list"].splice(o, 1);
						// condition移除动画
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.removeCondition, player, c);
						DoubleBattlePage.instance().dispatchEvent(event);
					}
				}
				//执行该condition
				if (c["buff_turn"] > 0) {
					//buff结算
					if (c['settlement'] == 1 || c['settlement'] == 3 || c['settlement'] == 5) {
						//回合开始结算的buff
						game_info["buff_list1"].push(c);
					}
					if (c['settlement'] == 2 || c['settlement'] == 4 || c['settlement'] == 6) {
						game_info["buff_list2"].push(c);
					}
				} else {
					//非buff结算
					game_info = this._normal(game_info, c);
				}
			}
		}
		//condition1 执行, 玩家1 的奥秘
		for (let c of game_info["condition1"]) {
			// console.log(consoleSymbol["no"] + " Debug:判断奥秘是否执行,", c);
			if (this._condition(game_info, c, card_effect, condition_time)) {
				//执行condition,并在game_info["condition1"]和player1的secret_condition_list移除它
				for (let o in game_info["condition1"]) {
					if (game_info["condition1"][o] == c) {
						game_info["condition1"].splice(o, 1);
					}
				}
				if (c["source"] == 1) {
					player = game_info["player1"];
				}
				//如果是player2的话是要报错的
				if (c["source"] == 2) {
					console.log(consoleSymbol["no"] + " Error:有一个属于玩家2的奥秘被置入game_info['condition1'],card_effect:", c);
					player = game_info["player2"];
				}
				for (let o in player["secret_condition_list"]) {
					if (player["secret_condition_list"][o] == c) {
						player["secret_condition_list"].splice(o, 1);
						// 显示移除一个secret动画
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.removeSecret, player, c);
						DoubleBattlePage.instance().dispatchEvent(event);
					}
				}
				//执行
				if (c["buff_turn"] > 0) {
					//buff结算
					if (c['settlement'] == 1 || c['settlement'] == 3 || c['settlement'] == 5) {
						//回合开始结算的buff
						game_info["buff_list1"].push(c);
					}
					if (c['settlement'] == 2 || c['settlement'] == 4 || c['settlement'] == 6) {
						game_info["buff_list2"].push(c);
					}
				} else {
					//非buff结算
					game_info = this._normal(game_info, c);
				}
			}
		}
		//condition2 执行, 玩家2 的奥秘
		for (let c of game_info["condition2"]) {
			// console.log(consoleSymbol["no"] + " Debug:判断奥秘是否执行,", c);
			if (this._condition(game_info, c, card_effect, condition_time)) {
				//执行condition,并在game_info["condition2"]和player2的secret_condition_list移除它
				for (let o in game_info["condition2"]) {
					if (game_info["condition2"][o] == c) {
						game_info["condition2"].splice(o, 1);
					}
				}
				if (c["source"] == 2) {
					player = game_info["player2"];
				}
				//如果是player1的话是要报错的
				if (c["source"] == 1) {
					console.log(consoleSymbol["no"] + " Error:有一个属于玩家1的奥秘被置入game_info['condition2'],card_effect:", c);
					player = game_info["player1"];
				}
				if(c['source']!=2){
					console.log(consoleSymbol["no"]," 发生错误有一个牌的source没有被设置:",c);
				}
				for (let o in player["secret_condition_list"]) {
					if (player["secret_condition_list"][o] == c) {
						player["secret_condition_list"].splice(o, 1);
						// secret移除动画
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.removeSecret, player, c);
						DoubleBattlePage.instance().dispatchEvent(event);
					}
				}
				//执行
				if (c["buff_turn"] > 0) {
					//buff结算
					if (c['settlement'] == 1 || c['settlement'] == 3 || c['settlement'] == 5) {
						//回合开始结算的buff
						game_info["buff_list1"].push(c);
					}
					if (c['settlement'] == 2 || c['settlement'] == 4 || c['settlement'] == 6) {
						game_info["buff_list2"].push(c);
					}
				} else {
					//非buff结算
					game_info = this._normal(game_info, c);
				}
			}
		}
		return game_info;
	}
	game_buff(game_info, time) {
		//1表示己方回合开始结算,2表示己方回合结束结算,3表示对方回合开始结算,4表示对方回合结束结算,5表示双方开始时都结算，6表示双方结束时都结算

		if (time == 'begin') {
			if (game_info["buff_list1"].length == 0) {
				return game_info;
			}
			for (let o in game_info["buff_list1"]) {
				// settlement 结算过滤
				let eachBuff = game_info["buff_list1"][o];
				let player = game_info["player" + game_info["buff_list1"][o]["source"]];
				let nowTurn = game_info["now_turn"];
				//己方回合开始
				if (eachBuff["settlement"] == 1 && player["id"] == nowTurn) {
					game_info = this._buff(game_info, eachBuff);
				}
				//对方回合开始
				if (eachBuff["settlement"] == 3 && player["id"] != nowTurn) {
					game_info = this._buff(game_info, eachBuff);
				}
				//双方回合开始
				if (eachBuff["settlement"] == 5) {
					game_info = this._buff(game_info, eachBuff);
				}
			}
		} else if (time == 'end') {
			if (game_info["buff_list2"].length == 0) {
				return game_info;
			}
			for (let o in game_info["buff_list2"]) {
				//settlement结算过滤
				let eachBuff = game_info["buff_list2"][o];
				let player = game_info["player" + game_info["buff_list2"][o]["source"]];
				let nowTurn = game_info["now_turn"];
				//己方回合结束
				if (eachBuff["settlement"] == 2 && player["id"] == nowTurn) {
					game_info = this._buff(game_info, eachBuff);
				}
				//对方回合结束
				if (eachBuff["settlement"] == 4 && player["id"] != nowTurn) {
					game_info = this._buff(game_info, eachBuff);
				}
				//双方回合结束
				if (eachBuff["settlement"] == 6) {
					game_info = this._buff(game_info, eachBuff);
				}
			}
		} else {
			console.log(consoleSymbol["no"] + " Error: Invalid parameters.");
		}
		//从检查buff_list,移除无效buff,如果在player中的buff也有这个buff,移除它
		let tmp_c, player;
		for (let o in game_info["buff_list1"]) {
			tmp_c = game_info["buff_list1"][o];
			player = game_info["player" + String(game_info["buff_list1"][o]["source"])];
			if (player == undefined) {
				console.log(consoleSymbol["no"] + " Error:在移除buff时出现一个没有source指向的card,card_effect:", game_info["buff_list1"][o]);
			}
			if (game_info["buff_list1"][o]["buff_turn"] <= 0) {
				game_info["buff_list1"].splice(o, 1);
				//在player的buff中移除这个buff
				for (let player_o in player["buff_list"]) {
					if (player["buff_list"][player_o] == tmp_c) {
						player["buff_list"].splice(player_o, 1);
						// buff移除动画
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.removeBuff, player, tmp_c);
						DoubleBattlePage.instance().dispatchEvent(event);
					}
				}
			}
		}
		for (let o in game_info["buff_list2"]) {
			tmp_c = game_info["buff_list2"][o];
			player = game_info["player" + String(game_info["buff_list2"][o]["source"])];
			if (game_info["buff_list2"][o]["buff_turn"] <= 0) {
				game_info["buff_list2"].splice(o, 1);
				//在player的buff中移除这个buff
				for (let player_o in player["buff_list"]) {
					if (player["buff_list"][player_o] == tmp_c) {
						player["buff_list"].splice(player_o, 1);
						// buff移除动画
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.removeBuff, player, tmp_c);
						DoubleBattlePage.instance().dispatchEvent(event);
					}
				}
			}
		}
		return game_info;
	} /* --------------------------------------------------卡牌结算------------------------------------------------------------ */
	_condition(game_info, card_effect, aim_card_effect, condition_time) {
		if (aim_card_effect == undefined) {
			//通过condition_time来判断是否是静态结算,调用静态结算,
			if (card_effect["condition"]["condition_time"] == undefined || card_effect["condition"]["condition_time"] == 0) {
				// console.log(consoleSymbol["no"] + " Debug: 执行一个静态奥秘判断,是否成功执行:", this._condition_static(game_info, card_effect));
				return this._condition_static(game_info, card_effect);
			}
			// 原来的静态奥秘判断,通过所有项进行判断
			// if ((card_effect["damage"] == 0 || card_effect["damage"] == undefined) && (card_effect["cards"] == 0 || card_effect["cards"] == undefined) && (card_effect["star"] == 0 || card_effect["star"] == undefined) && (card_effect["protect"] == 0 || card_effect["protect"] == undefined))
		} else {
			//通过condition_time来判断是否是动态结算,调用动态结算,动态结算包含静态结算和动态结算
			// 原来的动态奥秘判断,通过所有项进行判断
			// if (!((card_effect["damage"] == 0 || card_effect["damage"] == undefined) && (card_effect["cards"] == 0 || card_effect["cards"] == undefined) && (card_effect["star"] == 0 || card_effect["star"] == undefined) && (card_effect["protect"] == 0 || card_effect["protect"] == undefined)))
			if (card_effect["condition"]["condition_time"] == 1 || card_effect["condition"]["condition_time"] == 2) {
				if (condition_time === card_effect["condition"]["condition_time"]) {
					//condition_time符合的动态condition才能进行判断结算
					//动态判断和静态判定都有的condtion
					if (card_effect["condition"]["cute_value"] != undefined || card_effect["condition"]["cards_value"] != undefined || card_effect["condition"]["star_value"] != undefined || card_effect["condition"]["protect_value"] != undefined) {
						// console.log(consoleSymbol["no"] + " Debug: 执行一个动态静态组合奥秘判断,是否成功执行:", this._condition_dynamic(game_info, card_effect, aim_card_effect), this._condition_static(game_info, card_effect));
						console.log(card_effect);
						return this._condition_dynamic(game_info, card_effect, aim_card_effect) && this._condition_static(game_info, card_effect);
					} else {
						//只有动态判断触发的condtion
						// console.log(consoleSymbol["no"] + " Debug: 执行一个动态奥秘判断,是否成功执行:", this._condition_dynamic(game_info, card_effect, aim_card_effect));
						console.log(card_effect);
						return this._condition_dynamic(game_info, card_effect, aim_card_effect);
					}
				} else {
					return false;
				}
			} else {
				//注意aim_card_effect不是undefined也可能是一个需要静态判定的condition
				// console.log(consoleSymbol["no"] + " Debug: 执行一个静态奥秘判断,是否成功执行:", this._condition_static(game_info, card_effect));
				return this._condition_static(game_info, card_effect);
			}
		}
	}
	/*
	 * 返回true或false, 判断这个condition是否应该被执行.
	 * 静态condition中的card_effect参数是指condition本身.
	 * 这个函数常用于回合开始和回合结束时调用
	 */
	_condition_static(game_info, card_effect) {
		let c = card_effect;
		let TwoAim = false;
		let playerAim, playerAimNum; // 此处的playerAim是指condition判断的指向对象,而并非执行指向的对象,执行指向的对象将在_normal里判断并更改状态
		let satisfy = true;

		//pointer合法检查和目标确认
		if (c['pointer'] < 0 || c['pointer'] > 4 || c['condition']['pointer'] < 0 || c['condition']['pointer'] > 4) {
			console.log(consoleSymbol["no"] + " Error: Unexpected pointer value, not in [0,4].");
			return game_info;
		}
		if (c['condition']['pointer'] == 0) {
			return game_info;
		} else {
			if (c['condition']['pointer'] == 3) {
				TwoAim = true;
			}
			if (c['condition']['pointer'] == 4) {
				playerAimNum = _.random(1, 2);
				playerAim = game_info['player' + String(playerAimNum)];
			}
			if (c['condition']['pointer'] == 1 && c['source'] == 1) {
				playerAim = game_info["player1"];
				playerAimNum = 1;
			}
			if (c['condition']['pointer'] == 1 && c['source'] == 2) {
				playerAim = game_info["player2"];
				playerAimNum = 2;
			}
			if (c['condition']['pointer'] == 2 && c['source'] == 1) {
				playerAim = game_info["player2"];
				playerAimNum = 2;
			}
			if (c['condition']['pointer'] == 2 && c['source'] == 2) {
				playerAim = game_info["player1"];
				playerAimNum = 1;
			}
		}
		/*
		 * 已经确认了condition目标
		 * TwoAim表示对双方都生效
		 * RandomAim表示随机选择目标,已选择完毕存入playerAim
		 * playerAim 存放的目标生效对象
		 * playerAimNum 表示目标的序号(1|2)
		 */
		if (TwoAim == true) {
			// 双方的属性值都满足condition才执行
			if (c['condition']["cute_value"] !== undefined) {
				if (!(operand_result(c['condition']["cute_value_operand"], game_info["player1"]["cute_value"], c['condition']["cute_value"]) && operand_result(c['condition']["cute_value_operand"], game_info["player2"]["cute_value"], c['condition']["cute_value"]))) {
					satisfy = false;
				}
			}
			if (c['condition']["cards_value"] !== undefined) {
				if (!(operand_result(c['condition']["cards_value_operand"], game_info["player1"]["cards_value"], c['condition']["cards_value"]) && operand_result(c['condition']["cards_value_operand"], game_info["player2"]["cards_value"], c['condition']["cards_value"]))) {
					satisfy = false;
				}
			}
			if (c['condition']["star_value"] !== undefined) {
				if (!(operand_result(c['condition']["star_value_operand"], game_info["player1"]["star_value"], c['condition']["star_value"]) && operand_result(c['condition']["star_value_operand"], game_info["player2"]["star_value"], c['condition']["star_value"]))) {
					satisfy = false;
				}
			}
			if (c['condition']["protect_value"] !== undefined) {
				//特殊值处理无视operand
				if (c['condition']["protect_value"] == -1000) {
					// 玩家处于无法获得冷漠值1次的特殊状态
					let sp_operand = {
						'value': -1000,
						'times': 1
					};
					let specialSatisfy1 = false, specialSatisfy2 = false;
					for (let t of game_info["player1"]["protect_special"]) {
						if (t['value'] == sp_operand['value'] && t['times'] >= sp_operand['times']) {
							specialSatisfy1 = true;
							break;
						}
					}
					for (let t of game_info["player2"]["protect_special"]) {
						if (t['value'] == sp_operand['value'] && t['times'] >= sp_operand['times']) {
							specialSatisfy2 = true;
							break;
						}
					}
					if (!(specialSatisfy1 == true && specialSatisfy2 == true)) {
						satisfy = false;
					}
				} else if (c['condition']["protect_value"] == 1000) {
					// 玩家处于免疫的特殊状态
					let sp_operand = {
						'value': 1000,
						'times': 0
					};
					let specialSatisfy1 = false, specialSatisfy2 = false;
					for (let t of game_info["player1"]["protect_special"]) {
						if (t['value'] == sp_operand['value'] && t['times'] == sp_operand['times']) {
							specialSatisfy1 = true;
							break;
						}
					}
					for (let t of game_info["player2"]["protect_special"]) {
						if (t['value'] == sp_operand['value'] && t['times'] == sp_operand['times']) {
							specialSatisfy2 = true;
							break;
						}
					}
					if (!(specialSatisfy1 == true && specialSatisfy2 == true)) {
						satisfy = false;
					}
				} else {
					if (!(operand_result(c['condition']["protect_value_operand"], game_info["player1"]["protect_value"], c['condition']["protect_value"]) && operand_result(c['condition']["protect_value_operand"], game_info["player2"]["protect_value"], c['condition']["protect_value"]))) {
						satisfy = false;
					}
				}
			}
			return satisfy;
		} else {
			//playerAim生效
			if (c['condition']["cute_value"] !== undefined) {
				if (!operand_result(c['condition']["cute_value_operand"], playerAim["cute_value"], c['condition']["cute_value"])) {
					satisfy = false;
				}
			}
			if (c['condition']["cards_value"] !== undefined) {
				if (!operand_result(c['condition']["cards_value_operand"], playerAim["cards_value"], c['condition']["cards_value"])) {
					satisfy = false;
				}
			}
			if (c['condition']["star_value"] !== undefined) {
				if (!operand_result(c['condition']["star_value_operand"], playerAim["star_value"], c['condition']["star_value"])) {
					satisfy = false;
				}
			}
			if (c['condition']["protect_value"] !== undefined) {
				//特殊值处理无视operand
				if (c['condition']["protect_value"] == -1000) {
					// 玩家处于无法获得冷漠值1次的特殊状态
					let sp_operand = {
						'value': -1000,
						'times': 1
					};
					let specialSatisfy = false;
					for (let t of playerAim["protect_special"]) {
						if (t['value'] == sp_operand['value'] && t['times'] >= sp_operand['times']) {
							specialSatisfy = true;
							break;
						}
					}
					if (!(specialSatisfy == true)) {
						satisfy = false;
					}
				} else if (c['condition']["protect_value"] == 1000) {
					// 玩家处于免疫的特殊状态
					let sp_operand = {
						'value': 1000,
						'times': 0
					};
					let specialSatisfy1 = false;
					for (let t of playerAim["protect_special"]) {
						if (t['value'] == sp_operand['value'] && t['times'] == sp_operand['times']) {
							specialSatisfy1 = true;
							break;
						}
					}
					if (!(specialSatisfy1 == true)) {
						satisfy = false;
					}
				} else {
					if (!operand_result(c['condition']["protect_value_operand"], playerAim["protect_value"], c['condition']["protect_value"])) {
						satisfy = false;
					}
				}
			}
			return satisfy;
		}
	}
	/*
	 * 返回true或false, 判断这个condition是否应该被执行.
	 * 动态condition中的card_effect参数是指condition本身.
	 * aim_card_effect是作为触发动态condition所使用的卡牌的card_effect
	 * 这个函数常用于useCard后调用
	 */
	_condition_dynamic(game_info, cond_card_effect, aim_card_effect) {
		let c = cond_card_effect;
		let d = aim_card_effect;
		let TwoCondAim = false, TwoUseAim = false;
		let playerAim, playerAimNum; // 此处的playerAim是指condition判断的指向对象,而并非执行指向的对象
		let playerUse, playerUseNum; // 此处的playerUse是指玩家使用的卡牌(aim_card_effect)的指向对象
		let satisfy = true;
		//pointer合法检查和目标确认
		if (c['pointer'] < 0 || c['pointer'] > 4 || c['condition']['pointer'] < 0 || c['condition']['pointer'] > 4) {
			console.log(consoleSymbol["no"] + " Error: Unexpected pointer value, not in [0,4].");
			return false;
		}
		if (c['condition']['pointer'] == 0) {
			return false;
		} else {
			if (c['condition']['pointer'] == 3) {
				TwoCondAim = true;
			}
			if (c['condition']['pointer'] == 4) {
				playerAimNum = _.random(1, 2);
				playerAim = game_info['player' + String(playerAimNum)];
			}
			if (c['condition']['pointer'] == 1 && c['source'] == 1) {
				playerAim = game_info["player1"];
				playerAimNum = 1;
			}
			if (c['condition']['pointer'] == 1 && c['source'] == 2) {
				playerAim = game_info["player2"];
				playerAimNum = 2;
			}
			if (c['condition']['pointer'] == 2 && c['source'] == 1) {
				playerAim = game_info["player2"];
				playerAimNum = 2;
			}
			if (c['condition']['pointer'] == 2 && c['source'] == 2) {
				playerAim = game_info["player1"];
				playerAimNum = 1;
			}
		}
		// 判断useCard的指向目标
		if (d['pointer'] < 0 || d['pointer'] > 4) {
			console.log(consoleSymbol["no"] + " Error: Unexpected pointer value, not in [0,4].");
			return false;
		}
		if (d['pointer'] == 0) {
			return false;
		}
		if (d['pointer'] == 3) {
			TwoUseAim = true;
		}
		if (d['pointer'] == 4) {
			//任何已经结算后的卡牌都应该是有确切指向目标的
			console.log(consoleSymbol["no"] + " Error: 在动态奥秘结算中,一个已经结算过的卡牌的指向目标仍是随机目标.");
		}
		if (d['pointer'] == 1 && d['source'] == 1) {
			playerUse = game_info["player1"];
			playerUseNum = 1;
		}
		if (d['pointer'] == 1 && d['source'] == 2) {
			playerUse = game_info["player2"];
			playerUseNum = 2;
		}
		if (d['pointer'] == 2 && d['source'] == 1) {
			playerUse = game_info["player2"];
			playerUseNum = 2;
		}
		if (d['pointer'] == 2 && d['source'] == 2) {
			playerUse = game_info["player1"];
			playerUseNum = 1;
		}
		//只有当使用卡牌的结算目标和动态condition的条件目标一致时,这个条件才有可能满足
		//例:当己方受到伤害大于5,这个己方是指具体的条件目标.
		//这个目标需要和使用的"使对手萌化值增加6点"中的"对手"指向的是同一目标才行
		// console.log("playerUseNum:" + playerUseNum + ", playerAimNum:" + playerAimNum);
		if (playerUseNum !== playerAimNum || TwoUseAim !== TwoCondAim) {
			return false;
		}
		/*
		 * 已经确认了condition目标
		 * TwoAim表示对双方都生效
		 * RandomAim表示随机选择目标,已选择完毕存入playerAim
		 * playerAim 存放的目标生效对象
		 * playerAimNum 表示目标的序号(1|2)
		 */
		if (TwoUseAim && TwoCondAim) {
			if (c['condition']["damage"] !== undefined) {
				if (!operand_result(c['condition']["damage_operand"], d["damage"], c['condition']["damage"])) {
					satisfy = false;
				}
			}
			if (c['condition']["cards"] !== undefined) {
				if (!operand_result(c['condition']["cards_operand"], d["cards"], c['condition']["cards"])) {
					satisfy = false;
				}
			}
			if (c['condition']["star"] !== undefined) {
				if (!operand_result(c['condition']["star_operand"], d["star"], c['condition']["star"])) {
					satisfy = false;
				}
			}
			if (c['condition']["protect"] !== undefined) {
				if (!operand_result(c['condition']["protect_operand"], d["protect"], c['condition']["protect"])) {
					satisfy = false;
				}
			}
		} else {
			if (c['condition']["damage"] !== undefined) {
				if (!operand_result(c['condition']["damage_operand"], d["damage"], c['condition']["damage"])) {
					satisfy = false;
				}
			}
			if (c['condition']["cards"] !== undefined) {
				if (!operand_result(c['condition']["cards_operand"], d["cards"], c['condition']["cards"])) {
					satisfy = false;
				}
			}
			if (c['condition']["star"] !== undefined) {
				if (!operand_result(c['condition']["star_operand"], d["star"], c['condition']["star"])) {
					satisfy = false;
				}
			}
			if (c['condition']["protect"] !== undefined) {
				if (!operand_result(c['condition']["protect_operand"], d["protect"], c['condition']["protect"])) {
					satisfy = false;
				}
			}
		}
		return satisfy;
	}

	/* 进行buff结算,更改player状态和buff_turn的同时也会检查并移除buff_list里的无效buff */
	_buff(game_info, card_effect) {
		//注意此处card_effect是game_info的buff_list中记录的一个对象,他的更改会影响到buff_list里记录的对象
		let c = card_effect;
		if (c["buff_turn"] > 0) {
			game_info = this._normal(game_info, card_effect);
			c["buff_turn"]--;
		}
		// return game_info;
		/*
		 * buff结算并不负责维护game_info里的buff_list的合法性(因为在condition中还要调用_buff来做对condition的结算)
		 * buff_list的维护过程将放到game_info的整体维护中(即调用buff/condition执行的地方)
		 * 这里只是对一张合法的buff进行执行,影响的只是card_effect和game_info里的player状态
		 */
		return game_info;
	}
	_normal(game_info, card_effect) {
		let TwoAim = false; //两个目标结算
		let RandomAim = false; //随机目标结算
		let playerAim, playerAimNum;
		let c = card_effect; //card_effect的缩写
		//pointer合法检查和目标确认
		if (c['pointer'] < 0 || c['pointer'] > 4) {
			console.log(consoleSymbol["no"] + " Error: Unexpected pointer value, not in [0,4].");
			return game_info;
		}
		if (c['pointer'] == 0) {
			return game_info;
		}
		if (c['pointer'] == 3) {
			TwoAim = true;
		}
		if (c['pointer'] == 4) {
			RandomAim = true;
			playerAimNum = _.random(1, 2);
			//随机目标确定后,卡牌的目标就会变更为确定目标
			c["pointer"] = playerAimNum == c["source"] ? 1 : 2;
			console.log(consoleSymbol["info"] + " 使用随机目标卡牌,目标已固定为:", c["pointer"]);
			playerAim = game_info['player' + String(playerAimNum)];
			//不该发生的 serial number 拼接错误
			if (playerAim == undefined) {
				console.log(consoleSymbol["no"] + " Error: player serial code is illegal. Serial Code: " + 'player' + String(playerAimNum));
			}
		}
		if (RandomAim == false && TwoAim == false) {
			if (c['source'] == 1) {
				if (c['pointer'] == 1) {
					//对己方生效
					playerAimNum = 1;
					playerAim = game_info["player1"];
				} else if (c['pointer'] == 2) {
					//对对方生效
					playerAimNum = 2;
					playerAim = game_info["player2"];
				}
			} else if (c['source'] == 2) {
				if (c['pointer'] == 1) {
					//对己方生效
					playerAimNum = 2;
					playerAim = game_info["player2"];
				} else if (c['pointer'] == 2) {
					//对对方生效
					playerAimNum = 1;
					playerAim = game_info["player1"];
				}
			} else {
				console.log(consoleSymbol["no"] + " Error: card source is invalid", c['source']);
			}
		}
		/*
		 * 已经确认了目标
		 * TwoAim表示对双方都生效
		 * RandomAim表示随机选择目标,已选择完毕存入playerAim
		 * playerAim 存放的目标生效对象
		 * playerAimNum 表示目标的序号(1|2)
		 * _damage等函数传入的object的引用,所以无需接收返回值,object内的值已经改变
		 * 但函数内的return是必须的,为了逻辑中断.
		 */
		//card_effect有效值检验
		c["damage"] = c["damage"] || 0;
		c["cards"] = c["cards"] || 0;
		c["star"] = c["star"] || 0;
		c["protect"] = c["protect"] || 0;
		c["extra_turn"] = c["extra_turn"] || 0;
		if (TwoAim) {
			this._damage(game_info, game_info["player1"], c['damage']);
			this._card(game_info, game_info["player1"], c['cards']);
			this._star(game_info["player1"], c['star']);
			this._protect(game_info["player1"], c['protect']);
			this._turn(game_info, game_info["player1"], c["extra_turn"]);

			this._damage(game_info, game_info["player2"], c['damage']);
			this._card(game_info, game_info["player2"], c['cards']);
			this._star(game_info["player2"], c['star']);
			this._protect(game_info["player2"], c['protect']);
			this._turn(game_info, game_info["player2"], c["extra_turn"]);
		} else {
			if (playerAim == undefined) {
				console.log(consoleSymbol["no"] + " Error: 根据卡牌得出的结算目标player为undefined!");
				return game_info;
			}
			this._damage(game_info, playerAim, c['damage']);
			this._card(game_info, playerAim, c['cards']);
			this._star(playerAim, c['star']);
			this._protect(playerAim, c['protect']);
			this._turn(game_info, playerAim, c["extra_turn"]);
		}
		return game_info;
	}




  //基本动画执行函数 -- damage
	_damage(game_info, player, damage) {

		//这里的pointer是指作用目标
		let lower = GameRules["MinCuteValue"];
		let upper = GameRules["CuteValueDefault"];
		damage = parseInt(damage, 10);
		//特殊值处理
		if (damage == 999) {
			//player直接获得胜利,这里对game_info的处理不需要返回即可生效
			// TODO
			game_info["game_status"]['FINISHED'] = player;
			return player;
		}
		if (damage == -999) {
			//player直接回复满血
			// TODO
			player["cute_value"] = GameRules['CuteValueDefault'];
			return player;
		}
		if (damage > 0) {
			if (player["protect_special"].length > 0) {
				for (let o in player["protect_special"]) {
					if (player["protect_special"][o]['value'] == 999 && player["protect_special"][o]['times'] > 0) {
						player["protect_special"][o]['times']--;
						damage = 0;
           				 //显示伤害免疫动画
						let protect_once = false;
						
						if (player["protect_special"][o]['times'] == 0) {
							player["protect_special"].splice(o, 1);
							// 显示取消免疫动画
							protect_once = true;
						}

						if(protect_once){
							let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.immunityOnce, player, undefined);
							DoubleBattlePage.instance().dispatchEvent(event);
						}else{
							let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.immunityDamage, player, undefined);
							DoubleBattlePage.instance().dispatchEvent(event);
						}
						return player;
					}
					if (player["protect_special"][o]['value'] == 1000) {
						//这是个buff效果，所以生效时间不是这里控制,不生效的话这里不会为1000
						damage = 0;
           				//显示伤害免疫动画
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.immunityDamage, player, undefined);
						DoubleBattlePage.instance().dispatchEvent(event);
						return player;
					}
				}
			}
			// protect可以抵消damage
			if (player["protect_value"] > 0) {
				if (player["protect_value"] > damage) {
					// protect足以抵消所有伤害并且有结余
					player["protect_value"] -= damage;
					damage = 0;
          			//显示护甲扣除动画
					let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.decreaseProtect, player, undefined);
					DoubleBattlePage.instance().dispatchEvent(event);

					return player;
				} else {
					// protect不足以抵消所有伤害，只能抵消部分伤害或者刚好抵消
					damage -= player["protect_value"];
					player["protect_value"] = 0;
          			// 护甲扣除动画，碎甲动画
					let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.destoryProtect, player, undefined);
					DoubleBattlePage.instance().dispatchEvent(event);
				}
			}
		}
		if (damage > 0) {
			//受到伤害,血量减少
			player["cute_value"] -= damage;
      		// 显示血量扣除动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.HPEvent, DoubleBattleEvent.decreaseHP, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
		}
		if (damage < 0) {
			//受到治愈,血量增加
			
			player["cute_value"] -= damage;
      		// 显示血量增加动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.HPEvent, DoubleBattleEvent.increaseHP, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
		}
		//bound limit
		if (player["cute_value"] < lower) {
			player["cute_value"] = lower;
      		// 显示血量重置动画
		}
		if (player["cute_value"] > upper) {
			player["cute_value"] = upper;
      		// 显示血量重置动画
		}
		if (isNaN(player["cute_value"])) {
			console.log(consoleSymbol["no"] + " Error: Cute_value is NaN! What happened?");
			player["cute_value"] = upper;
		}
		return player;
	}
  //基本动画执行函数 -- card
	_card(game_info, player, cards) {
		let cards_lower = 0;
		let cards_upper = GameRules["MaxCardsValue"];
		let cardpool_lower = 0;
		let cardpool_upper = GameRules["CardsPoolValueDefault"];

		cards = parseInt(cards, 10);
		if (isNaN(cards)) {
			console.log(consoleSymbol["no"] + " Error:进行卡牌操作时传入值为NaN.");
			return;
		}
		//特殊值处理
		if (cards == 999) {
			cards = player["cards_pool"].length;
     		// 显示抽出所有牌并爆牌，爆掉牌库 动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.CardEvent, DoubleBattleEvent.cards999, player, player["cards_pool"]);
			DoubleBattlePage.instance().dispatchEvent(event);
		}
		if (cards == -999) {
			cards = -1 * player["cards_value"];
      		// 显示弃掉所有手牌动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.CardEvent, DoubleBattleEvent.cards_999, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
		}

		//清空抽牌顺序list和弃牌顺序list
		player["draw_list"] = [];
		player["discard_list"] = [];
		if (cards > 0) {
			//抽牌
			for (var i = 0; i < cards; i++) {
				if (player["cards_pool"].length > cardpool_lower) {
					//从牌库抽一张牌
					let new_card = player["cards_pool"].pop();
					player["cards_pool_value"]--;
					player["draw_list"].push(new_card);
					//置入手牌,如果没达到上限的话
					if (player["cards_value"] < cards_upper) {
						player["cards_list"].push(new_card);
						player["cards_value"]++;
            			// 显示抽牌并置入手牌动画
						
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.CardEvent, DoubleBattleEvent.drawCardSuccess, player, new_card['effect']);
						DoubleBattlePage.instance().dispatchEvent(event);
					}else{
            			// 显示抽牌并爆牌动画
						// console.log('[##]new_card: ', new_card)
						let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.CardEvent, DoubleBattleEvent.drawCardFail, player, new_card['effect']);
						DoubleBattlePage.instance().dispatchEvent(event);
          }
				} else {
					//无牌可抽,扣疲劳
					//如果疲劳是-999的话表示不计算疲劳
          			// 显示疲劳动画
					let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.CardEvent, DoubleBattleEvent.drawNoCardTired, player, undefined);
					DoubleBattlePage.instance().dispatchEvent(event);
					if (player["tired"] != -999) {
						console.log(consoleSymbol["yes"] + " 玩家" + player["id"] + "抽牌被扣除" + player["tired"] + "点疲劳.");
						this._damage(game_info, player, player["tired"]);
						player['tired'] += 1;
					}
				}
			}
		} else {
			//弃手牌
			cards = cards * -1;
      		for(let dis_card in player["discard_list"]){
       		//显示弃一张牌动画
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.CardEvent, DoubleBattleEvent.disCard, player, dis_card['effect']);
				DoubleBattlePage.instance().dispatchEvent(event);
				console.log(consoleSymbol["info"]+" 玩家弃牌",player["discard_list"][dis_card]);
      		}
		}
		return player;
	}

  // 基本动画执行函数 -- 费用
	_star(player, star) {
		// console.log('基本动画执行函数 star')
		let lower = 0;
		let upper = GameRules["MaxStarValue"];

		star = parseInt(star, 10);
		if (isNaN(star)) {
			console.log(consoleSymbol["no"] + " Error:进行star操作时传入值为NaN.");
			return;
		}
		//特殊值处理
		if (star == 999) {
			star = upper;
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.increaseToFullMana, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
      // 显示费用增满动画 -- a/b 中 b 变化
		}
		if (star == -999) {
			star = -1 * upper;
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.decreaseToZeroMana, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
      // 显示费用归零动画 -- a/b 中 b 变化 
		}
		if (star > 0) {
			//增加总体令
			player["star_value"] += star;
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.increaseMana, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
      // 费用增加动画
		} else {
			//减少总体令
			player["star_value"] += star;
			if(star != 0){
				let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ManaEvent, DoubleBattleEvent.decreaseMana, player, undefined);
				DoubleBattlePage.instance().dispatchEvent(event);
			}
      // 费用减少动画
		}
		if (player["star_value"] < lower) {
			player["star_value"] = lower;
      // 费用重置动画
		}
		if (player["star_value"] > upper) {
			player["star_value"] = upper;
      // 费用重置动画
		}
		return player;
	}

  // 基本动画执行函数 -- 护甲
	_protect(player, protect) {
		// console.log('基本动画执行函数 protect')
		let lower = 0;
		let upper = GameRules["MaxProtectValue"];

		protect = parseInt(protect, 10);
		if (isNaN(protect)) {
			console.log(consoleSymbol["no"] + " Error:进行冷漠值操作时传入值为NaN.");
			return;
		}
		//特殊值处理
		if (protect == 999) {
			//抵消任何伤害一次,不可叠加
			player["protect_special"].push({
				'value': 999,
				'times': 1
			});
      		// 显示免疫一次伤害动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.immunityOnce, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
			return player;
		}
		if (protect == 1000) {
			//永久免疫
			player["protect_special"].push({
				'value': 1000,
				'times': 0
			});
      		// 显示免疫动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.immunityDamage, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
			return player;
		}
		if (protect == -999) {
			//清除所有护甲
			protect = -1 * player["protect_value"];
      		// 显示卸甲动画
			// 	？？？？？
			
			// 没有return 不显示
		}
		if (protect == -1000) {
			//无法获得护甲1次,不可叠加
			player["protect_special"].push({
				'value': -1000,
				'times': 1
			});
      		// 显示下一次会碎甲提示动画
			return player;
		}
		if (protect > 0) {
			if (player["protect_special"].length > 0) {
				for (let i in player["protect_special"]) {
					if (player["protect_special"][i]['value'] == -1000 && player["protect_special"][i]['times'] >= 1) {
						//无法获得护甲
						protect = 0;
            			// 显示叠加失败动画
						player["protect_special"][i]['times']--;
						if (player["protect_special"][i]['times'] == 0) {
							player["protect_special"].splice(i, 1);
              			//显示取消碎甲状态动画
						}
					}
				}
			}
			//增加护甲
			player["protect_value"] += protect;
     		// 显示叠甲动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.increaseProtect, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
		} else {
			//护甲减少
			player["protect_value"] += protect;
      		// 显示护甲减少动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ProtectEvent, DoubleBattleEvent.decreaseProtect, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
		}
		if (player["protect_value"] < lower) {
			player["protect_value"] = lower;
      		//显示护甲重置动画
		}
		if (player["protect_value"] > upper) {
			player["protect_value"] = upper;
      		//显示护甲重置动画
		}
		return player;
	}


	_turn(game_info, player, turn) {
		// console.log('基本动画执行函数 turn')
		let lower = 0;
		let upper = GameRules["MaxExtraTurns"];
		turn = parseInt(turn);
		if (isNaN(turn)) {
			console.log(consoleSymbol["no"] + " Error:进行额外回合操作时传入值为NaN.");
			return;
		}
		let playerString;
		if (player["id"] == game_info["player1"]["id"]) {
			playerString = "player1";
		}
		if (player["id"] == game_info["player2"]["id"]) {
			playerString = "player2";
		}
		if (isNaN(turn)) {
			return game_info;
		}
		if (turn > 0) {
			game_info["extra_turn"][playerString] += turn;
      		// 显示获得一个额外回合动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ExtraTurnEvent, DoubleBattleEvent.increaseExtraTurn, player, undefined);
			DoubleBattlePage.instance().dispatchEvent(event);
		}
		if (game_info["extra_turn"] > upper) {
			game_info["extra_turn"][playerString] = upper;
		}
		if (game_info["extra_turn"] < lower) {
			game_info["extra_turn"][playerString] = lower;
		}
	}

	_addCondition(player, card_effect) {
		console.log('基本动画执行函数 _addCondition')
		if (player["condition_list"].length == GameRules.MaxConditionNum) {
      		//显示添加一个condition失败动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.addConditionSuccess, player, card_effect);
			DoubleBattlePage.instance().dispatchEvent(event);
			return false;
		} else {
			player["condition_list"].push(card_effect);
      		// 显示添加condition成功动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.ConditionEvent, DoubleBattleEvent.addConditionFail, player, card_effect);
			DoubleBattlePage.instance().dispatchEvent(event);
			return true;
		}
	}

	_addSecret(player, card_effect) {
		console.log('基本动画执行函数 _addSecret')
		if (player["secret_condition_list"].length == GameRules.MaxSecretNum) {
      		//显示添加一个Secret失败动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.addSecretFail, player, card_effect);
			DoubleBattlePage.instance().dispatchEvent(event);
			return false;
		} else {
			player["secret_condition_list"].push(card_effect);
      		//显示添加一个Secret成功动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.SecretEvent, DoubleBattleEvent.addSecretSuccess, player, card_effect);
			DoubleBattlePage.instance().dispatchEvent(event);
			return true;
		}
	}

	_addBuff(player, card_effect) {
		if (player["buff_list"].length == GameRules.MaxBuffNum) {
      		//显示添加一个buff失败动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.addBuffFail, player, card_effect);
			DoubleBattlePage.instance().dispatchEvent(event);
			return false;
		} else {
			if (card_effect == undefined) {
				console.log(consoleSymbol["no"] + " Error: Wrong Buff card effect is added.");
			}
			player["buff_list"].push(card_effect);
      		//显示添加一个buff成功动画
			let event = new DoubleBattleEvent(DoubleBattleEvent.DOUBLEBATTLEEVENT, DoubleBattleEvent.BuffEvent, DoubleBattleEvent.addBuffSuccess, player, card_effect);
			DoubleBattlePage.instance().dispatchEvent(event);
			return true;
		}
	}

	/*
	 * 如果游戏结束,会更改game_info里的game_status['FINISHED'] = player();
	 * 返回:胜利者player()或false(游戏未结束)或'tie'(平局)
	 */
	IsFinished(game_info) {
		let finished = false;
		let tie = false;
		let winner, winner_serial_number;
		if (game_info["game_status"] !== undefined && game_info["game_status"]['FINISHED'] !== undefined) {
			//有胜者
			winner = game_info["game_status"]['FINISHED'];
			if (winner['id'] == game_info["player1"]['id']) {
				//胜利者为player1
				winner_serial_number = 1;
			} else {
				//胜利者为player2
				winner_serial_number = 2;
			}
			finished = true;
		}
		else if (game_info["player1"]["cute_value"] <= GameRules["MinCuteValue"] && game_info["player2"]["cute_value"] > GameRules["MinCuteValue"]) {
			winner = game_info["player2"];
			winner_serial_number = 2;
			game_info["game_status"]['FINISHED'] = winner;
			finished = true;
		}
		else if (game_info["player2"]["cute_value"] <= GameRules["MinCuteValue"] && game_info["player1"]["cute_value"] > GameRules["MinCuteValue"]) {
			winner = game_info["player1"];
			winner_serial_number = 1;
			game_info["game_status"]['FINISHED'] = winner;
			finished = true;
		}
		//无胜利者
		//检查平局
		else if (game_info["player1"]["cute_value"] <= GameRules["MinCuteValue"] && game_info["player2"]["cute_value"] <= GameRules["MinCuteValue"] || game_info['turns'] > GameRules['MaxBattleTurns']) {
			finished = true;
			tie = true;
		}
		if(!finished){
			return false;
		}else{
			if(tie){
					DoubleBattlePage.instance().TieGame();
				}else{
					if(winner['id'] == UserInfo.userid){
						DoubleBattlePage.instance().EndGame(1);
					}else{
						DoubleBattlePage.instance().EndGame(2)
					}
				}
		}
	}
  
	GameFinishedReward(game_info, game_status) {
		let battle_fail_exp = 15;
		let battle_succ_exp = 50;
		let battle_fail_coins = 5;
		let battle_succ_coins = 150;
		if (game_info["mode"] == undefined || game_info["mode"] == "PVP") {
			//匹配对战
			if (game_status == "tie") {
				//双方都输
				console.log(consoleSymbol["info"], "平局:", game_info["player1"]["id"], game_info["player2"]["id"]);

			} else {
				//有一个人赢了
				let winner = game_status;
				let loser = game_info["player1"]["id"] == winner["id"] ? game_info["player2"] : game_info["player1"];

			}
		} else if (game_info["mode"] == "PVE") {
			if (game_status == "tie" || game_status["id"] == 0) {
				//AI赢了,不做奖励结算,直接返回.
				return;
			}
			console.log(consoleSymbol["info"], "单人剧情:", game_info["player1"]["id"]);

		}
	}
}; /* return value1 <operand> value2 */

