import { Button, Icon, Layout, Text } from "@ui-kitten/components";

export const LandingScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LandingScreen</Text>
      <Button accessoryLeft={<Icon name="facebook" />}>Cerrar Sesin</Button>
    </Layout>
  );
};
