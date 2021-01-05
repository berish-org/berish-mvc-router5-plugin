import React from 'react';
import { ControllerClass } from '@berish/mvc-core';

export interface Router5PluginContext {
  mapNameToController: [string, ControllerClass][];
}

export const router5Context = React.createContext<Router5PluginContext>(null);
