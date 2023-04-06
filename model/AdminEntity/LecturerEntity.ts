import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";

@Entity("LecturerEntities")
export class LecturerEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
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
}
