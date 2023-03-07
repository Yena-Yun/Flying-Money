import { addMonths, subMonths } from 'date-fns';

export const changeMonth = (
  moveTo: string,
  state: { currentMonth: Date; setCurrentMonth: (prev: Date) => void }
) => {
  moveTo === 'PREV'
    ? state.setCurrentMonth(subMonths(state.currentMonth, 1))
    : state.setCurrentMonth(addMonths(state.currentMonth, 1));
};
