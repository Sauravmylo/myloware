import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShippingAndBillingAddressDto } from './address-dto';
import { partyContacts } from './party-contacts-dto';
export class CreateVendorBodyDto {
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  pan: string;
  @ApiProperty()
  tin: string;
  @ApiProperty()
  cstNumber: string;
  @ApiProperty()
  stNumber: string;
  @ApiProperty()
  gstNumber: string;
  @ApiProperty()
  purchaseExpiryPeriod: number;
  @ApiProperty()
  acceptsCForm: string;
  @ApiProperty()
  taxExempted: string;
  @ApiProperty()
  enabled: string;
  @ApiProperty()
  registeredDealer: string;
  @ApiProperty({ type: ShippingAndBillingAddressDto })
  shippingAddress: ShippingAndBillingAddressDto;

  @ApiProperty({ type: ShippingAndBillingAddressDto })
  billingAddress: ShippingAndBillingAddressDto;
  @ApiProperty({ type: partyContacts })
  partyContacts: partyContacts;
}
