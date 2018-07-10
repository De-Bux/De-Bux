import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '../../src/components/Toggle';

describe('<Toggle />', () => {
  let wrapper = shallow(<Toggle />);
  it('has className of toggle', () => {
    expect(wrapper.hasClass('toggle')).toEqual(true);
  });
});