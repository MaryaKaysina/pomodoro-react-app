import React, { useEffect, useState } from 'react';
import { Icon, EIcons } from '../Icon';
import { Text, EColors } from '../Text';
import NotificationSound from '../../../assets/sound2.wav';
import styles from './notification.css';

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
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
