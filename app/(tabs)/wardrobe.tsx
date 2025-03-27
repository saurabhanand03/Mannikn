import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase'; 
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  TextInput, 
  Button,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ClothingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [clothingType, setClothingType] = useState('Shirt');
  const [size, setSize] = useState('S');
  const [color, setColor] = useState('');
  const [wardrobeItems, setWardrobeItems] = useState([]);

  // Subscribe to the wardrobe collection in Firestore (without ordering by createdAt)
  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;
    const wardrobeRef = collection(db, "users", user.uid, "wardrobe");
    const unsubscribe = onSnapshot(wardrobeRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWardrobeItems(items);
    });
    return unsubscribe;
  }, []);

  // Handle adding a new wardrobe item
  const handleSubmit = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error("User not logged in");
  
      const wardrobeRef = collection(db, "users", user.uid, "wardrobe");
      await addDoc(wardrobeRef, {
        type: clothingType,
        size: size,
        color: color,
      });
  
      console.log("Item added to wardrobe!");
    } catch (err) {
      console.error("Error adding item: ", err);
    }
  
    // Reset form and close modal
    setModalVisible(false);
    setClothingType('Shirt');
    setSize('S');
    setColor('');
  };

  return (
    <View style={styles.container}>
      {/* Wardrobe Cards */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {wardrobeItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardText}>Type: {item.type}</Text>
            <Text style={styles.cardText}>Size: {item.size}</Text>
            <Text style={styles.cardText}>Color: {item.color}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Plus Button */}
      <TouchableOpacity 
        style={styles.plusButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      {/* Modal Form */}
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
  cardContainer: {
    padding: 20,
    paddingBottom: 100, // extra padding for plus button
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
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
