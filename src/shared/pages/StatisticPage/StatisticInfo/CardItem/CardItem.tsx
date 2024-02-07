import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Icon } from 'src/shared/components/Icon';
import { Text } from 'src/shared/components/Text';

import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { EColors } from 'src/shared/components/Text/text.interface';
import { ICardItem } from './carditem.interface';

import styles from './carditem.module.css';

export const CardItem = ({ type, num = 0 }: ICardItem) => {
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const [classList, setClassList] = useState('');
  const [img, setImg] = useState<EIcons>(EIcons.focusIcon);

  useEffect(() => {
    if (num > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (type === 'pause') {
      setIsFocus(false);
      setIsPause(true);
      setIsStop(false);
      setImg(EIcons.clockIcon);
    };

    if (type === 'stop') {
      setIsFocus(false);
      setIsPause(false);
      setIsStop(true);
      setImg(EIcons.stopIcon);
    };

    const classes = classNames(
      styles['cardBlock'],
      { [styles.isFocus]: isFocus },
      { [styles.isPause]: isPause },
      { [styles.isStop]: isStop },
      { [styles.isActive]: isActive },
    );

    setClassList(classes);
  }, [isFocus, isPause, isStop, isActive, num]);

  return (
    <div className={classList}>
      <Text As='h3' mobileSize={16} size={24} color={EColors.black}>
        {isFocus && 'Фокус'}
        {isPause && 'Время на паузе'}
        {isStop && 'Остановки'}
      </Text>
      <Text mobileSize={24} size={64} color={EColors.black}>
        {isFocus && `${num}%`}
        {isPause && `${num}м`}
        {isStop && num}
      </Text>
      <div className={styles.cardIcon}>
        <Icon name={img} />
      </div>
    </div>
  );
}
