import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShippingAndBillingAddressDto } from './address-dto';
import { partyContacts } from './party-contacts-dto';
export class CreateVendorBodyDto {
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  pan: string;

  @ApiPropertyOptional()
  tin: string;

  @ApiPropertyOptional()
  cstNumber: string;

  @ApiPropertyOptional()
  stNumber: string;

  @ApiPropertyOptional()
  gstNumber: string;

  @ApiPropertyOptional()
  purchaseExpiryPeriod: number;

  @ApiPropertyOptional({ type: 'enum', enum: ['1', '2'], default: '1' })
  acceptsCForm: string;

  @ApiPropertyOptional({ type: 'enum', enum: ['1', '2'], default: '1' })
  taxExempted: string;

  @ApiPropertyOptional({ type: 'enum', enum: ['1', '2'], default: '1' })
  enabled: string;

  @ApiPropertyOptional({ type: 'enum', enum: ['1', '2'], default: '1' })
  registeredDealer: string;
  @ApiProperty({ type: ShippingAndBillingAddressDto })
  shippingAddress: ShippingAndBillingAddressDto;

  @ApiProperty({ type: ShippingAndBillingAddressDto })
  billingAddress: ShippingAndBillingAddressDto;
  @ApiProperty({ type: partyContacts })
  partyContacts: partyContacts;
}
