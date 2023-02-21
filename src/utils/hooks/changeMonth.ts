import { addMonths, subMonths } from 'date-fns';

export const changeMonth = (
  moveTo: string,
  state: { currentMonth: Date; setCurrentMonth: (prev: Date) => void }
) => {
  if (moveTo === 'PREV') {
    state.setCurrentMonth(subMonths(state.currentMonth, 1));
  } else {
    state.setCurrentMonth(addMonths(state.currentMonth, 1));
  }
};
