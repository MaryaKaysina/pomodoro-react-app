/**
 * @jest-environment jsdom
 */

import React from "react";
import { shallow } from "enzyme";
import { Dropdown } from "../Dropdown";

describe('Dropdown component', () => {
  test('Should render', () => {
    // const wrapper = shallow(<Dropdown children={<div />} button={<button />}/>);
    // expect(wrapper).toBeDefined();
    // console.log(wrapper.find('div.container').debug());
    // console.log(window);

    // expect(wrapper.find('div.container').isEmptyRender()).toBeFalsy();
  });

  // Аналог теста выше через snapshot-тестирование
  test('Should render (snapshot)', () => {
    // const wrapper = shallow(<Dropdown children={<div />} button={<button />}/>);
    // expect(wrapper).toMatchSnapshot();
  })
});
