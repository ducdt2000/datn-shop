import { SettingsInput } from '@ts-types/generated';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useSettings } from '@contexts/settings.context';
import { useTranslation } from 'next-i18next';
import json from './settings.json';

export interface ISettingsUpdateVariables {
  variables: { input: SettingsInput };
}

export const useUpdateSettingsMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { updateSettings } = useSettings();

  return useMutation(
    ({ variables: { input } }: ISettingsUpdateVariables) =>
      // Settings.create(API_ENDPOINTS.SETTINGS, input),
      Promise.resolve({ data: json }),
    {
      onSuccess: ({ data }) => {
        updateSettings(data?.options);
        toast.success(t('common:successfully-updated'));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS);
      },
    }
  );
};
