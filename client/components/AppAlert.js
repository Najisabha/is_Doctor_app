import React from 'react';
import { Text } from 'react-native';
import { Dialog } from 'react-native-elements';
// import styles from '../styles/alertStyles';

const AppAlert = ({
  visible,
  title,
  message,
  type = 'alert',        // 'alert' | 'confirm'
  okText = 'حسناً',
  cancelText = 'إلغاء',
  onClose = () => {},
  onConfirm = () => {},
}) => {
  if (!visible) return null;

  const isConfirm = type === 'confirm';

  return (
    <Dialog isVisible={visible} onBackdropPress={onClose}>
      {title ? <Dialog.Title title={title} /> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Dialog.Actions>
        {isConfirm ? (
          <>
            <Dialog.Button title={cancelText} onPress={onClose} />
            <Dialog.Button title={okText} onPress={onConfirm} />
          </>
        ) : (
          <Dialog.Button title={okText} onPress={onClose} />
        )}
      </Dialog.Actions>
    </Dialog>
  );
};

export default AppAlert;
