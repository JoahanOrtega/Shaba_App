import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { PropsWithChildren, useEffect } from "react";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";

export const AuthProviders = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { checkStatus, status, user } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    console.log("(AuthProvider) status is: " + status);
    if (status !== "checking") {
      if (status === "authenticated") {
        if (user?.id !== undefined && user.id === 26) {
          navigation.reset({
            index: 0,
            // Cambiar la ruta inicial para que hagas tus cambios
            routes: [{ name: "LandingScreenAdmin" }],
          });
        } else {
          navigation.reset({
            index: 0,
            // Cambiar la ruta inicial para que hagas tus cambios
            routes: [{ name: "LandingScreen" }],
          });
        }
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
