import { useNetInfo } from '@react-native-community/netinfo';
import { render, screen } from '@testing-library/react-native';

import { OfflineBanner } from 'components/OfflineBanner';

const mockedUseNetInfo = useNetInfo as jest.Mock;

describe('OfflineBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isConnected is true', () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: true });

    render(<OfflineBanner />);
    expect(screen.queryByText('You are offline')).toBeNull();
  });

  it('does not render when isConnected is null', () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: null });

    render(<OfflineBanner />);
    expect(screen.queryByText('You are offline')).toBeNull();
  });

  it('renders when isConnected is false', () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: false });

    render(<OfflineBanner />);

    expect(screen.getByText('You are offline')).toBeOnTheScreen();
  });
});
