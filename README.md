# Todo app

Detta är en Todo-applikation byggd med React och TypeScript.
Applikationen kommunicerar med ett separat Express-backend via ett REST API och implementerar full CRUD-funktionalitet.

## Funktionalitet

* Hämta alla todos (GET)

* Skapa ny todo med validering (POST)

* Uppdatera status (PUT)

* Ta bort todo (DELETE)

* Formulärvalidering med Yup

* State management med useState

* Datahämtning med useEffect

* State lifting mellan komponenter

## Teknologier

* React

* TypeScript

* Vite

* Yup (validering)

* Fetch API

* Projektstruktur

## Applikationen är uppdelad i:

TodoForm – hanterar formulär och validering

TodoList – renderar lista av todos

TodoItem – visar en enskild todo

App – hanterar global state och API-anrop

### Starta projektet
npm install
npm run dev


Applikationen körs på:
http://localhost:5173

Backend måste vara igång på http://localhost:3000