CREATE TABLE public."user"(
	id INT,
	email VARCHAR(255),
	password VARCHAR(255),
	public_name VARCHAR(255)
);

CREATE TABLE public."review"(
	id INT,
	rating INT,
	description VARCHAR(400)
);

CREATE TABLE public."agency"(
	id INT,
	name VARCHAR(255)
);

ALTER TABLE public."review"
ADD author_id INT;

ALTER TABLE public."review"
ADD agency_id INT;

INSERT INTO public."agency" (id, name)
VALUES (0, 'My azienda');

INSERT INTO public."agency" (id, name)
VALUES (1, 'Me Evil');

INSERT INTO public."agency" (id, name)
VALUES (2, 'Me Delete');

SELECT * FROM public."agency";

INSERT INTO public."user" (id, email, password, public_name)
VALUES (0, 'lycky@example.com', 'passwordsicura123', 'Lucky');

INSERT INTO public."user" (id, email, password, public_name)
VALUES (1, 'unlycky@example.com', 'passwordsicura123', 'Unlucky');

SELECT * FROM public."user";

INSERT INTO public."review" (id, rating, description, agency_id)
VALUES (0, 4, 'Mi sento fortunato', 0);

INSERT INTO public."review" (id, rating, description, agency_id)
VALUES (1, 4, 'sono sfortunato', 1);

INSERT INTO public."review" (id, rating, description, agency_id)
VALUES (2, 4, 'sono stato fortunato ma sono anonimo!', 1);

UPDATE public."review" SET
	author_id = 0
WHERE id = 0;

UPDATE public."review" SET
	author_id = 1,
	rating = 1
WHERE id = 1;

INSERT INTO public."review" (id, rating, description, agency_id)
VALUES (3, 4, 'Tutto bene ma l''azienda non esiste più!', 2);

DELETE FROM public."agency"
WHERE id = 2;

INSERT INTO public."review" (id, rating, description, agency_id, author_id)
VALUES (4, 1, 'filler 1', 1, 1);
INSERT INTO public."review" (id, rating, description, agency_id, author_id)
VALUES (5, 3, 'filler 2', 1, 1);
INSERT INTO public."review" (id, rating, description, agency_id)
VALUES (6, 1, 'filler 3', 1);
INSERT INTO public."review" (id, rating, description, agency_id, author_id)
VALUES (7, 5, 'filler 4', 1, 1);

-- Estrarre la media (rating) e quante recensioni per ogni azienda
-- Escludere le recensioni senza un autore
SELECT agency_id, AVG(rating), COUNT(rating)
FROM public."review"
WHERE author_id IS NOT NULL
GROUP BY agency_id
HAVING AVG(rating) > 3
ORDER BY AVG(rating) ASC;

-- Estrarre il nome delle aziende per ogni recensione lasciata
SELECT review."id", "rating", "name"
FROM public.review
	INNER JOIN public.agency
	ON review.agency_id = agency.id;

-- Esempio CTE alternativa alle viste
WITH pippo as (
	SELECT review."id", "rating", "name"
	FROM public.review
	INNER JOIN public.agency
	ON review.agency_id = agency.id
),
pippo2 as (
	SELECT *
	FROM pippo
)
SELECT * from pippo2;
