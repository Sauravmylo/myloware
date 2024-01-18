import { ApiProperty } from '@nestjs/swagger';

export class CreadtedAtBetween {
  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
