// Higher Order Comoponent (HOC)
// La verdad no entendi para que era pero basicamente es un componente que recibe
// componentes como hijos
import { Divider, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;
    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: "100%" }}>{children}</Layout>
    </Layout>
  );
};
