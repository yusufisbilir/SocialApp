import {
  Bookmark,
  Home,
  LucideIcon,
  PlusSquare,
  Search,
  Users,
} from 'lucide-react';
import { ROUTES } from './ROUTES';

type SidebarLink = {
  label: string;
  route: string;
  icon: LucideIcon;
};
export const sidebarLinks: SidebarLink[] = [
  { label: 'Home', route: ROUTES.HOME, icon: Home },
  { label: 'Explore', route: ROUTES.EXPLORE, icon: Search },
  { label: 'People', route: ROUTES.PEOPLE, icon: Users },
  { label: 'Saved', route: ROUTES.SAVED, icon: Bookmark },
  { label: 'Create', route: ROUTES.CREATE_POST, icon: PlusSquare },
];

export const bottombarLinks: SidebarLink[] = [
  { label: 'Home', route: ROUTES.HOME, icon: Home },
  { label: 'Explore', route: ROUTES.EXPLORE, icon: Search },
  { label: 'Saved', route: ROUTES.SAVED, icon: Bookmark },
  { label: 'Create', route: ROUTES.CREATE_POST, icon: PlusSquare },
];
