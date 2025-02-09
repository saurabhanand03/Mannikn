import { StyleSheet, Image, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/profile.png')} // Replace with your image
                    style={styles.profileImage}
                />
            }>
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={styles.name}>
                    John Doe
                </ThemedText>
                <ThemedText type="subtitle" style={styles.bio}>
                    Passionate software developer, coffee enthusiast, and avid traveler.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.detailsSection}>
                <View style={styles.detailItem}>
                    <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
                        Email
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>johndoe@example.com</ThemedText>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailItem}>
                    <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
                        Phone
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>+123 456 7890</ThemedText>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailItem}>
                    <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
                        Location
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>San Francisco, CA</ThemedText>
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    container: {
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
    },
    name: {
        marginTop: 16,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    bio: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    detailsSection: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    detailLabel: {
        fontSize: 16,
        color: '#555',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
});
