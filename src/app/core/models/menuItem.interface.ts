export interface MenuItem {
  text: string;
  route: string;
  order: number;
  roles: string[];
  subMenu: MenuItem[] | null
}
