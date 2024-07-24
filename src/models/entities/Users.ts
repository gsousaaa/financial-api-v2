import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movements } from "./Movements";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "financialv2" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", nullable: true, length: 100 })
  password: string | null;

  @Column("varchar", { name: "created_at", nullable: true, length: 24 })
  createdAt: string | null;

  @Column("float", {
    name: "balance",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  balance: number | null;

  @OneToMany(() => Movements, (movements) => movements.user)
  movements: Movements[];
}

