CREATE TABLE public.playlist
(
    id integer NOT NULL,
    name character[] NOT NULL,
    description character[] NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."Tracks"
(
    id integer NOT NULL,
    spotify_id character[] NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);
      
