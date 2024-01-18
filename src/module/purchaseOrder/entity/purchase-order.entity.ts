import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class purchase_order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  poCode: string;

  @Column()
  vendorCode: string;

  @Column({ type: 'timestamp' })
  expiryDate: Date;

  @Column({ type: 'timestamp' })
  deliveryDate: Date;

  @Column({ default: 0 })
  logisticCharges: number;

  @Column({ type: 'decimal', scale: 2, default: 0, nullable: true })
  taxOnSales: number;

  @Column({ type: 'decimal', scale: 2, default: 0, nullable: true })
  totalAmount: number;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  statusCode: string;

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
