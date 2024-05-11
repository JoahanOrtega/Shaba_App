import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { PropsWithChildren, useEffect } from "react";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";

export const AuthProviders = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    console.log("Aca esta el estado del status " + status);
    if (status !== "checking") {
      if (status === "authenticated") {
        navigation.reset({
          index: 0,
          routes: [{ name: "LandingScreen" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      }
    }
  }, [status]);

  return <>{children}</>;
};
