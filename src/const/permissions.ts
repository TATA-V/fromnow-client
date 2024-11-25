import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

export const androidPermission = {
  CAMERA: PERMISSIONS.ANDROID.CAMERA,
  READ_STORAGE: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  WRITE_STORAGE: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  VIDEO: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
  // @ts-ignore
  NOTIFICATIONS: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
};

export const iosPermission = {
  CAMERA: PERMISSIONS.IOS.CAMERA,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
  MEDIA: PERMISSIONS.IOS.MEDIA_LIBRARY,
  REMINDERS: PERMISSIONS.IOS.REMINDERS,
  STOREKIT: PERMISSIONS.IOS.STOREKIT,
};

export const allPermissions = Platform.select({
  ios: [iosPermission.CAMERA, iosPermission.PHOTO, iosPermission.MEDIA, iosPermission.REMINDERS, iosPermission.STOREKIT],
  android: [
    androidPermission.CAMERA,
    androidPermission.READ_STORAGE,
    androidPermission.WRITE_STORAGE,
    androidPermission.PHOTO,
    androidPermission.VIDEO,
    androidPermission.NOTIFICATIONS,
  ],
});
