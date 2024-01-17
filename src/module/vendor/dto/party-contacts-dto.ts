import { ApiProperty } from '@nestjs/swagger';
export class partyContacts {
  @ApiProperty()
  contactType: string;
  name: string;
  email: string;
  phone: string;
}
