import { Content } from './Content';
import { FormBlock } from './FormBlock';
import { PomodorBlock } from './PomodorBlock';
import { TextBlock } from './TextBlock';

export function PomodoroPage() {
  return (
    <Content>
      <TextBlock />
      <FormBlock />
      <PomodorBlock />
    </Content>
  );
}
