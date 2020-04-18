import { Card } from "./interfaces/ICard";
import { CardDTO } from "./interfaces/ICardDTO";

export const mapCardDTOsToCards = (cardDTOs: CardDTO[]): Card[] => {
    const cardsToReturn: Card[] = [];
    // const faceCards: string[] = ["A", "J", "Q", "K"];

    cardDTOs.forEach((cardDTO: CardDTO) => {
        let numberAsString = cardDTO.code.slice(0, 1);
        // if (faceCards.includes(numberAsString)){
        //     numberAsString = "10";
        // }
        if (numberAsString === "0"){
            numberAsString = "10"
        } else if (numberAsString === "A"){
            numberAsString = "1"
        } else if(numberAsString === "J"){
            numberAsString = "11"
        } else if(numberAsString === "Q"){
            numberAsString = "12"
        } else if(numberAsString === "K"){
            numberAsString = "13"
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

