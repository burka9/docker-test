import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { compareWordSync, hashWord } from "../lib/hash";

@Entity()
export class Session {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	token: string;

	@ManyToOne(() => User, user => user.sessions)
	user: User;

	public async setToken(token: string) {
		this.token = await hashWord(token)
	}

	public compareToken(token: string): boolean {
		return compareWordSync(token, this.token)
	}
}