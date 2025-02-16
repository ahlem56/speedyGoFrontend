import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: 'trips/create',
    title: 'Trip',
    icon: 'bi bi-geo-alt',  // Map pin for trips
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'carpooling/create',
    title: 'Carpool',
    icon: 'bi bi-car-front',  // Car icon for carpooling
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'parcels/create',
    title: 'Parcel',
    icon: 'bi bi-box',  // Box icon for parcels
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'events',
    title: 'Events',
    icon: 'bi bi-calendar-event',  // Calendar icon for events
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'complaints/create',
    title: 'Complaints',
    icon: 'bi bi-exclamation-circle',  // Exclamation circle for complaints
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-info-circle',  // Info circle for About section
    class: '',
    extralink: false,
    submenu: []
  }
];