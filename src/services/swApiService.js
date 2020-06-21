//import localStorage

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

    const peopleResponse = await (await fetch(`${url}/people`)).json();
    let people = peopleResponse.results.map(({name, height, mass, gender, birth_year}) => ({
        name, height, mass, gender, birth_year
    }));

    const idField = Object.keys(people[0])[0];
    people = people.map(elem => {
        elem.id = elem[idField];
        delete elem[idField]; 
        return elem;
    })
    updateLocalStorage('people', people);

    return people;
}

export const getStarships = async () => {
    const storage = checkLocalStorage('starships');
    if(storage) return storage;

    const starshipsResponse = await (await fetch(`${url}/starships`)).json();
    let starships = starshipsResponse.results.map(({name, model, manufacturer, crew}) => ({
       name, model, manufacturer, crew	
    }))
    const idField = Object.keys(starships[0])[0];
    starships = starships.map(elem => {
        elem.id = elem[idField];
        delete elem[idField]; 
        return elem;
    })

    updateLocalStorage('starships', starships);
    console.log(starships);
    return starships;
}

export const getPlanets = async () => {
    const storage = checkLocalStorage('planets');
    if(storage) return storage;

    const starshipsResponse = await (await fetch(`${url}/planets`)).json();
    let planets = starshipsResponse.results.map(({name, rotation_period, orbital_period, diameter}) => ({
       name, rotation_period, orbital_period, diameter	
    }))
    const idField = Object.keys(planets[0])[0];
    planets = planets.map(elem => {
        elem.id = elem[idField];
        delete elem[idField]; 
        return elem;
    });

    updateLocalStorage('planets', planets); 

    return planets;
}