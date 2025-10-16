export interface NavShape {
  id: number;
  label: string;
  href: string;
  icon: string;
}

const navigationItems: NavShape[] = [
  {
    id: 1,
    label: "Dashboard",
    href: "/",
    icon: 'home'
  },
  {
    id: 2,
    label: "Branches",
    href: "/branches",
    icon: 'branch'
  },
  {
    id: 3,
    label: 'Classes',
    href: '/classes',
    icon: 'class'
  },
  {
    id: 4,
    label: "Teachers",
    href: "/teachers",
    icon: 'teacher'
  },
  {
    id: 5,
    label: "Students",
    href: "/students",
    icon: 'student'
  },
  {
    id: 6,
    label: "Attendances",
    href: "/attendances",
    icon: 'attendance'
  },
];

export default navigationItems;
