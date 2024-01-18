import { ApiProperty } from '@nestjs/swagger';
import { CreadtedAtBetween } from './created-between.dto';

export class GetPurchaseOrderBodyDto {
  @ApiProperty()
  createdBetween: CreadtedAtBetween;
}
