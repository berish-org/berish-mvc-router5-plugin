import { Router } from 'router5';
import { isExtends } from '@berish/class';
import { Controller, ControllerClass, ControllerClassProps } from '@berish/mvc-core';

import { buildQueryParameters } from '../util';

export function navigate<TControllerClass extends ControllerClass>(
  router: Router,
  controllerClass: TControllerClass,
  params?: ControllerClassProps<TControllerClass>,
) {
  if (isExtends(controllerClass, Controller)) {
    if (controllerClass.routeName) {
      const queryParams = params && buildQueryParameters(params);
      router.navigate(controllerClass.routeName, queryParams);
    } else console.warn('Route for this controller not found');
  }
}
