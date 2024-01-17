import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VendorSerivce } from './vendor.service';
import { VendorApiPath, VendorApi, VendorApiTags } from './vendor.constant';
import { CreateVendorBodyDto } from './dto/create-vendor-dto';
import { VendorCatalogBodyDto } from './dto/vendor-catalog';

@ApiTags(VendorApiTags.API_TAG)
@Controller(VendorApi.CONTROLLER)
export class VendorController {
  constructor(private readonly vendorService: VendorSerivce) {}

  @Post(VendorApiPath.CREATE_VENDOR)
  async createVendor(@Body() createVendorBodyDto: CreateVendorBodyDto) {
    return await this.vendorService.createVendor(createVendorBodyDto);
  }
  @Put(`${VendorApiPath.UPDATE_VENDOR}/:code`)
  async updateVendor(
    @Param('code') code: string,
    @Body() createVendorBodyDto: CreateVendorBodyDto,
  ) {
    return await this.vendorService.updateVendor(code, createVendorBodyDto);
  }
  @Post(VendorApiPath.VENDOR_ITEM_TYPE_EDIT)
  async createVendorCatalog(vendorCatalogBodyDto: VendorCatalogBodyDto) {
    return await this.vendorService.createVendorCatalog(vendorCatalogBodyDto);
  }
}
