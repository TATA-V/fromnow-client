import { registerSheet, ActionSheetProps } from 'react-native-actions-sheet';
import SignupPolicy from './SignupPolicy';
import SelectTeam from './SelectTeam';

registerSheet('signup-policy', SignupPolicy);
registerSheet('select-team', SelectTeam);

type SheetDefinition = ActionSheetProps;

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'signup-policy': SheetDefinition;
    'select-team': SheetDefinition;
  }
}

export {};
