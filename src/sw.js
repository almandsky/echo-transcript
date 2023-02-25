// Import the Workbox library
import { precacheAndRoute } from 'workbox-precaching';
import { routes } from './components/common/routes';

// Call precacheAndRoute with an array of all your client-side URLs
precacheAndRoute(Object.keys(routes));
