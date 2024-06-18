export type CardSchemes = ICardSchemes[];

export interface ICardSchemes {
    id: number
    name: string
}

export enum ListCardSchemes {
    VISA = 'visa',
    MASTERCARD = 'mastercard',
    JCB = 'jcb',
    AMEX = 'amex'
}

