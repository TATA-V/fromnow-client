import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key: string, value: string) => {
  if (!key || !value) return;
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export const getStorage = async (key: string) => {
  if (!key) return;
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {}
};

export const removeStorage = async (key: string) => {
  if (!key) return;
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};

export const removeStorageAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};
