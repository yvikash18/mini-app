import type { ComponentType, JSX } from 'react';

import { FragmentPage } from '@/pages/FragmentPage/FragmentPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: FragmentPage },
];
