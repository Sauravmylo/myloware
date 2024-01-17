import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Addresses } from './address.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column({ length: 100, unique: true })
  name: string;
  @Column({ nullable: true, default: null })
  pan: string;
  @Column({ nullable: true, default: null })
  tin: string;
  @Column({ nullable: true, default: null })
  cstNumber: string;
  @Column({ nullable: true, default: null })
  stNumber: string;
  @Column({ nullable: true, default: null })
  gstNumber: string;
  @Column({ nullable: true, default: null })
  purchaseExpiryPeriod: number;
  @Column({ type: 'enum', nullable: true, default: '1', enum: ['1', '2'] })
  acceptsCForm: string;
  @Column({ type: 'enum', nullable: true, default: '1', enum: ['1', '2'] })
  taxExempted: string;
  @Column({ type: 'enum', nullable: true, default: '1', enum: ['1', '2'] })
  enabled: string;
  @Column({ type: 'enum', nullable: true, default: '1', enum: ['1', '2'] })
  registeredDealer: string;

  @ManyToOne(() => Addresses)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'billingAddressId',
  })
  billingAddress: Addresses;

  @ManyToOne(() => Addresses)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'shippingAddressId',
  })
  shippingAddress: Addresses;
  @Column()
  contact_name: string;
  @Column()
  email: string;
  @Column()
  mobile: string;
  @Column({ type: 'enum', nullable: true, default: '1', enum: ['0', '1'] })
  status: string;
  @Column()
  updated_by: number;
  @Column()
  created_by: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updated_at: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
