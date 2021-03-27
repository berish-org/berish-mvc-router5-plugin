import { Router } from 'router5';
import { isExtends } from '@berish/class';
import { Controller, ControllerClass, ControllerClassProps } from '@berish/mvc-core';

import { buildQueryParameters } from '../util';

export function buildPath<TControllerClass extends ControllerClass>(
  router: Router,
  controllerClass: TControllerClass,
  params?: ControllerClassProps<TControllerClass>,
) {
  try {
    if (isExtends(controllerClass, Controller)) {
      if (controllerClass.routeName) {
        const queryParams = params && buildQueryParameters(params);
        return router.buildPath(controllerClass.routeName, queryParams);
      }
    }
  } catch (err) {
    return null;
  }
  return null;
}
