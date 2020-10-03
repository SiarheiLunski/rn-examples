export const initialState = {
  currentValue: '0',
  operator: null,
  previousValue: null
};

export const handleNumber = (value, prevValue) => ({
  currentValue: `${prevValue === '0' ? '' : prevValue}${value}`
});

export const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;
  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  switch (operator) {
  case '/': return {
    ...initialState,
    currentValue: previous / current,
  };
  case '*': return {
    ...initialState,
    currentValue: previous * current,
  };
  case '+': return {
    ...initialState,
    currentValue: previous + current,
  };
  case '-': return {
    ...initialState,
    currentValue: previous - current,
  };
  default: return state;
  }
};

export default (type, value, state) => {
  const { currentValue } = state;
  switch (type) {
  case 'number': return handleNumber(value, currentValue);
  case 'operator': return {
    operator: value,
    previousValue: currentValue,
    currentValue: '0'
  };
  case 'equal': return handleEqual(state);
  case 'clear': return initialState;
  case 'posneg': return {
    currentValue: `${parseFloat(currentValue) * -1}`
  };
  case 'percentage': return {
    currentValue: `${parseFloat(currentValue) * 0.01}`
  };
  default: return state;
  }
};
