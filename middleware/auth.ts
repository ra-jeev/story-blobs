export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    const route = {
      path: '/login',
      query: { redirect: to.fullPath },
    };

    return navigateTo(route);
  }
});
