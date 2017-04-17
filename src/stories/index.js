import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from '../components/Button';
import Welcome from './Welcome';
import Icon from '../components/Icon'
import PointableGrid from '../components/PointableGrid'
import Menu from '../components/Menu'
import SequenceList from '../components/SequenceList'
import Canvas from '../components/Canvas'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some icon', () => (
    <Button onClick={action('clicked')}><Icon type='add' color='white' /></Button>
  ))
  .add('active', () => (
    <Button active onClick={action('clicked')}><Icon type='add' color='white' /></Button>
  ));

storiesOf('Icon', module)
  .add('add', () => (
    <Icon type='add' />
  ))
  .add('eye', () => (
    <Icon type='eye' />
  ))

storiesOf('PixelGrid', module)
  .add('grid', () => (
    <PointableGrid
      width={16}
      height={16}
      scale={32}
      onPointerMove={action('onPointerMove')}
      onPointerDown={action('onPointerDown')}
      onPointerUp={action('onPointerUp')}
    >
      <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>

      </div>
    </PointableGrid>
  ))

storiesOf('Menu', module)
  .add('default', () => (
    <Menu>
      <Menu.Item>test</Menu.Item>

      <Menu.SubMenu title='sub menu'>
        <Menu.Item>test</Menu.Item>
        <Menu.Item>test</Menu.Item>
        <Menu.Item>test</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ))

  storiesOf('SequenceList', module)
    .add('default', () => (
      <SequenceList>
        <SequenceList.Item selected>
          <Canvas width={16} height={16} scale={8} pixels={Array.from({ length: 16 * 16 })} />
        </SequenceList.Item>
        <SequenceList.Item>
          <Canvas width={16} height={16} scale={8} pixels={Array.from({ length: 16 * 16 })} />
        </SequenceList.Item>
        <SequenceList.Item>
          <Canvas width={16} height={16} scale={8} pixels={Array.from({ length: 16 * 16 })} />
        </SequenceList.Item>
        <SequenceList.Item>
          <Canvas width={16} height={16} scale={8} pixels={Array.from({ length: 16 * 16 })} />
        </SequenceList.Item>
      </SequenceList>
    ))
