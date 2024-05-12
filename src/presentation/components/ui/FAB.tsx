import { Button, Layout } from "@ui-kitten/components";
import React from "react";
import { MyIcon } from "./MyIcon";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({ style, iconName, onPress }: Props) => {
  return (
    <Layout>
      <Button
        style={[
          {
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 15,
            borderRadius: 13,
          },
          style,
        ]}
        accessoryLeft={<MyIcon name={iconName} white />}
        onPress={onPress}
      />
    </Layout>
  );
};
