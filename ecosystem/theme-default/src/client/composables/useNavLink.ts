import { useResolveRoute } from '@vuepress/client'
import { inferRouteLink } from '@vuepress/shared'
import type { NavLink } from '../../shared/index.js'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (item: string): NavLink => {
  const resolved = useResolveRoute(
    inferRouteLink(
      // the route path of vue-router is url-encoded, and we expect users are using
      // non-url-encoded string in theme config, so we need to url-encode it first to
      // resolve the route correctly
      encodeURI(item)
    )
  )
  return {
    text: resolved.meta.title || item,
    link: resolved.name === '404' ? item : resolved.fullPath,
  }
}
