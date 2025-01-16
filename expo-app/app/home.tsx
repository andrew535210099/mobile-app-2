import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  EditItem: { id: string };
  index: undefined; // Pastikan ada route ke Login
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Item = {
  id: string;
  name: string;
  details: string;
  category: string;
  author: string;
  publicationDate: string;
  imageUrl: string;
};

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchUserId = async () => {
      const currentUserId = await AsyncStorage.getItem("currentUserId");
      setUserId(currentUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      if (userId) {
        const storedItems = await AsyncStorage.getItem(`libraryItems_${userId}`);
        if (storedItems) {
          const items = JSON.parse(storedItems);
          setItems(items);
          setFilteredItems(items); // Initialize with all items
        }
      }
    };

    fetchItems();
  }, [userId]);

  const filterItems = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = items.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(lowercasedQuery)) ||
        (item.details && item.details.toLowerCase().includes(lowercasedQuery)) ||
        (item.category && item.category.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredItems(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    filterItems(query);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDetails}>{item.details}</Text>
        <Text style={styles.cardMeta}>Category: {item.category}</Text>
        <Text style={styles.cardMeta}>Author: {item.author}</Text>
        <Text style={styles.cardMeta}>Published on: {item.publicationDate}</Text>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <Text>No image available</Text>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => navigation.navigate("EditItem", { id: item.id })}
          style={styles.editButton}
        >
          Edit
        </Button>
      </Card.Actions>
    </Card>
  );

  const handleAddNewItem = () => {
    if (userId) {
      navigation.navigate("EditItem", { id: "new" });
    } else {
      console.error("Cannot add item: userId is null.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUserId");
    navigation.navigate("index"); // Redirect ke halaman Login
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder="Search for items..."
        style={styles.searchInput}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
      />
      <Button mode="contained" onPress={handleAddNewItem} style={styles.addButton}>
        Add New Item
      </Button>
      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5", // Lighter background for library feel
  },
  flatList: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50", // Darker text for better contrast
  },
  cardDetails: {
    fontSize: 16,
    color: "#34495e", // Subtle gray for readability
    marginVertical: 10,
  },
  cardMeta: {
    fontSize: 14,
    color: "#7f8c8d", // Lighter gray for metadata
    marginVertical: 4,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#2980b9", // Subtle blue button
    color: "#fff",
    borderRadius: 5,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#27ae60", // Green for add button
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c", // Red for logout button
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchInput: {
    height: 45,
    borderColor: "#bdc3c7", // Light border color
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff", // White background for the input
  },
});
