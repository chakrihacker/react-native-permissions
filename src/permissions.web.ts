import type {IOSPermissionMap} from './permissions.ios';
import {AndroidPermissionMap} from './permissions.android';
import type {WindowsPermissionMap} from './permissions.windows';

const WEB = Object.freeze({
  LOCATION: 'web.permission.LOCATION',
} as const);

export type WebPermissionMap = typeof WEB;

export const PERMISSIONS = Object.freeze({
  ANDROID: {} as AndroidPermissionMap,
  IOS: {} as IOSPermissionMap,
  WEB: {} as WebPermissionMap,
  WINDOWS: {} as WindowsPermissionMap,
} as const);
