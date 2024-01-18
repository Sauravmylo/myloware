import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class purchase_order_items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  poCode: string;

  @Column()
  itemSKU: string;

  @Column()
  quantity: number;

  @Column({ default: 0 })
  pendingQuantity: number;

  @Column({ type: 'decimal', scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', scale: 2 })
  maxRetailPrice: number;

  @Column({ type: 'decimal', scale: 2 })
  discount: number;

  @Column({ type: 'decimal', scale: 2 })
  discountPercentage: number;

  @Column({ type: 'decimal', scale: 2 })
  tax: number;

  @Column({ nullable: true })
  taxTypeCode: string;

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
