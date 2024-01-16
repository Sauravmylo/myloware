import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShippingAndBillingAddressDto {
  @ApiProperty()
  addressLine1: string;
  @ApiProperty()
  addressLine2: string;
  @ApiProperty()
  countryCode: string;
  @ApiProperty()
  pincode: string;
  @ApiProperty()
  stateCode: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  phone: string;
}
