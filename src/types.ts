import type {AndroidPermissionMap} from './permissions.android';
import type {IOSPermissionMap} from './permissions.ios';
import type {WebPermissionMap} from './permissions.web';
import type {WindowsPermissionMap} from './permissions.windows';
import {ResultMap} from './results';

type Values<T extends object> = T[keyof T];

export type {Rationale} from 'react-native';

export type AndroidPermission = Values<AndroidPermissionMap>;
export type IOSPermission = Values<IOSPermissionMap>;
export type WebPermission = Values<WebPermissionMap>;
export type WindowsPermission = Values<WindowsPermissionMap>;
export type Permission = AndroidPermission | IOSPermission | WindowsPermission | WebPermission;

export type PermissionStatus = Values<ResultMap>;

export type LocationAccuracyOptions = {
  purposeKey: string;
};

export type LocationAccuracy = 'full' | 'reduced';

export type NotificationOption =
  | 'alert'
  | 'badge'
  | 'sound'
  | 'carPlay'
  | 'criticalAlert'
  | 'provisional';

export type NotificationSettings = {
  alert?: boolean;
  badge?: boolean;
  sound?: boolean;
  carPlay?: boolean;
  criticalAlert?: boolean;
  provisional?: boolean;
  lockScreen?: boolean;
  notificationCenter?: boolean;
};

export type NotificationsResponse = {
  status: PermissionStatus;
  settings: NotificationSettings;
};
