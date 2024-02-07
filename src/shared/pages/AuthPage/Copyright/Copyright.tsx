import { Text } from 'src/shared/components/Text';

import { EColors } from 'src/shared/components/Text/text.interface';

export const Copyright = () => {
  return (
    <Text size={10} color={EColors.white}>
      Skillbox® | 2021
    </Text>
  );
}
