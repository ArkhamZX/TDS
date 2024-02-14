import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';
import { Rol } from '../entities/Rol';

@Entity()
@ObjectType({ implements: IEntity })
export class User extends IEntity {
  @Field()
  @Column()
  public username!: string;

  @Field()
  @Column()
  public firstName!: string;

  @Field()
  @Column()
  public lastName!: string;

  @Column()
  public password!: string;

  @Field()
  @Column({ unique: true })
  public email!: string;

  @Field()
  @Column({ unique: true })
  public roleId!: string;

  @ManyToOne(() => Rol, (rol) => rol.users, { eager: true }) // Indica que es una relación ManyToOne
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  @Field(() => Rol)
  public rol!: Rol;
}
