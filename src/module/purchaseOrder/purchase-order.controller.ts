import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  PurchaseOrderApiPath,
  PurchaseOrderApi,
  PurchaseOrderApiTags,
} from './purchase-order.constants';
import { PurchaseOrderBodyDto } from './dto/purchase-order.dto';
import { PurchaseOrderService } from './purchase-order.service';
import { CreadtedAtBetween } from './dto/created-between.dto';
import { PurchaseOrderDetailDto } from './dto/purchase-order-detail.dto';

@ApiTags(PurchaseOrderApiTags.API_TAG)
@Controller(PurchaseOrderApi.CONTROLLER)
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}
  @Post(PurchaseOrderApiPath.CREATE)
  async createPurchaseOrder(
    @Body() purchaseOrderBodyDto: PurchaseOrderBodyDto,
  ) {
    return await this.purchaseOrderService.createPurchaseOrder(
      purchaseOrderBodyDto,
    );
  }
  @Post(PurchaseOrderApiPath.GET_PURCHASE_ORDER)
  async getPurchaseOrder(@Body() creadtedAtBetween: CreadtedAtBetween) {
    return await this.purchaseOrderService.getPurchaseOrder(creadtedAtBetween);
  }
  @Post(PurchaseOrderApiPath.GET_PURCHASE_ORDER_DETAIL)
  async getPurchaseOrderDetail(
    @Body() purchaseOrderDetailDto: PurchaseOrderDetailDto,
  ) {
    return await this.purchaseOrderService.getPurchaseOrderDetail(
      purchaseOrderDetailDto,
    );
  }
}
