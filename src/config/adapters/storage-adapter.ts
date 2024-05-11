import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      console.log("guardado en storage");
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Error setting item ${key} ${value}`);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
      throw new Error(`Error removin item ${key}`);
    }
  }
}
