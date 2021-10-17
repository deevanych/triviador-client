import Index from '../views/Index.svelte';
import Match from '../views/Match.svelte';
import Home from '../views/Home.svelte';
import { UsersAPI } from '../api/users';
import { authUser } from '../store';

async function isAuth() {
  UsersAPI.getAuthUser().then(({ data }) => {
    authUser.set(data)
    return true
  })

  return false
}

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
      onlyIf: {
        guard: isAuth,
        redirect: '/',
      },
    },
]

export { routes }
