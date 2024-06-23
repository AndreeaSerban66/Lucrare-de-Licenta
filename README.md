## Cerințe

Pentru a rula această aplicație, următoarele programe software trebuie să fie instalate:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Configurarea Bazei de Date

Creează o bază de date PostgreSQL urmând pașii de instalare furnizați de PostgreSQL. Instrucțiuni detaliate de instalare pot fi găsite [aici](https://www.postgresql.org/docs/current/tutorial-install.html).

## Configurarea Inițială
Următoarele comenzi în terminal trebuie executate pentru a termina configurarea aplicatiei:
```sh
npm install
npx prisma init
npx prisma migrate dev
```
## Rularea aplicatiei
Pentru a porni aplicatia trebuie executata comanda:
```sh
npm run dev
```
## Vizualizarea bazei de date
```sh
npx prisma studio
```
