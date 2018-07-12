import React from 'react';
import { shallow } from 'enzyme';
import ChartWindow from '../../src/components/ChartWindow';

describe('<ChartWindow />', () => {
  let wrapper = shallow(<ChartWindow />);
  it('has className of chartWindow', () => {
    expect(wrapper.hasClass('chartWindow')).toEqual(true);
  });
});