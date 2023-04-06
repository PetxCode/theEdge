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
import { RoleEntity } from "./RoleEntity";

@Entity("AssignRoleEntity")
export class AssignRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  title: string;

  @OneToMany(() => RoleEntity, (role) => role.user)
  role: RoleEntity[];
}
