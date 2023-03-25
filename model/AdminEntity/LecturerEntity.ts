import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { AdminEntity } from "./AdminEntity";

@Entity("LecturerEntities")
export class LecturerEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    // type: "uuid",
  })
  id: string | number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  schoolName: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.lecturers)
  admin = AdminEntity;
}
