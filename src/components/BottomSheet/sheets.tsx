import { registerSheet, ActionSheetProps } from 'react-native-actions-sheet';
import { Image as ImageType } from 'react-native-image-crop-picker';
import SignupPolicy from './SignupPolicy';
import SelectTeam from './SelectTeam';

registerSheet('signup-policy', SignupPolicy);
registerSheet('select-team', SelectTeam);

type SheetDefinition = ActionSheetProps;

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'signup-policy': SheetDefinition;
    'select-team': {
      show(sheetId: string, options?: { payload?: { file: ImageType; content: string }; onClose?: (data: unknown) => void; context?: string }): void;
    };
  }
}

export {};
