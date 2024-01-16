import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VendorSerivce } from './vendor.service';
import { VendorApiPath, VendorApi, VendorApiTags } from './vendor.constant';
import { CreateVendorBodyDto } from './dto/create-vendor-dto';

@ApiTags(VendorApiTags.API_TAG)
@Controller(VendorApi.CONTROLLER)
export class VendorController {
  constructor(private readonly vendorService: VendorSerivce) {}

  @Post(VendorApiPath.CREATE_VENDOR)
  async createVendor(@Body() createVendorBodyDto: CreateVendorBodyDto) {
    return await this.vendorService.createVendor(createVendorBodyDto);
  }
}