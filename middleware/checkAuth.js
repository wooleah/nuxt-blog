export default function(context) {
  console.log('[middleware] Check Auth')
  context.store.dispatch('initAuth', context.req)
}
