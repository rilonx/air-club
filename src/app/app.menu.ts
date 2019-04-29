import { MenuItem } from '@app/core/models';

export const AppMenuItems: Array<MenuItem> = [
  {
    text: 'Аэропорты',
    route: '/airports',
    order: 1,
    roles: ['admin', 'users'],
    subMenu: null
  },
  {
    text: 'Самолеты',
    route: '/planes',
    order: 2,
    roles: ['admin', 'users'],
    subMenu: null
  },
  {
    text: 'Пилоты',
    route: '/pilots',
    order: 2,
    roles: ['admin', 'users'],
    subMenu: null
  }
];
