import type {Contract} from './contract';
import {RESULTS} from './results';
import type {NotificationsResponse, Permission, PermissionStatus} from './types';
import {
  checkLocationAccuracy,
  openLimitedPhotoLibraryPicker,
  requestLocationAccuracy,
} from './unsupportedPlatformMethods';

async function getPermissionWithQueryAsync(name: PermissionName): Promise<PermissionStatus> {
  if (!navigator || !navigator.permissions || !navigator.permissions.query)
    return RESULTS.UNAVAILABLE;

  const {state} = await navigator.permissions.query({name});
  if (state === 'prompt') {
    return RESULTS.DENIED;
  } else if (state === 'granted') {
    return RESULTS.GRANTED;
  } else if (state === 'denied') {
    return RESULTS.BLOCKED;
  }
  return RESULTS.UNAVAILABLE;
}

async function checkPermissionAsync(permission: Permission): Promise<PermissionStatus> {
  switch (permission) {
    case 'web.permission.LOCATION':
      const maybeStatus = await getPermissionWithQueryAsync('geolocation');
      return maybeStatus;

    default:
      break;
  }
  return RESULTS.UNAVAILABLE;
}

async function check(permission: Permission): Promise<PermissionStatus> {
  return await checkPermissionAsync(permission);
}

async function checkNotifications(): Promise<NotificationsResponse> {
  return {status: RESULTS.UNAVAILABLE, settings: {}};
}

async function checkMultiple<P extends Permission[]>(
  permissions: P,
): Promise<Record<P[number], PermissionStatus>> {
  return permissions.reduce((acc, permission: P[number]) => {
    acc[permission] = RESULTS.UNAVAILABLE;
    return acc;
  }, {} as Record<P[number], PermissionStatus>);
}

export const methods: Contract = {
  check,
  checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openLimitedPhotoLibraryPicker,
  openSettings: Promise.reject,
  request: check,
  requestLocationAccuracy,
  requestMultiple: checkMultiple,
  requestNotifications: checkNotifications,
};
