
import type { CardType } from '../types';

type Props = {
  item: CardType;
};

const capitalize = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : '';

export default function Card({ item }: Props) {
  const { name, description } = item;
  return (
    <li>
      <h3>{capitalize(name)}</h3>
      <p>{description}</p>
    </li>
  )
}