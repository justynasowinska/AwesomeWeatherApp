import { memo } from 'react';

import { Avatar, AvatarImageProps } from 'react-native-paper';

import { getWeatherIconUrl } from 'utils/openWeatherHelpers';

interface WeatherIconProps extends Omit<AvatarImageProps, 'source'> {
  icon: string;
}

const WeatherIcon = ({ icon, ...props }: WeatherIconProps) => {
  const iconUrl = getWeatherIconUrl(icon);

  return (
    <Avatar.Image
      source={{
        uri: iconUrl,
      }}
      {...props}
    />
  );
};

export default memo(WeatherIcon);
