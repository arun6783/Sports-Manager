class PlayerSelectionStrategy {
  constructor(allowedTiers) {
    this.allowedTiers = allowedTiers || []
  }

  canSelectPlayer(firstPlayer, nextPlayer) {
    return this.allowedTiers.includes(nextPlayer.tier)
  }
}

export class PlayerSelectionStrategyFactory {
  static getStrategy(tier, tiers) {
    const selectedTier = tiers.find((t) => t.name === tier)
    return new PlayerSelectionStrategy(selectedTier?.allowedTiers || [])
  }
}
