export const POWER_SCALE = 2.5;
export const ACC_SCALE = 5;

export class Resource {
	count: number;
	next: string;
	previous: string;
	results: Item[];

	constructor(obj?: Resource) {
		this.results = obj.results.map(item => new Item(item));
	}
}

export class Item {
	name: string;
	url: string;

	constructor(item: {name: string, url: string}) {
		this.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);;
		this.url = item.url;
	}
}

export class Pokemon {
	name: string;
	stats: Stat;
	moves: MoveItem[];
	sprites: { front_default: string };
	types: any[];

	constructor(obj?: any) {
		this.name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);

		if (obj.moves) {
			this.moves = obj.moves.map(move => new MoveItem(move)).sort((m1, m2) => m1.lvl - m2.lvl);
		}

		if (obj.stats) {
			this.stats = obj.stats.map(stat => new Stat(stat));
		}

		if (obj.sprites) {
			this.sprites = obj.sprites;
		}

		if (obj.types) {
			this.types = obj.types.map(typeItem => typeItem.type);
		}
	}

	toString() {
		return `${this.name} - ${this.types}`;
	}
}

const versions = ['crystal', 'gold-silver', 'red-blue'];
export class Move {
	name: string;
	lvl: number;
	type: string;
	power: number;
	acc: number;
	desc: string;

	constructor(moveItem: MoveItem, obj?: any) {
		this.name = obj.name;
		this.lvl = moveItem.lvl;
		this.type = obj.type.name;
		this.power = Math.round(obj.power/POWER_SCALE);
		this.acc = obj.accuracy/ACC_SCALE;
		obj.flavor_text_entries.map(txt => {
			if (txt.language.name === 'en') {
				this.desc = txt.flavor_text;
			}
		});
	}
}

export class MoveItem {
	move: any;
	version_group_details: any;

	constructor(obj?: any) {
		this.move = obj.move;
		this.version_group_details = obj.version_group_details;
	}

	get lvl(): number {
		let lvl = this.version_group_details.reduce( (lvl, detail) => {
			let version_group = detail.version_group;
			
			if (versions.indexOf(version_group.name) > -1 && lvl < 0) {
				return detail.level_learned_at;
			}

			return lvl
		}, -1);

		return lvl > -1 ? lvl : this.version_group_details[0].level_learned_at;
	}
}


export class Stat {
	name: string;
	base_stat: number

	constructor(obj?: any) {
		this.name = obj.stat.name;
		this.base_stat = Math.round(obj.base_stat/POWER_SCALE);
	}
}