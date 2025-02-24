// menu-items.ts

import { RouteInfo } from './sidebar.metadata';

export const ALL_ROUTES: RouteInfo[] = [
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
    path: '/subscriptions/create',
    title: 'Subscriptions',
    icon: 'bi bi-journal-bookmark',  
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
  },
  // Admin-specific routes
  {
    path: 'back-office/parcels',
    title: 'Parcels',
    icon: 'bi bi-box',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'back-office/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-house-door',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'back-office/drivers',
    title: 'Drivers',
    icon: 'bi bi-person-bounding-box',
    class: '',
    extralink: false,
    submenu: []
  },
  
  {
    path: 'back-office/vehicles',
    title: 'Vehicles',
    icon: 'bi bi-car',
    class: '',
    extralink: false,
    submenu: []
  },

  // Driver-specific routes

  {
    path: 'driver-interface/trips',
    title: 'Trip',
    icon: 'bi bi-geo-alt',  // Map pin for trips
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'driver-interface/parcels',
    title: 'Parcel',
    icon: 'bi bi-box',  // Box icon for parcels
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'drivers/schedule',
    title: 'Schedule',
    icon: 'bi bi-calendar-check',  // Calendar icon for schedule
    class: '',
    extralink: false,
    submenu: []
  }
  
];
