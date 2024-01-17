import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PurchaseOrderBodyDto } from './dto/purchase-order.dto';
import { PurchaseOrderItemsDto } from './dto/purchase-order-items.dto';
import { DATABASE_INSTANCE } from 'src/config/database/database.constants';

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
}
