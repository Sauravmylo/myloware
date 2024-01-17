import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShippingAndBillingAddressDto {
  @ApiProperty()
  addressLine1: string;
  @ApiProperty({ default: null })
  addressLine2: string;
  @ApiProperty()
  countryCode: string;
  @ApiProperty()
  pincode: number;
  @ApiProperty()
  stateCode: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  phone: string;
}
