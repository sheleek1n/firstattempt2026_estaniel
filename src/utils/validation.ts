export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateGraduationYear = (year: string): boolean => {
  const y = parseInt(year, 10);
  return y >= 1950 && y <= new Date().getFullYear() + 4;
};

export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2;
};
