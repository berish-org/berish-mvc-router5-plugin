import { Router } from 'router5';
import { isExtends } from '@berish/class';
import { Controller, ControllerClass, ControllerClassProps } from '@berish/mvc-core';

import { buildPath } from '../util';

export function replace<TControllerClass extends ControllerClass>(
  router: Router,
  controllerClass: TControllerClass,
  params?: ControllerClassProps<TControllerClass>,
) {
  if (isExtends(controllerClass, Controller)) {
    if (controllerClass.routeName) {
      const paramsPath = params && buildPath(params);
      router.navigate(controllerClass.routeName, paramsPath, { replace: true });
    } else console.warn('Route for this controller not found');
  }
}
