class PlayerSelectionStrategy {
  canSelectPlayer(firstPlayer, nextPlayer) {
    return false
  }
}

class Div1SelectionStrategy extends PlayerSelectionStrategy {
  canSelectPlayer(firstPlayer, nextPlayer) {
    return nextPlayer.tier === 'Div1' || nextPlayer.tier === 'Div2'
  }
}

class Div2SelectionStrategy extends PlayerSelectionStrategy {
  canSelectPlayer(firstPlayer, nextPlayer) {
    return (
      nextPlayer.tier === 'Div1' ||
      nextPlayer.tier === 'Div2' ||
      nextPlayer.tier === 'Leisure'
    )
  }
}

class LeisureSelectionStrategy extends PlayerSelectionStrategy {
  canSelectPlayer(firstPlayer, nextPlayer) {
    return nextPlayer.tier === 'Leisure' || nextPlayer.tier === 'Div2'
  }
}

export class PlayerSelectionStrategyFactory {
  static getStrategy(tier) {
    switch (tier) {
      case 'Div1':
        return new Div1SelectionStrategy()
      case 'Div2':
        return new Div2SelectionStrategy()
      case 'Leisure':
        return new LeisureSelectionStrategy()
      default:
        return new PlayerSelectionStrategy() // Default fallback strategy
    }
  }
}
