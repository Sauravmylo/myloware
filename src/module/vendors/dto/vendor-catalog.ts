import { ApiProperty } from '@nestjs/swagger';
export class VendorCatalogBodyDto {
  @ApiProperty()
  vendorCode: string;

  @ApiProperty()
  itemTypeSkuCode: string;

  @ApiProperty()
  vendorSkuCode: string;

  @ApiProperty({ default: 0 })
  inventory: number;

  @ApiProperty({ default: 1 })
  unitPrice: number;

  @ApiProperty({ default: 1 })
  priority: number;

  @ApiProperty({ type: 'enum', default: '1', enum: ['0', '1'] })
  enabled: string;
}
