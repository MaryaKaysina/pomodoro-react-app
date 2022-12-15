import React from 'react';
import { Content } from './Content';
import { FormBlock } from './FormBlock';
import { PomodorBlock } from './PomodorBlock';
import { TextBlock } from './TextBlock';

import styles from './pomodoropage.css';

export function PomodoroPage() {
  return (
    <Content>
      <TextBlock />
      <FormBlock />
      <PomodorBlock />
    </Content>
  );
}
