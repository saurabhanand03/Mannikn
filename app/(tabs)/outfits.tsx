import { StyleSheet, Image, View, FlatList, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

const outfits = [
    { id: '1', name: 'Outfit 1' },
    { id: '2', name: 'Outfit 2' },
    { id: '3', name: 'Outfit 3' },
    { id: '4', name: 'Outfit 4' },
    { id: '5', name: 'Outfit 5' },
    { id: '6', name: 'Outfit 6' },
];

const screenWidth = Dimensions.get('window').width;

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedText style={styles.headerText}>Saved Outfits</ThemedText>
            }>
            <FlatList
                data={outfits}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={require('@/assets/images/shirt.png')}
                            style={styles.image}
                        />
                        <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
                    </View>
                )}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: 50,
    },
    gridContainer: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    card: {
        width: (screenWidth / 2) - 16, // Adjust width for 2 cards per row with padding
        margin: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 100, // Adjusted for better aspect ratio
        resizeMode: 'cover',
    },
    cardTitle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
});