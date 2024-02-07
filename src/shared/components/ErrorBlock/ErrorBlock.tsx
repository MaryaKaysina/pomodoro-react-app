import { Text } from 'src/shared/components/Text';

import { EColors } from 'src/shared/components/Text/text.interface';
import { IErrorBlock } from './errorblock.interface';

export const ErrorBlock = ({ message, color = EColors.white, size = 16 }: IErrorBlock) => {
  return (
    <Text mobileSize={12} size={size} color={color}>
      {message}
    </Text>
  );
}
