import { CardDTO } from "./ICardDTO";

export interface CardResponse {
    success: boolean,
    cards: CardDTO[],
    deck_id: string,
    remaining: number
}