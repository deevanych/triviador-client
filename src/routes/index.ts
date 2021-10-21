import Index from '../views/Index.svelte';
import Match from '../views/Match.svelte';
import Home from '../views/Home.svelte';
import OneCopy from '../views/OneCopy.svelte';

const routes = [
  {
    name: '/',
    component: Index,
  },
  {
    name: 'match',
    component: Match,
  },
  {
    name: 'home',
    component: Home,
  },
  {
    name: 'bye-bye',
    component: OneCopy,
  },
]

export { routes }
