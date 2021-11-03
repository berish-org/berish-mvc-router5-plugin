import '@berish/mvc-core/build/component/controller';
import '@berish/mvc-core/build/provider/mvcController';
import { ControllerClass, PropsFromControllerClass } from '@berish/mvc-core/build/component/controller';

declare module '@berish/mvc-core/build/component/controller' {
  export interface Controller {
    navigate<TControllerClass extends ControllerClass>(
      controllerClass: TControllerClass,
      params?: PropsFromControllerClass<TControllerClass>,
    ): void;
    replace<TControllerClass extends ControllerClass>(
      controllerClass: TControllerClass,
      params?: PropsFromControllerClass<TControllerClass>,
    ): void;
    isActiveRoute<TControllerClass extends ControllerClass>(controllerClass: TControllerClass): boolean;
  }

  export interface ControllerClass {
    /** Route name, like book_home */
    routeName: string;

    /** Route path, like /book/:id */
    routeTemplatePath: string;

    /** Route full path like http://localhost:80/book/:id */
    routeTemplateFullPath: string;
  }

  namespace Controller {
    /** Route name, like book_home */
    let routeName: string;

    /** Route template path, like /book/:id */
    let routeTemplatePath: string;

    /** Route full path like http://localhost:80/book/:id */
    let routeTemplateFullPath: string;
  }
}

declare module '@berish/mvc-core/build/provider/mvcController' {
  export interface MvcController {
    navigate<TControllerClass extends ControllerClass>(
      controllerCls: TControllerClass,
      params?: PropsFromControllerClass<TControllerClass>,
    ): void;
    replace<TControllerClass extends ControllerClass>(
      controllerCls: TControllerClass,
      params?: PropsFromControllerClass<TControllerClass>,
    ): void;
  }
}
