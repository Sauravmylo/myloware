import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  PurchaseOrderApiPath,
  PurchaseOrderApi,
  PurchaseOrderApiTags,
} from './purchase-order.constants';
import { PurchaseOrderBodyDto } from './dto/purchase-order.dto';
import { PurchaseOrderService } from './purchase-order.service';

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
}
