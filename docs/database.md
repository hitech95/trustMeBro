Quali informazioni dobbiamo salvare?

```
- Utente per il login:
 - id (uuid)
 - email (255 caratteri)
 - password (255 caratteri)
 - nome pubblico (255 caratteri)

- Recensione
 - id
 - punteggio (1/5) (float 32) (int)
 - testo (400 caratteri max)

- Azienda
 - id
 - nome (255 caratteri)
```

Relazioni sono di tre tipi:
 - 1:1
 - 1:n
 - n:m

nel nostro caso:
```
Utente(1) <> Recensione(n) [1:n]
Recensione(n) <> Azienda(1) [1:n]
```

ORM (tool che mi aiutano ad accedere info database)
 -> Driver per accedere al dbms a basso livello.
 -> Tool per generare il modello e le query.

Esempio: Prisma, Eloquent (Laravel), TypeORM.

Esempio a basso livello di una 1:n
user(id, email, password, display_name)
recensione(id, score, description, author)
 - author è PK di User.

Una possibile struttura è definita quindi così [dbdiagram](https://dbdiagram.io):
```
Table users {
  id integer [primary key]
  created_at timestamp [not null]
  updated_at timestamp [not null]

  email varchar [not null, unique]
  display_name varchar(60)
}

Table review {
  id integer [primary key]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  deleted_at timestamp

  description text
  author_id integer
  agency_id integer [not null]
}

Table agency {
  id integer [primary key]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  deleted_at timestamp

  name text
}

Ref: review.author_id > users.id // many-to-one
Ref: review.agency_id > agency.id // many-to-one
```


