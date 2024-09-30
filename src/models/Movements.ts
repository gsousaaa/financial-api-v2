import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("movements_pkey", ["id"], { unique: true })
@Entity("movements", { schema: "public" })
export class Movements {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "movement_type", length: 10 })
  movementType: string;

  @Column("numeric", { name: "value" })
  value: string;

  @Column("character varying", { name: "description", length: 255 })
  description: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.movements)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
