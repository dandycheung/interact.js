import * as pointerEvents from './base'
import holdRepeat from './holdRepeat'
import interactableTargets from './interactableTargets'

function install (scope: Interact.Scope) {
  scope.usePlugin(pointerEvents)
  scope.usePlugin(holdRepeat)
  scope.usePlugin(interactableTargets)
}

const id = 'pointer-events'

export { id, pointerEvents, holdRepeat, interactableTargets, install }
