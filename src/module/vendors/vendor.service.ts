import { Injectable } from '@nestjs/common';
import { CreateVendorBodyDto } from './dto/create-vendor-dto';
import { ShippingAndBillingAddressDto } from './dto/address-dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DATABASE_INSTANCE } from 'src/config/database/database.constants';
import { UtilService } from '../util.service';
@Injectable()
export class VendorSerivce {
  constructor(
    @InjectEntityManager(DATABASE_INSTANCE.MASTER)
    private readonly entityManagerMaster: EntityManager,
    private readonly utilService: UtilService,
  ) {}
  async createVendor(createVendorBodyDto: CreateVendorBodyDto) {
    const shippingAddress = createVendorBodyDto?.shippingAddress;
    const billingAddress = createVendorBodyDto?.billingAddress;
    const partyContacts = createVendorBodyDto?.partyContacts;
    const contact_name = partyContacts.contactType;
    delete partyContacts.contactType;
    delete createVendorBodyDto?.partyContacts;
    delete createVendorBodyDto?.shippingAddress;
    delete createVendorBodyDto?.billingAddress;
    let vendorData = {};
    vendorData = {
      ...createVendorBodyDto,
      ...partyContacts,
      contact_name,
    };
    console.log('we are hereeeeeeeee', vendorData);
    // const shippingAddressId = await this.storeVendorAddress(shippingAddress);
    // let billingAddressId = shippingAddressId;
    // if (!this.utilService.isEqual(shippingAddress, billingAddress)) {
    //   billingAddressId = await this.storeVendorAddress(billingAddress);
    // }
    const code = createVendorBodyDto.code;
    const name = createVendorBodyDto.name;
    const pan = createVendorBodyDto.pan;
    const tin = createVendorBodyDto.tin;
    const cstNumber = createVendorBodyDto.cstNumber;
    const stNumber = createVendorBodyDto.stNumber;
    const gstNumber = createVendorBodyDto.gstNumber;
    const purchaseExpiryPeriod = createVendorBodyDto.purchaseExpiryPeriod;
    const acceptsCForm = createVendorBodyDto.acceptsCForm;
    const taxExempted = createVendorBodyDto.taxExempted;
    console.log(acceptsCForm, taxExempted);
    const enabled = createVendorBodyDto.enabled;
    const registeredDealer = createVendorBodyDto.registeredDealer;
    const shippingAddressId = 3;
    const billingAddressId = 3;
    const output = await this.entityManagerMaster.query(
      `INSERT INTO vendor (code,name,pan,tin,cstNumber,stNumber,gstNumber,purchaseExpiryPeriod,acceptsCForm,taxExempted,enabled,registeredDealer,contact_name,shippingAddressId,billingAddressId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        code,
        name,
        pan,
        tin,
        cstNumber,
        stNumber,
        gstNumber,
        purchaseExpiryPeriod,
        acceptsCForm,
        taxExempted,
        enabled,
        registeredDealer,
        contact_name,
        shippingAddressId,
        billingAddressId,
      ],
    );
    console.log('hereeeeeee', output);
    return;
  }
  async storeVendorAddress(
    shippingAndBillingAddressDto: ShippingAndBillingAddressDto,
  ) {
    const addressLine1 = shippingAndBillingAddressDto.addressLine1;
    const addressLine2 = shippingAndBillingAddressDto.addressLine2 || null;
    const countryCode = shippingAndBillingAddressDto.countryCode;
    const pincode = shippingAndBillingAddressDto.pincode;
    const stateCode = shippingAndBillingAddressDto.stateCode;
    const city = shippingAndBillingAddressDto.city;
    const phone = shippingAndBillingAddressDto.phone;
    const address = await this.entityManagerMaster.query(
      'INSERT INTO addresses (addressLine1, addressLine2, countryCode, pincode, stateCode, city, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        addressLine1,
        addressLine2,
        countryCode,
        pincode,
        stateCode,
        city,
        phone,
      ],
    );
    return address.insertId;
  }
}
