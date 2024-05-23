export interface User {
    user_id: number;
    username: string,
    email:string
}

export interface Park {
    activities: string,
    address: string,
    description: string,
    designation:string,
    directionsInfo:string,
    directionsUrl:string,
    entranceFees:string,
    lat:number,
    long:number,
    name:string,
    parkCode:string,
    park_id:string,
    phoneNumber:string,
    relevanceScore:number,
    states:string,
    topics:string,
    url:string,
    weatherInfo:string
}

export interface Comment {
    comment_id: number,
    comment_text: string,
    user_id: number,
    park_id: number
}

export interface FiltersProps {
    states: string[];
    onStateSelect: (selectedState: string) => void;
}

export interface SelectedStateProp {
    selectedState: string;
}