import { render, screen } from '@testing-library/react-native';

import { searchCitiesMockResponse } from '__mocks__/searchCitiesMockResponse';

import { Status } from 'hooks/useSearchCities';
import { SearchResults } from 'screens/Home/components/Search';

describe('SearchResults', () => {
  it('renders loading state', () => {
    render(
      <SearchResults
        data={[]}
        status={Status.FETCHING}
        error={null}
        onCitySelect={jest.fn()}
      />,
    );

    expect(screen.getByText('Loading...')).toBeOnTheScreen();
  });

  it('renders error state', () => {
    render(
      <SearchResults
        data={[]}
        status={Status.ERROR}
        error="Something went wrong"
        onCitySelect={jest.fn()}
      />,
    );

    expect(screen.getByText('Error: Something went wrong')).toBeOnTheScreen();
  });

  it('renders no results message', () => {
    render(
      <SearchResults
        data={[]}
        status={Status.SUCCESS}
        error={null}
        onCitySelect={jest.fn()}
      />,
    );

    expect(
      screen.getByText(
        'No results yet. Keep typing or try something different.',
      ),
    ).toBeOnTheScreen();
  });

  it('renders list of results', () => {
    render(
      <SearchResults
        data={searchCitiesMockResponse.list}
        status={Status.SUCCESS}
        error={null}
        onCitySelect={jest.fn()}
      />,
    );

    expect(screen.getByText('New York, US')).toBeOnTheScreen();
    expect(screen.getByText('Los Angeles, US')).toBeOnTheScreen();
    expect(screen.getByText('Chicago, US')).toBeOnTheScreen();
    expect(screen.getByText('Houston, US')).toBeOnTheScreen();
    expect(screen.getByText('London, UK')).toBeOnTheScreen();
  });
});
