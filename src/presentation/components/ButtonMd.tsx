import { Pressable, Text, View } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
    label: string;
    onPress: () => void;
}

export const ButtonMd = ({ label, onPress }: Props) => {
    return (
        <View>
            <Pressable
                style={{ ...styles.button }}
                onPress={() => {
                    onPress && onPress();
                }}
                p="$5"
                bg="$pink400"
                $hover-bg="$pink600"
            >
                <Text style={styles.buttonText}>{label}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
});
