import { Card } from "./interfaces/ICard";
import { CardDTO } from "./interfaces/ICardDTO";

export const mapCardDTOsToCards = (cardDTOs: CardDTO[]): Card[] => {
    const cardsToReturn: Card[] = [];
    cardDTOs.forEach((cardDTO: CardDTO) => {
        let numberAsString = cardDTO.code.slice(0, 1);
        switch (numberAsString) {
            case "0":
                numberAsString = "10"
                break;
            case "A":
                numberAsString = "1"
                break;
            case "J":
                numberAsString = "11"
                break;
            case "Q":
                numberAsString = "12"
                break;
            case "K":
                numberAsString = "13"
                break;
            default:
                break;
        }
        const numberAsNumber: number = parseInt(numberAsString);
        const newCard: Card = {
            image: cardDTO.image,
            value: cardDTO.value,
            suit: cardDTO.suit,
            code: cardDTO.code,
            number: numberAsNumber
        }
        cardsToReturn.push(newCard);
    })
    return cardsToReturn;
}

export const sortByCardNumber = (a: Card, b: Card): number => {
    return a.number > b.number ? 1 : -1;
}
