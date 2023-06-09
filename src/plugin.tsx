import React from 'react';
import { RouterProvider } from 'react-router5';
import { ControllerClass, LifecyclePlugin } from '@berish/mvc-core';

import { router5Context } from './router5Context';
import { isActiveRoute, navigate, replace } from './methods';
import { PluginParams, getDefaultParams } from './params';

export interface Router5Plugin {
  (params: PluginParams): LifecyclePlugin;
}

export const plugin: Router5Plugin = (params) => ({ mvcController, mvcRenderConfig }) => {
  const { getRouter, mapPathItemsToController, convertPathItemsToPath, convertPathItemsToName } = getDefaultParams(
    params,
  );
  const router = getRouter();
  const mapNameToController: [string, ControllerClass][] = [];

  for (const [pathItems, controllerClass] of mapPathItemsToController) {
    const path = convertPathItemsToPath(pathItems);
    const name = convertPathItemsToName(pathItems);

    mapNameToController.push([name, controllerClass]);

    controllerClass.routeName = name;
    controllerClass.routeTemplatePath = path;
    controllerClass.routeTemplateFullPath =
      controllerClass.routeTemplatePath && `${window.location.origin}${controllerClass.routeTemplatePath}`;
  }

  return {
    controller: {
      upgradeInstance: (instance) => {
        instance.navigate = (controllerClass, params) => navigate(router, controllerClass, params);
        instance.replace = (controllerClass, params) => replace(router, controllerClass, params);
        instance.isActiveRoute = (controllerClass) => isActiveRoute(router, controllerClass);
      },
    },
    provider: {
      upgradeRender: () => {
        const prevRenderApp = mvcRenderConfig.renderApp;

        mvcRenderConfig.renderApp = (props) => {
          return (
            <RouterProvider router={router}>
              <router5Context.Provider value={{ mapNameToController, router }}>
                {prevRenderApp(props)}
              </router5Context.Provider>
            </RouterProvider>
          );
        };
      },
      upgrade: () => {
        mvcController.navigate = (controllerClass, params) => navigate(router, controllerClass, params);
        mvcController.replace = (controllerClass, params) => replace(router, controllerClass, params);
      },
    },
  };
};
