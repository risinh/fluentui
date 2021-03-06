import * as React from 'react';
import { mount } from 'enzyme';
import { default as createSvgIcon } from './createSvgIcon';

const testSvg = () => <svg />;

describe('createSvgIcon', () => {
  it('returns a valid React component', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });
    expect(React.isValidElement(<TestIcon />)).toEqual(true);
  });

  it('sets displayName to the created Component', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });
    expect(TestIcon.displayName).toEqual('TestIcon');
  });

  it('spreads unhandled props on the root element', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });

    const wrapper = mount(<TestIcon id="test-id" />);
    expect(wrapper.find('span').props().id).toEqual('test-id');
  });

  it('provides all props on the svg function', () => {
    interface IBookProps {
      foo: boolean;
    }

    const BookIcon = createSvgIcon<IBookProps>({
      svg: ({ props }) => <svg data-foo={props.foo.toString()} />,
      displayName: 'BookIcon',
    });

    const wrapper = mount(<BookIcon foo />);

    expect(wrapper.find('svg').prop('data-foo')).toEqual('true');
  });
});
