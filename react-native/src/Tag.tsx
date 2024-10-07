import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },
});

export default Tag;