import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function HomeScreen() {
    // Explicitly type the state to allow null or the actual Three.js objects
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const [camera, setCamera] = useState<THREE.Camera | null>(null);

    useEffect(() => {
        // 1. Create a basic Three.js scene
        const _scene = new THREE.Scene();

        // 2. Add a simple ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        _scene.add(ambientLight);

        // 3. Create a PerspectiveCamera
        const aspect =
            Dimensions.get('window').width / Dimensions.get('window').height;
        const _camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        _camera.position.z = 2;

        setScene(_scene);
        setCamera(_camera);
    }, []);

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        if (!scene || !camera) return;

        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        // 4. Load mannequin model (replace with your actual .glb file or local asset)
        const loader = new GLTFLoader();
        loader.load(
            'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
            (gltf) => {
                const mannequin = gltf.scene;
                mannequin.scale.set(1, 1, 1);
                mannequin.position.set(0, -1, 0);
                scene.add(mannequin);

                // Once mannequin is loaded, load the shirt
                loader.load(
                    '@/assets/images/WhiteT.glb',
                    (shirtGltf) => {
                        const shirt = shirtGltf.scene;
                        shirt.scale.set(1, 1, 1);
                        shirt.position.set(0, 0, 0);

                        // Option 1: Add shirt to the scene directly
                        // scene.add(shirt);

                        // Option 2: Make the shirt a child of the mannequin
                        // so it moves/rotates with the mannequin
                        mannequin.add(shirt);
                    },
                    undefined,
                    (error) => console.error('Error loading shirt:', error)
                );
            },
            undefined,
            (error) => {
                console.error('Error loading mannequin:', error);
            }
        );
        // 5. Create an animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        animate();
    };

    return (
        <View style={styles.container}>
            <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // or any color you prefer
    },
});
