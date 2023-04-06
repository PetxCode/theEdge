import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";

@Entity("RoleEntities")
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.role)
  user = UserEntity;

  @OneToMany(() => RoleEntity, (user) => user.assign)
  assign = RoleEntity;
}
