import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'projector',
        loadComponent: () =>
            import('./pages/projector/projector.page').then(
                (c) => c.ProjectorPage
            ),
    },
    {
        path: 'camera',
        loadComponent: () =>
            import('./pages/camera/camera.page').then((c) => c.CameraPage),
    },
    {
        path: '**',
        redirectTo: 'projector',
    },
];
