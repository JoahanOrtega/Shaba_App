import { Layout, Spinner } from "@ui-kitten/components";
import React from "react";

export const LoagindScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner status="primary" size="large" />
    </Layout>
  );
};
