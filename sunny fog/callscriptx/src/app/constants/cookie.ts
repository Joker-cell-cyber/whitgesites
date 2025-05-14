export type ConsentOptions = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const defaultConsents: ConsentOptions = {
  necessary: true, // Always enabled
  preferences: false,
  analytics: false,
  marketing: false
}; 