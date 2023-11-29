import { Bookmark, Home, LucideIcon, Search, Users } from 'lucide-react';
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
];
