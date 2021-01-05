import React from 'react';
import { constants } from 'router5';
import { Route } from 'react-router5';
import { ControllerClass, RenderComponent } from '@berish/mvc-core';

import { router5Context } from './router5Context';
import { parsePath } from './util';

export interface Router5ComponentProps {
  notFoundControllerClass?: ControllerClass<{ error: any }>;
}

export function Router5Component(props: Router5ComponentProps) {
  const { mapNameToController } = React.useContext(router5Context);
  const routerNames = mapNameToController.map((m) => m[0]);

  return (
    <Route>
      {({ route }) => {
        try {
          if (!route || !route.name || routerNames.indexOf(route.name) === -1 || route.name === constants.UNKNOWN_ROUTE)
            throw new Error('not found');

          const controllerClass = mapNameToController.filter((m) => m[0] === route.name)[0][1];
          route.params = parsePath(route.params);

          return <RenderComponent controllerClass={controllerClass} {...route.params} />;
        } catch (error) {
          if (props.notFoundControllerClass)
            return <RenderComponent controllerClass={props.notFoundControllerClass} error={error} />;
          return <>Not found</>;
        }
      }}
    </Route>
  );
}
