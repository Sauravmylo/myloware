import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class vendor_catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vendorCode: string;

  @Column()
  itemTypeSkuCode: string;

  @Column()
  vendorSkuCode: string;

  @Column({ default: 0 })
  inventory: number;

  @Column({ default: 0 })
  unitPrice: number;

  @Column({ default: 1 })
  priority: number;

  @Column({ type: 'enum', default: '1', enum: ['0', '1'], nullable: true })
  enabled: string;

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
