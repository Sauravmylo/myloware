/*
 * Copyright (C) 2022, Mylo Family - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 */

import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorSerivce } from './vendor.service';

@Module({
  controllers: [VendorController],
  providers: [VendorSerivce],
})
export class VendorsModule {}
