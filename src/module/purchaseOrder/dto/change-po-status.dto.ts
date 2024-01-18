import { ApiProperty } from '@nestjs/swagger';
export class ChangePoStatusBodyDto {
  @ApiProperty()
  purchaseOrderCode: string;
  @ApiProperty()
  po_status: string;
}
