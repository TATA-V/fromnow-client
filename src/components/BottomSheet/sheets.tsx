import { registerSheet, ActionSheetProps } from 'react-native-actions-sheet';
import SignupPolicy from './SignupPolicy';

registerSheet('signup-policy', SignupPolicy);

type SheetDefinition = ActionSheetProps;

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'signup-policy': SheetDefinition;
  }
}

export {};
