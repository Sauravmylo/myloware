import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressLine1: string;

  @Column({ default: null, nullable: true })
  addressLine2: string;

  @Column()
  countryCode: string;

  @Column()
  pincode: number;

  @Column()
  stateCode: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', default: '1', enum: ['0', '1'], nullable: true })
  status: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updated_at: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
