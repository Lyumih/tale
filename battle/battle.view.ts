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
					dmg: 4,
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
					// health: 0,
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
			this.hero( { ...this.hero(), hp: this.hero().hp - this.enemy().dmg } )
			this.exp_up( 'attack' )
			// this.exp_up( 'health' )
			console.log( 'hero_attack', this.hero() )
			this.logic()
		}

		calc_dmg( unit: any ): number {
			console.log( 'calc_dmg', unit )
			return unit.dmg + ( unit.exp?.attack || 0 )
		}

		exp_up( stat: string ) {
			console.log( 'exp_up', this.hero(), stat )
			const chance = Math.ceil( Math.random() * 100 ) // 0 - 100
			const min_chance = this.hero().exp[ stat ] <= 99 ? 100 - this.hero().exp[ stat ] : 1 // 1+
			if( chance <= min_chance ) {
				this.hero( { ...this.hero(), exp: { ...this.hero().exp, [ stat ]: this.hero().exp[ stat ] + 1 } } )
				this.add_log( `🌟${ this.hero().name } повысил ${ stat } с шансом ${ chance }(${ min_chance })` )
			}
			// this.add_log( `test ${ this.hero().name } повысил ${ stat } с шансом ${ chance }(${ min_chance }) ${JSON.stringify( this.hero() )}` )
		}

		@$mol_action
		enemy_attack() {
			this.enemy( { ...this.enemy(), hp: this.enemy().hp - this.calc_dmg( this.hero() ) } )
		}

		logic() {
			if( this.enemy().hp <= 0 ) {
				this.next_enemy()
				this.add_log( `*🔎Враг умер*` )
			}
			if( this.hero().hp <= 0 ) {
				this.restart()
				this.next_enemy()
				this.logs( [] )
				this.add_log( '**💀Герой умер. Перерождение**' )
			}
		}

		restart() {
			this.hero( null )
		}

		hero_info(): string {
			return this.common_info( this.hero() )
		}

		next_enemy() {
			// this.add_log('🔎Найден новый враг')
			return this.enemy( $mol_array_lottery( this.enemies() ) )
		}

		enemy_info(): string {
			return this.common_info( this.enemy() )
		}

		common_info( unit?: any ): string {
			return `${ unit.icon }${ unit.name }\n 🌟${ JSON.stringify( unit.exp ) ?? '-' }\n❤️${ unit.hp } ⚔️${ unit.dmg }(${ this.calc_dmg( unit ) }) 👟${ unit.speed }`
		}

		leave_and_heal( next?: any ) {
			this.hero( { ...this.hero(), hp: 10 } )
			this.next_enemy()
			this.add_log( '💖 Вы отдохнули у костра' )
		}

		@$mol_mem
		logs( next?: string[] ): string[] {
			return next ?? []
		}

		@$mol_action
		add_log( next?: string ) {
			next && this.logs( [ next, ...this.logs() ] )
		}

		logs_info(): string {
			return 'История:\n- ' + this.logs().join( '\n- ' )
		}
	}
}
