import React, {FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {DeleteModalProps} from '../../types';

const DeleteAccountModal: FC<DeleteModalProps> = ({
  visible,
  onClose,
  onDelete,
  password,
  setPassword,
  error,
  isLoading,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Confirm Account Deletion</Text>
          <Text style={styles.promptText}>
            Please enter your password to confirm account deletion:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={{color: 'red', marginVertical: 5}}>{error}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              {isLoading ? (
                <ActivityIndicator animating size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  promptText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,

    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#DDD',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6961',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default DeleteAccountModal;
