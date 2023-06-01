import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { compareWordSync, hashWord } from "../lib/hash";
import { Session } from "./session.entity";

@Entity()
export class User {
	constructor() {
		this.id = uuid()
	}
	
	@PrimaryColumn()
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@OneToMany(() => Session, session => session.user)
	sessions: Session[];

	public async setPassword(password: string): Promise<void> {
		this.password = await hashWord(password)
	}

	public comparePassword(password: string): boolean {
		return compareWordSync(password, this.password)
	}
}