// @flow

import type {BetValue, AddBetAction, Bet, BetName } from '../types/bet';
import type { Action } from '../types';

const initialState = {
    bets: [],
  }

const addBet = (name: BetName, value: BetValue): Bet => ({
    name,
    value
  });

const bets = (state= initialState.bets, action: Action) => {
  switch (action.type) {
    case 'PLUS_BET':
        var result = state.filter(obj => {
            return obj.name === action.name
        });
        if(result.length > 0) { // Đã đặt cược thì cập nhật thêm giá
            result[0].value += action.value;
            return [ ...state];
        }else {
            return [ ...state, addBet(action.name, action.value)];
        }
    case 'MINUS_BET':
        return state.map(bet => {
            if(bet.name === action.name){
                bet.value -= action.value;
            }
            return bet;
        })
    default:
      return state;
  }
};

export default bets;
