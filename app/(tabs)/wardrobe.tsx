import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  TextInput, 
  Button 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ClothingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [clothingType, setClothingType] = useState('Shirt');
  const [size, setSize] = useState('S');
  const [color, setColor] = useState('');

  const handleSubmit = () => {
    // Process the form data as needed
    console.log('Clothing Type:', clothingType);
    console.log('Size:', size);
    console.log('Color:', color);
    // Close the modal
    setModalVisible(false);
    // Optionally reset the form
    setClothingType('Shirt');
    setSize('S');
    setColor('');
  };

  return (
    <View style={styles.container}>
      {/* Plus button */}
      <TouchableOpacity 
        style={styles.plusButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      {/* Modal form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Clothing Item</Text>
            
            {/* Clothing Type Dropdown */}
            <Text style={styles.label}>Clothing Type</Text>
            <Picker
              selectedValue={clothingType}
              style={styles.picker}
              onValueChange={(itemValue) => setClothingType(itemValue)}
            >
              <Picker.Item label="Shirt" value="Shirt" />
              <Picker.Item label="Pant" value="Pant" />
              <Picker.Item label="Jacket" value="Jacket" />
              <Picker.Item label="Skirt" value="Skirt" />
            </Picker>
            
            {/* Size Dropdown */}
            <Text style={styles.label}>Size</Text>
            <Picker
              selectedValue={size}
              style={styles.picker}
              onValueChange={(itemValue) => setSize(itemValue)}
            >
              <Picker.Item label="S" value="S" />
              <Picker.Item label="M" value="M" />
              <Picker.Item label="L" value="L" />
              <Picker.Item label="XL" value="XL" />
            </Picker>

            {/* Color Input */}
            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter color"
              value={color}
              onChangeText={setColor}
            />

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  plusText: {
    fontSize: 36,
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 5,
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
