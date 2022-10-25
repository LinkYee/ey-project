import type { ProjectConfigInterface } from '@xrengine/projects/ProjectConfigInterface'

const config: ProjectConfigInterface = {
  onEvent: undefined,
  webappInjection: () => import('./webappInjection'),
  thumbnail: '/static/etherealengine.png',
  routes: {},
  services: undefined,
  databaseSeed: undefined
}

export default config
