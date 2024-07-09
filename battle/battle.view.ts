namespace $.$$ {
	export class $tale_battle extends $.$tale_battle {

		enemies() {
			return [
				{
					icon: '🦀',
					name: 'Краб',
					hp: 5,
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
			this.hero( { ...this.hero(), hp: this.hero().hp - this.enemy().dmg, exp: { ...this.hero().exp, attack: this.hero().exp.attack + 1 } } )
			this.turn_enemy()
			console.log( 'hero_attack', this.hero() )
			this.logic()
		}

		turn_enemy() {
			this.enemy_attack()
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

		@$mol_action
		enemy_attack() {
			this.enemy( { ...this.enemy(), hp: this.enemy().hp - this.hero().dmg } )
			console.log( 'hero_attack', this.enemy() )
		}

		hero_info(): string {
			console.log( 'hero info', this.hero() )
			return this.common_info( this.hero() )
		}

		next_enemy() {
			console.log('next_enemy')
			return this.enemy($mol_array_lottery(this.enemies()))
		}

		enemy_info(): string {
			return this.common_info( this.enemy() )
		}

		common_info( unit?: any ): string {
			console.log( 'common info' )
			return `${ unit.icon }${ unit.name }\n 🌟${JSON.stringify(unit.exp)}\n❤️${ unit.hp } ⚔️${ unit.dmg } 👟${ unit.speed }`
		}

		leave_and_heal( next?: any ) {
			this.hero( { ...this.hero(), hp: 10 } )
			this.next_enemy()
		}
	}
}
