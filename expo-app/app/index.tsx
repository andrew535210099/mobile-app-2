import { Text, View, StyleSheet, Image} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
          <Image source={require('../assets/images/library.png')} /> 

            <View style={styles.header}>
                <Text style={styles.bigText}>Library</Text>
                <Text style={styles.smallText}> For Your Needs </Text>
            </View>
            <View style={styles.buttonContainer}>
            </View> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      alignSelf: 'center',
  },

  buttonContainer: {
      alignItems: 'center',
  },

  header: {
      alignSelf: 'center',
      justifyContent: "flex-start",
      alignItems: 'center',
      top: 0
  },

  bigText: {
    fontSize: 50
  },

  smallText: {
    fontSize: 20
  }


});