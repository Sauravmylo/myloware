/*
 * Copyright (C) 2022, Mylo Family - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 */

import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class UtilService {
  private readonly numberFormat;

  constructor() {
    this.numberFormat = new Intl.NumberFormat('en-IN');
  }

  getNumberWithCommas(x) {
    return this.numberFormat.format(parseInt(x));
  }

  isObject(value): boolean {
    return _.isObject(value) && !_.isArray(value);
  }

  isArray(value): boolean {
    return _.isArray(value);
  }

  isEqual(obj1, obj2): any {
    return _.isEqual(obj1, obj2);
  }
}
