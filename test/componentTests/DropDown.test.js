import React from 'react';
import { shallow } from 'enzyme';
import DropDown from '../../src/components/DropDown';

describe('<DropDown />', () => {
  let wrapper = shallow(<DropDown />);
  it('has className of dropdown', () => {
    expect(wrapper.hasClass('dropdown')).toEqual(true);
  });

  it('displays "text: Tree Chart" as the first option in dropdown', () => {
    expect(wrapper.find('p').first().text()).toEqual('Tree Chart');
  });

  it('displays "text: Raw Data" as the second option in dropdown', () => {
    expect(wrapper.find('p').last().text()).toEqual('Raw Data');
  });
});