import { Content } from 'src/shared/pages/PomodoroPage/Content';
import { FormBlock } from 'src/shared/pages/PomodoroPage/FormBlock';
import { PomodorBlock } from 'src/shared/pages/PomodoroPage/PomodorBlock';
import { TextBlock } from 'src/shared/pages/PomodoroPage/TextBlock';

export const PomodoroPage = () => {
  return (
    <Content>
      <TextBlock />
      <FormBlock />
      <PomodorBlock />
    </Content>
  );
}
