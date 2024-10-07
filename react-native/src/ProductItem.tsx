import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, isWithinInterval, subDays } from "date-fns";
import Tag from "./Tag";

interface ProductItemProps {
  name: string;
  date: string;
  image?: string;
  categories: string[];
}

const ProductItem: React.FC<ProductItemProps> = ({ name, date, image, categories }) => {
  const [expanded, setExpanded] = useState(false);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const handleExpand = () => {
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setExpanded(!expanded);
  };

  const isNew = isWithinInterval(new Date(date), {
    start: subDays(new Date(), 7),
    end: new Date(),
  });

  return (
    <TouchableOpacity onPress={handleExpand} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <MaterialCommunityIcons name="image-off" size={24} color="gray" />
          )}
        </View>

        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <Text style={styles.date}>
            {format(new Date(date), "MMM dd, yyyy")}
            {isNew && <MaterialCommunityIcons name="star" size={16} color="gold" />}
          </Text>
        </View>

        <MaterialCommunityIcons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="gray"
        />
      </View>

      {expanded && (
        <View style={styles.extraDetails}>
          <View style={styles.tags}>
            {categories.map((category, index) => (
              <Tag key={index} text={category} />
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  extraDetails: {
    paddingTop: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ProductItem;
