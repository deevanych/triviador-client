import Index from '../views/Index.svelte';
import Match from '../views/Match.svelte';

const routes = [
    {
        name: '/',
        component: Index,
    },
    {
        name: 'match',
        component: Match,
    },
]

export { routes }
