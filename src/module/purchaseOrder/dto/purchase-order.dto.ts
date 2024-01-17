import { IsArray } from 'class-validator';
import { PurchaseOrderItemsDto } from './purchase-order-items.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrderBodyDto {
  @ApiProperty()
  vendorCode: string;
  @ApiProperty()
  expiryDate: Date;
  @ApiProperty()
  deliveryDate: Date;
  @ApiProperty()
  logisticCharges: number;
  @IsArray()
  @ApiProperty({ type: [PurchaseOrderItemsDto] })
  purchaseOrderItems: PurchaseOrderItemsDto[];
}
