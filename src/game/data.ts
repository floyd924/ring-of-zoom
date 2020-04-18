import { Rule } from "./interfaces/IRule";

export const getDefaultRules = (): Rule[] => {
    const defaultRules: Rule[] = [
        {
            id: 1,
            name: "Digital Waterfall",
            description: "Start drinking at the same time. Drink until the person in the top/left of your screen stops."
        },
        {
            id: 2,
            name: "You",
            description: "Give one drink"
        },
        {
            id: 3,
            name: "Me",
            description: "Take one drink"
        },
        {
            id: 4,
            name: "Whores",
            description: "Ladies drink"
        },
        {
            id: 5,
            name: "Never have I ever",
            description: "1 life only"
        },
        {
            id: 6,
            name: "Dicks",
            description: "Gents drink"
        },
        {
            id: 7,
            name: "Heaven",
            description: "Make sure your camera is on. At a time of your choosing, point your finger upwards very clearly. Last person to copy you must drink"
        },
        {
            id: 8,
            name: "Rave",
            description: "Everyone must get the tunes on and rave for 20 seconds"
        },
        {
            id: 9,
            name: "Rhyme",
            description: "Players must rhyme with a word of your choosing"
        },
        {
            id: 10,
            name: "Categories",
            description: "Players must list an item in your category"
        },
        {
            id: 11,
            name: "Mystery tipple",
            description: "Show us your alcohol stash. We'll pick something for you to shot/drink"
        },
        {
            id: 12,
            name: "Above us all",
            description: "Take 2 drinks while standing on an item of furniture (make sure we can see)"
        },
        {
            id: 13,
            name: "Shots for one, shots for all",
            description: "Flip a coin. If heads, take a shot. If tails, everyone else take a shot"
        },
    ];
    return defaultRules;
}

export const getAllRules = (): Rule[] => {
    const nonDefaultRules: Rule[] = [
        {
            id: 14,
            name: "Toast a friend",
            description: "Share a memory you have of one member of the group. You both drink. If you cannot share a memory, take 4 drinks"
        },
        {
            id: 15,
            name: "Mate (1 way)",
            description: "Pick a mate. They must drink whenever you drink"
        },
        {
            id: 16,
            name: "Mate (both ways)",
            description: "Pick a mate. You must drink when they drink, and vice versa"
        },
        {
            id: 17,
            name: "Bath of shame",
            description: "This player is banished to their bath or shower until the next time this card is drawn"
        },
        // {
        //     id: 18,
        //     name: "Shots for one",
        //     description: "This player takes a shot"
        // },
        // {
        //     id: 19,
        //     name: "Shots for all",
        //     description: "All players must do a shot"
        // },
        // {
        //     name: "Shots for one, shots for all",
        //     description: "Flip a coin. If heads, take a shot. If tails, everyone else take a shot"
        // },



        // FOR SOME ANNOYING FUCKING REASON
        // the IDs need to be in order
        // otherwise it's not sving to the drop down properly
        {
            id: 18,
            name: "50/50",
            description: "Flip a coin. If heads, you must drink helf the value of the next card (rounded up, all face cards count as 10). If tails, do nothing"
        },
        {
            id: 19,
            name: "It was fuckin one of yous",
            description: "Pick another player. Flip a coin. If heads, you must take 3 drinks. If tails, they must instead"
        },
        // {
        //     name: "Above us all",
        //     description: "Take 2 drinks while standing on an item of furniture (make sure we can see)"
        // },
        // {
        //     name: "Mystery tipple",
        //     description: "Show us your alcohol stash. We'll pick something for you to shot/drink"
        // }
    ]
    const allRules = [...getDefaultRules(), ...nonDefaultRules];
    return allRules;
}