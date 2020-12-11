import type { BetValue, BetName, AddBetAction } from '../types/bet';


export const plusBet = (name:BetName,  value: BetValue): AddBetAction => {
  return {
    type: 'PLUS_BET',
    value: value,
    name: name
  };
};

export const minusBet = (name:BetName, value: BetValue): AddBetAction => {
    return {
      type: 'MINUS_BET',
      value: value,
      name:name
    };
  };