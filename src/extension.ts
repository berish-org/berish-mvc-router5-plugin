import '@berish/mvc-core/build/component/controller';
import '@berish/mvc-core/build/provider/mvcController';
import { ControllerClass, ControllerClassProps } from '@berish/mvc-core/build/component/controller';

declare module '@berish/mvc-core/build/component/controller' {
  export interface Controller {
    navigate<TControllerClass extends ControllerClass>(
      controllerClass: TControllerClass,
      params?: ControllerClassProps<TControllerClass>,
    ): void;
    isActiveRoute<TControllerClass extends ControllerClass>(controllerClass: TControllerClass): boolean;
  }

  export interface ControllerClass {
    routePath: string;
    routeName: string;
    routeFullPath: string;
  }

  namespace Controller {
    let routePath: string;
    let routeName: string;
    let routeFullPath: string;
  }
}

declare module '@berish/mvc-core/build/provider/mvcController' {
  export default interface MvcController {
    navigate<TControllerClass extends ControllerClass>(
      controllerCls: TControllerClass,
      params?: ControllerClassProps<TControllerClass>,
    ): void;
  }
}
