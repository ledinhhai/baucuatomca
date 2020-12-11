export type BetValue = Number;
export type BetName = String;

export type Bet = {
    +name: Name,
    +value: Value
  };

export type AddBetAction =
  | { type: 'INCREASE_BET', +value: BetValue }