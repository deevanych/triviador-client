import Home from '../views/Home.svelte';
import Match from '../views/Match.svelte';

const routes = [
    {
        name: '/',
        component: Home,
    },
    {
        name: 'match',
        component: Match,
    },
]

export { routes }
