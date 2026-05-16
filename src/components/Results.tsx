import CardList from "./CardList";
import type { CardType } from "../types";

type Props = {
  items: CardType[];
  isLoading: boolean;
  error: string;
}

export default function Results({ items, isLoading, error }: Props) {
  if (isLoading) {
    return (
      <section className="results">
        <span className="loader" role="status" aria-label="Loading"></span>
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="results">
        <p className="errorMessage">{error}</p>
      </section>
    )
  }

  return (
    <section className="results">
      <CardList items={items}></CardList>
    </section>
  )
}