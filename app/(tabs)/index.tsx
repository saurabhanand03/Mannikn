import React, { useRef, useState, useEffect } from "react";
import { 
  View, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Text, 
  Button, 
  FlatList, 
  Image 
} from "react-native";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ManMannequin, TShirt, Pants } from "@/components/Mannequin";
import { THREE } from "expo-three";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc, collection, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function HomeScreen() {
  const [topColor, setTopColor] = useState("#00c0b0");
  const [bottomColor, setBottomColor] = useState("#00c0b0");
  const [modalVisible, setModalVisible] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState("male");


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

  
  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;
  
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        setGender(userData.gender);
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingSpinner />}
      {/* Swap Outfit Button */}
      <TouchableOpacity 
        style={styles.swapButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.swapButtonText}>Swap Outfit</Text>
      </TouchableOpacity>

      {/* Canvas */}
      <Canvas camera={{ position: [0, 1, 3], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 4, 5]} intensity={1} />
        <FollowCameraLight />
        <Suspense fallback={null}>
          <group scale={[1.5, 1.5, 1.5]}>
            <TShirt 
              color={topColor} 
              onLoadStart={() => setIsLoading(true)} 
              onLoadEnd={() => setIsLoading(false)} 
            />
            <Pants 
              color={bottomColor} 
              onLoadStart={() => setIsLoading(true)} 
              onLoadEnd={() => setIsLoading(false)} 
            />
            <ManMannequin
              gender={gender === "male" || gender === "female" ? gender : undefined}
              color="#fff" 
              onLoadStart={() => setIsLoading(true)} 
              onLoadEnd={() => setIsLoading(false)} 
            />

          </group>
        </Suspense>
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
              contentContainerStyle={styles.cardContainer}
              renderItem={({ item }) => {
                let iconSource;
                if (item.type === "Shirt") {
                  iconSource = require("../../assets/icons/black_shirt_icon.png");
                } else if (item.type === "Pant") {
                  iconSource = require("../../assets/icons/black_pants_icon.png");
                } else {
                  return null;
                }
                return (
                  <TouchableOpacity
                    style={styles.card}
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
                    <Image
                      source={iconSource}
                      style={[styles.icon, { tintColor: item.color.toLowerCase() }]}
                      resizeMode="contain"
                    />
                    <Text style={styles.cardText}>
                      {item.type} ({item.size})
                    </Text>
                  </TouchableOpacity>
                );
              }}
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
  swapButton: {
    position: "absolute",
    top: 150,
    right: 150,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 10,
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
  cardContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    margin: 5,
    alignItems: "center",
    elevation: 3,
    width: "45%",
  },
  cardText: {
    fontSize: 16,
    marginTop: 8,
  },
  icon: {
    width: 80,
    height: 80,
  },
});
