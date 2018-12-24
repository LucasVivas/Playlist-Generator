CREATE TABLE public."Playlists"
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
    name character[] NOT NULL,
    artist character[] NOT NULL,
    album character[] ,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."Playlist_tracks"
(
    id integer NOT NULL,
    playlist_id integer,
    track_id integer,
    PRIMARY KEY (id),
    FOREIGN KEY (playlist_id) REFERENCES public."Playlists" (id),
    FOREIGN KEY (track_id) REFERENCES public."Tracks" (id)
)
WITH (
    OIDS = FALSE
);
