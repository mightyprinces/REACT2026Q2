import { Component, type ReactNode } from 'react';
import type { CardType } from '../../types';
import Card from './Card/Card'

type Props = {
  items: CardType[];
}

export default class CardList extends Component<Props> {
  render(): ReactNode {
    return (
      <ul>
        {this.props.items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    )
  }
}