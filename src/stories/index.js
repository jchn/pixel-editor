import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from '../components/Button';
import Welcome from './Welcome';
import Icon from '../components/Icon'

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
  ));

storiesOf('Icon', module)
  .add('add', () => (
    <Icon type='add' />
  ))
