import {nanoid} from "nanoid";

const url = 'https://swapi.dev/api'

const checkLocalStorage = (field) => {
    if(localStorage[field] && localStorage[field].length>0) {
        return JSON.parse(localStorage[field]);
    }
}

export const updateLocalStorage = (field, data) => {
    localStorage[field] = JSON.stringify(data);  
}


export const getPeople = async () => {
    const storage = checkLocalStorage('people');
    if(storage) return storage;

    const peopleResponse = await (await fetch('https://swapi.dev/api/people')).json();

    const people = peopleResponse.results.map(({name, height, mass, gender, birth_year}) => ({
        name,
        height,
        mass,
        gender,
        birth_year,
        id: nanoid()
    }))
    updateLocalStorage('people', people);

    return people;
}

export const getStarships = async () => {
    const storage = checkLocalStorage('starships');
    if(storage) return storage;

    const starshipsResponse = await (await fetch(`${url}/starships`)).json();

    const starships = starshipsResponse.results.map(({name, model, manufacturer, crew}) => ({
        name, 
        model, 
        manufacturer, 
        crew,
        id: nanoid()
    }))
    updateLocalStorage('starships', starships);

    return starships;
}

export const getPlanets = async () => {
    const storage = checkLocalStorage('planets');
    if(storage) return storage;

    const planetsResponse = await (await fetch(`${url}/planets`)).json();

    const planets = planetsResponse.results.map(({name, rotation_period, orbital_period, diameter}) => ({
        name, 
        rotation_period, 
        orbital_period, 
        diameter,
        id: nanoid()
    }))
    updateLocalStorage('planets', planets);

    return planets;
}