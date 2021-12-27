import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import PageLayout from '../PageLayout';
import { Calendar, Dashboard, Profile, RecordCreate, RecordEdit } from '@router/Router';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => ({
    error: null,
  })),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

describe('PageLayout screen', () => {
  it('Should render Calendar component', () => {
    const component = shallow(<PageLayout component={Calendar} />, {
      suspenseFallback: true,
    });
    expect(component.find(Calendar)).toHaveLength(1);
  });

  it('Should render Dashboard component', () => {
    const component = shallow(<PageLayout component={Dashboard} />, {
      suspenseFallback: true,
    });
    expect(component.find(Dashboard)).toHaveLength(1);
  });

  it('Should render Profile component', () => {
    const component = shallow(<PageLayout component={Profile} />, {
      suspenseFallback: true,
    });
    expect(component.find(Profile)).toHaveLength(1);
  });

  it('Should render RecordCreate component', () => {
    const component = shallow(<PageLayout component={RecordCreate} />, {
      suspenseFallback: true,
    });
    expect(component.find(RecordCreate)).toHaveLength(1);
  });

  it('Should render RecordEdit component', () => {
    const component = shallow(<PageLayout component={RecordEdit} />, {
      suspenseFallback: true,
    });
    expect(component.find(RecordEdit)).toHaveLength(1);
  });
});
