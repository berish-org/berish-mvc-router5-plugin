import { Router } from 'router5';
import { isExtends } from '@berish/class';
import { Controller, ControllerClass } from '@berish/mvc-core';

export function isActiveRoute<TControllerClass extends ControllerClass>(
  router: Router,
  controllerClass: TControllerClass,
) {
  if (isExtends(controllerClass, Controller)) return router.isActive(controllerClass.routeName);
  return false;
}
