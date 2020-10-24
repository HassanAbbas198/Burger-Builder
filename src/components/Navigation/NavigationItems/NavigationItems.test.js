import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it('Should render 2 navigation items if not authenticated', () => {
		wrapper.setProps({ isAuth: false });
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('Should render 3 navigation items if authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('Should render logout navigation item if authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(
			wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
		).toEqual(true);
	});
});
