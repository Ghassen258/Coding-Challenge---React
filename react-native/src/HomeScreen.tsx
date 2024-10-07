import React, { useEffect } from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "./store/inventory";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "./store";
import ProductItem from "./ProductItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default (props: any) => {  // Use 'any' for props to avoid StackParamList
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Inventory" />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={() => dispatch(actions.fetchInventory())}
          />
        }
      >
      <SafeAreaView edges={["left", "bottom", "right"]}>
        {inventory.map((record, index) => (
          <ProductItem
            key={index}
            name={record.fields["Product Code"]}
            date={record.fields.Posted}
            image={record.fields["Product Image"] || undefined}
            categories={record.fields["Product Categories"] ? record.fields["Product Categories"].split(",") : []}
          />
        ))}
      </SafeAreaView>
      </ScrollView>

      <SafeAreaView style={styles.fab}>
        <FAB
          icon={() => <MaterialCommunityIcons name="barcode" size={24} color="#0B5549" />}
          label="Scan Product"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
});
