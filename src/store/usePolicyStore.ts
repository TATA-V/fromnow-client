import { create } from 'zustand';

export interface Policy {
  all: boolean;
  privacyPolicy: boolean;
  servicePolicy: boolean;
  ageConfirm: boolean;
}

export interface PolicyStore extends Policy {
  animated: boolean;
  setIsChecked: (values: Partial<Policy>) => void;
  setAnimated: (value: boolean) => void;
  reset: () => void;
}

const initial: Policy & { animated: boolean } = {
  all: false,
  privacyPolicy: false,
  servicePolicy: false,
  ageConfirm: false,
  animated: true,
};

const usePolicyStore = create<PolicyStore>(set => ({
  ...initial,
  setIsChecked: (values: Partial<Policy>) => set(prev => ({ ...prev, ...values })),
  setAnimated: (value: boolean) => set(prev => ({ ...prev, animated: value })),
  reset: () => set(prev => ({ ...prev, ...initial })),
}));

export default usePolicyStore;
