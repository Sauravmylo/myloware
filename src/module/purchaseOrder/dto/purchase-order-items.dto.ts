import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PurchaseOrderItemsDto {
  @ApiProperty()
  itemSKU: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  unitPrice: number;
  @ApiProperty()
  maxRetailPrice: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  discountPercentage: number;
  @ApiPropertyOptional()
  taxTypeCode: string;
}
