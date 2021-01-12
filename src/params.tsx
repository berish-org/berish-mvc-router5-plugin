import React from 'react';
import LINQ from '@berish/linq';
import { Router, State } from 'router5';

import { ControllerClass, RenderComponent } from '@berish/mvc-core';

export type Router5ControllerMapType = [(string | number)[], ControllerClass][];

export interface PluginParams {
  getRouter: () => Router;
  mapPathItemsToController: Router5ControllerMapType;

  convertPathItemsToPath?: (items: (string | number)[]) => string;
  convertPathItemsToName?: (items: (string | number)[]) => string;
  renderComponent?: (controllerClass: ControllerClass, state: State) => React.ReactNode;
}

const defaultParams: PluginParams = {
  getRouter: void 0,
  mapPathItemsToController: void 0,

  convertPathItemsToName: (items) => items.join('_').toLocaleLowerCase() || 'index',
  convertPathItemsToPath: (items) => '/' + items.join('/').toLocaleLowerCase(),
  renderComponent: (controllerClass, state) => <RenderComponent controllerClass={controllerClass} {...state.params} />,
};

export function getDefaultParams(params?: PluginParams) {
  params = params || defaultParams;
  if (params !== defaultParams) {
    LINQ.from(Object.keys(defaultParams))
      .except(Object.keys(params))
      .forEach((key: string) => {
        (params as any)[key] = (defaultParams as any)[key];
      });
  }
  return params;
}
