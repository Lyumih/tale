namespace $.$$ {
	export class $tale_battle extends $.$tale_battle {

		enemies() {
			return [
				{
					icon: '🦀',
					name: 'Краб',
					hp: 10,
					dmg: 1,
					speed: 5,
				},
				{
					icon: '🦇',
					name: 'Летучая мышь', 
					hp: 3,
					dmg: 2,
					speed: 3,
				},
				{
					icon: '🐝',
					name: 'Пчела',
					hp: 1,
					dmg: 3,
					speed: 10,
				},
				{
					icon: '🐲',
					name: 'Дракон',
					hp: 100,
					dmg: 9,
					speed: 2,
				},
			]
		}

		@$mol_mem
		hero( next?: any ) {
			console.log( 'hero', next )
			return next ?? {
				icon: '🧙🏼‍♂️',
				name: 'Абрахам',
				hp: 10,
				dmg: 2,
				speed: 3,
				exp: {
					attack: 0,
				},
			}
		}

		@$mol_mem
		enemy( next?: any ) {
			return next ?? this.enemies()[ 0 ]
		}

		@$mol_action
		hero_attack() {
			this.enemy_attack()
			this.hero( { ...this.hero(), hp: this.hero().hp - this.enemy().dmg, exp: { ...this.hero().exp, attack: this.hero().exp.attack + 1 } } )
			console.log( 'hero_attack', this.hero() )
			this.logic()
		}

		calc_dmg( unit: any ): number {
			console.log( 'calc_dmg', unit )
			return unit.dmg + (unit.exp?.attack || 0)
		}

		@$mol_action
		enemy_attack() {
			this.enemy( { ...this.enemy(), hp: this.enemy().hp - this.calc_dmg(this.hero())} )
		}

		logic() {
			if (this.enemy().hp <= 0) {
				this.next_enemy()
			}
			if (this.hero().hp <= 0) {
				this.restart()
			}
		}

		restart() {
			this.hero( null )
		}

		hero_info(): string {
			return this.common_info( this.hero() )
		}

		next_enemy() {
			return this.enemy($mol_array_lottery(this.enemies()))
		}

		enemy_info(): string {
			return this.common_info( this.enemy() )
		}

		common_info( unit?: any ): string {
			return `${ unit.icon }${ unit.name }\n 🌟${JSON.stringify(unit.exp) ?? '-'}\n❤️${ unit.hp } ⚔️${ unit.dmg }(${this.calc_dmg(unit)}) 👟${ unit.speed }`
		}

		leave_and_heal( next?: any ) {
			this.hero( { ...this.hero(), hp: 10 } )
			this.next_enemy()
		}
	}
}
