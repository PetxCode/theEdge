import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { LecturerEntity } from "./LecturerEntity";

@Entity("AdminEntities")
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    // type: "uuid",
  })
  id: string | number;

  @Column()
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  schoolName: string;

  @Column()
  token: string;

  @Column()
  verified: boolean;

  @ManyToOne(() => LecturerEntity, (lectures) => lectures.admin)
  lecturers: LecturerEntity[];
}
