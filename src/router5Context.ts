import React from 'react';
import { ControllerClass } from '@berish/mvc-core';
import { Router } from 'router5';

export interface Router5PluginContext {
  mapNameToController: [string, ControllerClass][];
  router: Router;
}

export const router5Context = React.createContext<Router5PluginContext>(null);
