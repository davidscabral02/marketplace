export const phoneMask = (phone: string) => {
  return phone
    .replace(/[^0-9]/g, '')
    .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
};

export const phoneUnmask = (phone: string) => {
  return phone.replace(/[^0-9]/g, '');
};
