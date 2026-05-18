import type { CardType } from '../types';
import Card from './Card'

type Props = {
  items: CardType[];
};

export default function CardList({ items }: Props) {
  return (
    <ul>
      {items.map((item: CardType) => (
        <Card key={item.id} item={item} />
      ))}
    </ul>
  )
}