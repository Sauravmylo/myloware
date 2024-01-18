import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PurchaseOrderBodyDto } from './dto/purchase-order.dto';
import { PurchaseOrderItemsDto } from './dto/purchase-order-items.dto';
import { DATABASE_INSTANCE } from 'src/config/database/database.constants';
import { CreadtedAtBetween } from './dto/created-between.dto';
import { PurchaseOrderDetailDto } from './dto/purchase-order-detail.dto';
import { ChangePoStatusBodyDto } from './dto/change-po-status.dto';
@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectEntityManager(DATABASE_INSTANCE.MASTER)
    private readonly entityManagerMaster: EntityManager,
  ) {}
  async createPurchaseOrder(purchaseOrderBodyDto: PurchaseOrderBodyDto) {
    const poCode = await this.createUniquePoCode();
    await this.storePurchaseOrderItems(
      poCode,
      purchaseOrderBodyDto.purchaseOrderItems,
    );
    const vendorCode = purchaseOrderBodyDto.vendorCode;
    const expiryDate = purchaseOrderBodyDto.expiryDate;
    const deliveryDate = purchaseOrderBodyDto.deliveryDate;
    const logisticCharges = purchaseOrderBodyDto.logisticCharges;
    await this.entityManagerMaster.query(
      `INSERT INTO purchase_order (poCode,vendorCode,expiryDate,deliveryDate,logisticCharges) VALUES (?,?,?,?,?)`,
      [poCode, vendorCode, expiryDate, deliveryDate, logisticCharges],
    );
  }
  async storePurchaseOrderItems(
    poCode: string,
    items: PurchaseOrderItemsDto[],
  ) {
    // loop over all items one by one and insert each one
    const pendingPromise = [];
    for (const item of items) {
      const itemSKU = item.itemSKU;
      const quantity = item.quantity;
      const unitPrice = item.unitPrice;
      const maxRetailPrice = item.maxRetailPrice;
      const discount = item.discount;
      const taxTypeCode = item.taxTypeCode;
      const discountPercentage = item.discountPercentage;
      pendingPromise.push(
        this.entityManagerMaster.query(
          `INSERT INTO purchase_order_items (poCode,itemSKU,quantity,unitPrice,maxRetailPrice,discount,taxTypeCode,discountPercentage) VALUES (?,?,?,?,?,?,?,?)`,
          [
            poCode,
            itemSKU,
            quantity,
            unitPrice,
            maxRetailPrice,
            discount,
            taxTypeCode,
            discountPercentage,
          ],
        ),
      );
    }
    await Promise.all(pendingPromise);
  }
  async createUniquePoCode(facility: string = null) {
    let code = `PO`;
    if (facility) {
      const warehouse = await this.entityManagerMaster.query(
        `select * from warehouse where warehouse = ?`,
        [facility],
      );
      const region = warehouse[0].region;
      const id = warehouse[0].id;
      code += `-${id}-${region}`;
    }

    return 'POCode';
  }
  async getPurchaseOrder(creadtedAtBetween: CreadtedAtBetween) {
    const startDate = creadtedAtBetween.start;
    const endDate = creadtedAtBetween.end;
    const poOrders = await this.entityManagerMaster.query(
      `select poCode from purchase_order where status ='1' and created_at >= ${startDate} and created_at <=${endDate}`,
    );
    const purchaseOrderCodes = [];
    poOrders?.forEach((order) => {
      purchaseOrderCodes.push(order.poCode);
    });
    return { purchaseOrderCodes };
  }
  async getPurchaseOrderDetail(purchaseOrderDetailDto: PurchaseOrderDetailDto) {
    const poCode = purchaseOrderDetailDto.purchaseOrderCode;

    const PoAndVendorDetails = await this.entityManagerMaster.query(
      `select po.statusCode,po.vendorCode,po.expiryDate,po.deliveryDate,po.createdBy,po.taxOnSales,po.totalAmount ,po.created_at,v.name ,a.addressLine1,a.addressLine2,a.city,a.pincode,a.phone,a.stateCode from purchase_order po inner join vendor v on po.vendorCode = v.code inner join addresses a on v.shippingAddressId = a.id where po.poCode = ${poCode} limit 1`,
    );
    let result = {};
    if (PoAndVendorDetails?.length) {
      const partyAddressDTO = {
        addressLine1: PoAndVendorDetails[0].addressLine1,
        addressLine2: PoAndVendorDetails[0].addressLine2,
        city: PoAndVendorDetails[0].city,
        pincode: PoAndVendorDetails[0].pincode,
        phone: PoAndVendorDetails[0].phone,
      };
      const purchaseOrderPriceSummary = {
        taxOnSales: PoAndVendorDetails[0].taxOnSales,
        totalAmount: PoAndVendorDetails[0].totalAmount,
      };
      result = {
        code: PoAndVendorDetails[0].code,
        statusCode: PoAndVendorDetails[0].statusCode,
        vendorCode: PoAndVendorDetails[0].vendorCode,
        vendorName: PoAndVendorDetails[0].name,
        created: PoAndVendorDetails[0].created_at,
        createdBy: PoAndVendorDetails[0].createdBy,
        expiryDate: PoAndVendorDetails[0].expiryDate,
        deliveryDate: PoAndVendorDetails[0].deliveryDate,
        partyAddressDTO,
        purchaseOrderPriceSummary,
      };
    }
    const PoItemsDetails = await this.entityManagerMaster.query(
      `select poi.itemSKU,poi.quantity,poi.pendingQuantity,poi.unitPrice,poi.tax from purchase_order po inner join purchase_order_items poi on po.poCode = poi.poCode where po.poCode = ${poCode};`,
    );
    if (PoItemsDetails?.length) {
      result = {
        ...result,
        PoItemsDetails,
      };
    }
    return result;
  }
  async changePoStatus(changePoStatusBodyDto: ChangePoStatusBodyDto) {
    const orderStatus = changePoStatusBodyDto.po_status;
    const poCode = changePoStatusBodyDto.purchaseOrderCode;
    await this.entityManagerMaster.query(
      `UPDATE purchase_orders set statusCode = ? where poCode = ?`,
      [orderStatus, poCode],
    );
    return 'status updated successfully';
  }
}
