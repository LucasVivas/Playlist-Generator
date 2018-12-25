CREATE TABLE public."Playlists"
(
    id SERIAL,
    name text NOT NULL,
    description text,
    PRIMARY KEY (id),
    UNIQUE (name)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."Tracks"
(
    id SERIAL,
    name text NOT NULL,
    artist text ,
    album text ,
    PRIMARY KEY (id),
    UNIQUE(name, artist, album)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public."Playlist_tracks"
(
    id SERIAL,
    playlist_id integer,
    track_id integer,
    PRIMARY KEY (id),
    FOREIGN KEY (playlist_id) REFERENCES public."Playlists" (id),
    FOREIGN KEY (track_id) REFERENCES public."Tracks" (id),
    UNIQUE (playlist_id, track_id)
)
WITH (
    OIDS = FALSE
);
