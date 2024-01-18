import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrderDetailDto {
  @ApiProperty()
  purchaseOrderCode: string;
}
