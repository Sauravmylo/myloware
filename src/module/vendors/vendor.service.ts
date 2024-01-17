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
    const pendingPromise = [];
    pendingPromise.push(this.storeVendorAddress(shippingAddress));
    pendingPromise.push(this.storeVendorAddress(billingAddress));
    const [shippingAddressId, billingAddressId] =
      await Promise.all(pendingPromise);
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
    const enabled = createVendorBodyDto.enabled;
    const registeredDealer = createVendorBodyDto.registeredDealer;
    await this.entityManagerMaster.query(
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
    return `vendor created successfully`;
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
  async updateVendor(code: string, createVendorBodyDto: CreateVendorBodyDto) {
    await this.updateVendorAddress(
      code,
      createVendorBodyDto.shippingAddress,
      createVendorBodyDto.billingAddress,
    );
    // update vendor fields.
    const partyContacts = createVendorBodyDto?.partyContacts;
    const contact_name = partyContacts.contactType;
    delete createVendorBodyDto?.partyContacts;
    delete createVendorBodyDto?.shippingAddress;
    delete createVendorBodyDto?.billingAddress;
    delete partyContacts.contactType;
    let vendorData = {};
    vendorData = {
      ...createVendorBodyDto,
      ...partyContacts,
      contact_name,
    };

    let query = `UPDATE vendor set `;
    for (const key of Object.keys(vendorData)) {
      query += ` ${key} = '${vendorData[key]}',`;
    }
    // remove last (,)
    query = query.slice(0, -1);
    query += ` where code = ?`;
    await this.entityManagerMaster.query(query, [code]);
    return 'vendor created successfully';
  }
  async updateVendorAddress(
    code: string,
    shippingAddress: ShippingAndBillingAddressDto,
    billingAddress: ShippingAndBillingAddressDto,
  ) {
    const currentAddresses = await this.entityManagerMaster.query(
      `select billingAddressId,shippingAddressId from vendor where code = ?`,
      [code],
    );
    const shipAddressId = currentAddresses?.length
      ? currentAddresses[0].shippingAddressId
      : null;
    const billAddressId = currentAddresses?.length
      ? currentAddresses[0].billingAddressId
      : null;
    //update shippinAddress
    const pendingPromise = [];
    if (shippingAddress && shipAddressId) {
      pendingPromise.push(
        this.entityManagerMaster.query(
          `update addresses set addressLine1 = ?,addressLine2 =?,countryCode =?, pincode =?, stateCode =?, city =?, phone =? where id = ?`,
          [
            shippingAddress.addressLine1,
            shippingAddress.addressLine2,
            shippingAddress.countryCode,
            shippingAddress.pincode,
            shippingAddress.stateCode,
            shippingAddress.city,
            shippingAddress.phone,
            shipAddressId,
          ],
        ),
      );
    }
    if (billingAddress && billAddressId) {
      pendingPromise.push(
        this.entityManagerMaster.query(
          `update addresses set addressLine1 = ?,addressLine2 =?,countryCode =?, pincode =?, stateCode =?, city =?, phone =? where id = ?`,
          [
            billingAddress.addressLine1,
            billingAddress.addressLine2,
            billingAddress.countryCode,
            billingAddress.pincode,
            billingAddress.stateCode,
            billingAddress.city,
            billingAddress.phone,
            billAddressId,
          ],
        ),
      );
    }
    await Promise.all(pendingPromise);
  }
}
