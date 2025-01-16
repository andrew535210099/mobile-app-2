import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import router from expo-router

export default function Index() {
  const router = useRouter(); // Hook for navigation

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Image on the left */}
        <Image 
          source={require('../assets/images/library.png')} 
          style={styles.image} 
        />

        {/* Text on the right */}
        <View style={styles.textContainer}>
          <Text style={styles.bigText}>Library</Text>
          <Text style={styles.smallText}>For Your Needs</Text>
        </View>
      </View>

      {/* Navigation Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/login')}
          accessibilityLabel="Go to login page"
        >
          <Text style={styles.buttonText}>Go to Login Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0", // Add background color for the page
  },
  rowContainer: {
    flexDirection: "row", // Horizontal layout (image on the left, text on the right)
    alignItems: "center",
    marginBottom: 30, // Space between image-text and button
  },
  image: {
    width: 180, // Image width
    height: 180, // Image height
    resizeMode: "contain", // Ensure image doesn't get distorted
    marginRight: 20, // Space between image and text
  },
  textContainer: {
    justifyContent: "center",
  },
  bigText: {
    fontSize: 48, // Larger font for the main title
    fontWeight: "bold",
    color: "#333", // Dark text for better contrast
  },
  smallText: {
    fontSize: 28, // Slightly smaller font for the subtitle
    color: "gray", // Subtitle text color
  },
  buttonContainer: {
    marginTop: 30, // Space between the text and button
    width: "80%", // Reduced width to avoid button being too wide
  },
  button: {
    backgroundColor: "#6200EE", // Button background color
    paddingVertical: 12, // Padding for button height
    paddingHorizontal: 25, // Padding for button width
    borderRadius: 30, // Rounded corners
    alignItems: "center", // Center the text inside the button
    justifyContent: "center",
    elevation: 3, // Add a shadow effect
    width: "100%", // Ensure button width matches the container
  },
  buttonText: {
    fontSize: 16, // Smaller font size for button text
    color: "#fff", // White text color for contrast
    fontWeight: "500",
  },
});
