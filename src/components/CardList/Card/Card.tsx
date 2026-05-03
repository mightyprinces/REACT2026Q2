
import { Component, type ReactNode } from 'react';
import type { CardType } from '../../../types';

type Props = {
  item: CardType;
}

const capitalize = (value: string) => 
  value ? value.charAt(0).toUpperCase() + value.slice(1) : '';

export default class Card extends Component<Props> {
  render(): ReactNode {
    const { name, description } = this.props.item;

    return (
      <li>
        <h3>{capitalize(name)}</h3>
        <p>{description}</p>
      </li>
    )
  }
}