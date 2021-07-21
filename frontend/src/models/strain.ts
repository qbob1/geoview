export interface Strain {
    Name:string,
    Description:string,
    Stats:{ [Stat: string]: number; },
    //Origin:{[Country:string]: string}
    Lineage:Strain[]
}