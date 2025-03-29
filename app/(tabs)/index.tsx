import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text, Button, FlatList } from "react-native";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ManMannequin, TShirt, Pants } from "@/components/Mannequin";
import { THREE } from "expo-three";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";

export default function HomeScreen() {
  const [topColor, setTopColor] = useState("#00c0b0");
  const [bottomColor, setBottomColor] = useState("#00c0b0");
  const [modalVisible, setModalVisible] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState([]);

  useEffect(() => {
    const fetchSelectedOutfit = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const outfit = snapshot.data().selectedOutfit;
        if (outfit?.top?.color) setTopColor(outfit.top.color);
        if (outfit?.bottom?.color) setBottomColor(outfit.bottom.color);
      }
    };

    fetchSelectedOutfit();
  }, []);

  useEffect(() => {
    const fetchWardrobe = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const ref = collection(db, "users", user.uid, "wardrobe");
      const snapshot = await getDocs(ref);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWardrobeItems(items);
    };

    if (modalVisible) fetchWardrobe();
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      {/* Swap Outfit Button */}
      <View style={styles.swapButtons}>
        <TouchableOpacity style={styles.swapButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.swapButtonText}>Swap Outfit</Text>
        </TouchableOpacity>
      </View>

      {/* Canvas (Mannequin + Outfit) */}
      <Canvas camera={{ position: [0, 1, 3], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 4, 5]} intensity={1} />
        <FollowCameraLight />
        <group scale={[1.5, 1.5, 1.5]}>
          <TShirt color={topColor} />
          <Pants color={bottomColor} />
          <ManMannequin color="#ffffff" />
        </group>
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={10}
        />
      </Canvas>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Item</Text>
            <FlatList
              data={wardrobeItems}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemBox}
                  onPress={async () => {
                    const user = getAuth().currentUser;
                    if (!user) return;

                    const userRef = doc(db, "users", user.uid);
                    const field = item.type === "Shirt" ? "top" : "bottom";

                    await updateDoc(userRef, {
                      [`selectedOutfit.${field}`]: {
                        type: item.type,
                        size: item.size,
                        color: item.color,
                      },
                    });

                    if (field === "top") setTopColor(item.color);
                    else setBottomColor(item.color);

                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: item.color }}>{item.color}</Text>
                  <Text>{item.type}</Text>
                  <Text>{item.size}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function FollowCameraLight() {
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return <directionalLight ref={lightRef} intensity={3} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  swapButtons: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#111",
    zIndex: 1,
  },
  swapButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  swapButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  itemBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 5,
    width: "45%",
    alignItems: "center",
    borderRadius: 8,
  },
});
