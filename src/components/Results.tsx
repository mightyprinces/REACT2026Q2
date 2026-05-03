import { Component, type ReactNode } from "react";
import CardList from "./CardList/CardList";
import type { CardType } from "../types";

type Props = {
  items: CardType[];
  isLoading: boolean;
  error: string;
}

export default class Results extends Component<Props> {
  render(): ReactNode {
    const {items, isLoading, error} = this.props;

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
          <p>{error}</p>
        </section>
      )
    }

    return (
      <section className="results">
        <CardList items={items}></CardList>
      </section>
    )
  }
}