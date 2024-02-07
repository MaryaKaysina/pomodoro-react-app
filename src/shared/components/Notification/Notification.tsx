import React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { Text } from 'src/shared/components/Text';
import NotificationSound from 'src/assets/sound2.wav';

import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { EColors } from 'src/shared/components/Text/text.interface';

import styles from './notification.module.css';

export const Notification = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  React.useEffect(() => {
    const song = new Audio(NotificationSound);
    song.play();
  }, [])

  return (
    <div className={isOpen ? styles.notificationOut : ''}>
      <div className={styles.notificationBlock}>
        <div className={styles.notificationContent}>
          <div className={styles.notificationIcon}>
            <Icon name={EIcons.notificationIcon} />
          </div>

          <div className={styles.notificationText}>
            <div className={styles.notificationTitle}>
              <Text mobileSize={14} size={16} color={EColors.white} bold>
                Вы успешно справились!
              </Text>
            </div>
            <div className={styles.notificationSubtitle}>
              <Text mobileSize={14} size={16} color={EColors.greyC4} bold>
                Поехали дальше?
              </Text>
            </div>
          </div>
        </div>
        <button className={styles.notificationBtn} onClick={handleClick}>
          <Text mobileSize={14} size={16} color={EColors.white} bold>
            ОК
          </Text>
        </button>
      </div>
    </div>
  );
}
