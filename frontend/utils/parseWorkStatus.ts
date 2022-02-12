const parseWorkStatus = (status: number) => {
  const statusTypes = {
    1: 'Ubehandlet',
    2: 'Godkjent',
    3: 'Underkjent',
  };

  return statusTypes[status as keyof typeof statusTypes];
};

export default parseWorkStatus;
