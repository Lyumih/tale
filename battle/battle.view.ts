namespace $.$$ {
	export class $tale_battle extends $.$tale_battle {

		@$mol_mem
		hero( next?: any ) {
			console.log( 'hero', next )
			// if( next === undefined ) {
			// 	return {
			// 		icon: '🧙🏼‍♂️',
			// 		name: 'Абрахам',
			// 		hp: 10,
			// 		dmg: 2,
			// 		speed: 3,
			// 	}
			// }
			return next ?? {
				icon: '🧙🏼‍♂️',
				name: 'Абрахам',
				hp: 10,
				dmg: 2,
				speed: 3,
			}
		}

		@$mol_mem
		enemy( next?: any ) {
			return next ?? {
				icon: '🦀',
				name: 'Краб',
				hp: 4,
				dmg: 1,
				speed: 5,
			}
		}

		@$mol_action
		hero_attack() {
			console.log( 'hero_attack' )
			this.hero( { ...this.hero(), hp: this.hero().hp -= this.enemy().dmg } )

			console.log( 'hero_attack', this.hero() )
		}

		hero_info(): string {
			console.log( 'hero info', this.hero() )
			// return this.common_info( this.hero() )
			// return JSON.stringify( this.hero() )
			return this.hero().hp + this.common_info( this.hero() )
		}

		enemy_info(): string {
			return this.common_info( this.enemy() )
		}

		common_info( unit?: any ): string {
			console.log( 'common info' )
			return `${ unit.icon }${ unit.name }⚔️ ${ unit.hp }❤️ ${ unit.dmg }👟 ${ unit.speed }`
		}
	}
}
