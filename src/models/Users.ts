import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movements } from "./Movements";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("character varying", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 100,
  })
  password: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("numeric", { name: "balance", nullable: true, default: () => "0" })
  balance: string | null;

  @OneToMany(() => Movements, (movements) => movements.user)
  movements: Movements[];
}
