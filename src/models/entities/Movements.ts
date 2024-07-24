import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";


@Index("user_id", ["userId"], {})
@Entity("movements", { schema: "financialv2" })
export class Movements {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", { name: "movement_type", enum: ["revenue", "expense"] })
  movementType: "revenue" | "expense";

  @Column("float", { name: "value", precision: 12 })
  value: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "created_at", nullable: true, length: 24 })
  createdAt: string | null;

  @Column("int", { name: "user_id" })
  userId: number;

  @ManyToOne(() => Users, (users) => users.movements, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}


