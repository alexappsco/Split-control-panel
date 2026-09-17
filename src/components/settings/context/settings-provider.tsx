'use client';

import isEqual from 'lodash/isEqual';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from 'src/hooks/use-local-storage';

import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (state.themeDirection !== defaultSettings.themeDirection) {
      update('themeDirection', defaultSettings.themeDirection);
    }
  }, [defaultSettings.themeDirection, state.themeDirection, update]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      themeDirection: defaultSettings.themeDirection,
      onUpdate: update,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [reset, update, state, defaultSettings.themeDirection, canReset, openDrawer, onCloseDrawer, onToggleDrawer]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
