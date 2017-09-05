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
			this.moves = obj.moves
				.map(move => new MoveItem(move))
				.filter(move => !!move)
				.sort((m1, m2) => m1.lvl - m2.lvl);
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
}

const versions = ['gold-silver', 'red-blue', 'crystal'];
export class Move {
	name: string;
	lvl: number;
	type: string;
	power: number;
	acc: number;
	desc: string;
	learn_method: string;

	constructor(moveItem: MoveItem, obj?: any) {
		this.name = obj.name;
		this.lvl = moveItem.lvl;
		this.type = obj.type.name;
		this.power = Math.round(obj.power/POWER_SCALE);
		this.acc = obj.accuracy/ACC_SCALE;
		this.learn_method = moveItem.learn_method;
		this.desc = obj.flavor_text_entries
			.find(txt => txt.language.name === 'en').flavor_text;
	}

}

export class MoveItem {
	move: any;
	version_group_details: any;

	constructor(obj?: any) {
		this.move = obj.move;
		this.version_group_details = obj.version_group_details;
		if (!this.version) {
			return null;
		}
	}

	get lvl(): number {
		return this.version ? this.version.level_learned_at : 0;
	}

	get learn_method(): string {
		return this.version ? this.version.move_learn_method : '';
	}

	get version(): { name, move_learn_method, level_learned_at } {
		let version: { name, move_learn_method, level_learned_at };

		version = this.version_group_details
			.map((version_group_detail) => {
				let version = {
					name: version_group_detail.version_group.name, 
					move_learn_method: version_group_detail.move_learn_method.name, 
					level_learned_at: version_group_detail.level_learned_at
				};

				return version;
			})
			.find(version => {
				return versions.indexOf(version.name) >= 0;
			})

		return version;
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