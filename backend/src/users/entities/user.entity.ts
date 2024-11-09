import { Expose } from 'class-transformer';
import { BeforeInsert, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Index({ unique: true })
  email: string;

  @Expose({ toClassOnly: true })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  organization: string;

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
