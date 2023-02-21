export const formatDate = (date: Date) => {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateWeekday = (date: Date) => {
  return date.toLocaleString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });
};

export const formatRootHeaderDate = (date: Date) => {
  return date
    .toLocaleString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
    })
    .slice(2);
};
