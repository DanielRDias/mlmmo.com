export default function ({ store, redirect }) {
  store.dispatch('auth/load')
  // If the user is not authenticated
  if (!store.state.auth.isAuthenticated) {
    return redirect('/login')
  }
}
