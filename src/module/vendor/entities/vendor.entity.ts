import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;
}
  