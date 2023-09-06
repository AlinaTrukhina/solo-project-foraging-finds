--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9
-- Dumped by pg_dump version 14.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: alinatrukhina
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    comment character varying(1024) NOT NULL,
    date date NOT NULL,
    user_id integer NOT NULL,
    pin_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO alinatrukhina;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: alinatrukhina
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO alinatrukhina;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alinatrukhina
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: alinatrukhina
--

CREATE TABLE public.images (
    id integer NOT NULL,
    img_url character varying(255) NOT NULL
);


ALTER TABLE public.images OWNER TO alinatrukhina;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: alinatrukhina
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO alinatrukhina;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alinatrukhina
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: pins; Type: TABLE; Schema: public; Owner: alinatrukhina
--

CREATE TABLE public.pins (
    id integer NOT NULL,
    title text NOT NULL,
    latin_name text,
    date date NOT NULL,
    image_id integer NOT NULL,
    text_entry character varying(1024) NOT NULL,
    user_id integer NOT NULL,
    permalink character varying(255),
    cap_features text,
    cap_color text,
    stipe_color text,
    growing_on text,
    lat character varying(255) NOT NULL,
    lng character varying(255) NOT NULL,
    private boolean DEFAULT false NOT NULL
);


ALTER TABLE public.pins OWNER TO alinatrukhina;

--
-- Name: pins_id_seq; Type: SEQUENCE; Schema: public; Owner: alinatrukhina
--

CREATE SEQUENCE public.pins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pins_id_seq OWNER TO alinatrukhina;

--
-- Name: pins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alinatrukhina
--

ALTER SEQUENCE public.pins_id_seq OWNED BY public.pins.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: alinatrukhina
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    avatar character varying(255)
);


ALTER TABLE public."user" OWNER TO alinatrukhina;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: alinatrukhina
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO alinatrukhina;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alinatrukhina
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: pins id; Type: DEFAULT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.pins ALTER COLUMN id SET DEFAULT nextval('public.pins_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: alinatrukhina
--

COPY public.comments (id, comment, date, user_id, pin_id) FROM stdin;
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: alinatrukhina
--

COPY public.images (id, img_url) FROM stdin;
1	https://live.staticflickr.com/65535/52499112900_5463c4e832_b.jpg
2	https://www.mushroomexpert.com/images/kuo4/boletus_edulis_01.jpg
3	https://www.mushroomexpert.com/images/kuo/morchella_prava_01_thumb.jpg
4	https://www.mushroomexpert.com/images/kuo3/cantharellus_cf_cibarius_01.jpg
5	https://mushrooms.bigbadmole.com/wp-content/uploads/2014/11/1011a-106.jpg
6	https://www.mushroomexpert.com/images/nadon/nadon_pholiota_alnicola_01.jpg
7	https://www.mushroomexpert.com/images/kuo6/calvatia_gigantea_01.jpg
8	https://www.mushroomexpert.com/images/kuo6/armillaria_mellea_01.jpg
9	https://www.mushroomexpert.com/images/kuo6/pleurotus_ostreatus_03.jpg
10	https://www.mushroomexpert.com/images/kuo2/amanita_muscaria_muscaria_06.jpg
\.


--
-- Data for Name: pins; Type: TABLE DATA; Schema: public; Owner: alinatrukhina
--

COPY public.pins (id, title, latin_name, date, image_id, text_entry, user_id, permalink, cap_features, cap_color, stipe_color, growing_on, lat, lng, private) FROM stdin;
11	White Mushroom	unknown	2021-08-14	1	mushroom found in BWCA	1	\N	\N	\N	\N	\N	44.9573	-93.2561	f
12	King Bolete	Boletus Edulis	2022-08-14	2	A large King Bolete	1	\N	\N	\N	\N	\N	44.985	-93.33	f
13	Morel	Morchella esculenta	2022-04-10	3	baby morel	1	\N	\N	\N	\N	\N	44.9485	-93.2605	f
14	Golden Chanterelle	Cantharellus cibarius	2021-07-29	4	beautiful golden chanterelle, delicious on their own	1	\N	\N	\N	\N	\N	44.9431	-93.3041	f
15	Hat-food Russula	Russula vesca	2021-08-13	5	good to fry up in a stir fry	1	\N	\N	\N	\N	\N	44.9316	-93.2979	f
16	Nameko	Pholiota malicola	2021-08-11	6	delicious when marinated	1	\N	\N	\N	\N	\N	44.9204	-93.2423	f
17	Giant puffball	Calvatia gigantea	2021-08-12	7	put this one on the grill!	1	\N	\N	\N	\N	\N	45.0088	-93.2183	f
18	Honey Mushroom	Armillaria mellea	2021-08-15	8	aka "opyata"	1	\N	\N	\N	\N	\N	44.923	-93.3700	f
19	Oyster Mushroom	Pleurotus ostreatus	2021-08-16	9	has a distinct oyster mushroom smell	1	\N	\N	\N	\N	\N	44.8392	-93.3666	f
20	Fly Agairc	Amanita muscaria	2021-08-17	10	most recognizable mushroom in the world	1	\N	\N	\N	\N	\N	44.8727	-93.2938	f
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: alinatrukhina
--

COPY public."user" (id, username, password, avatar) FROM stdin;
1	alina	$2a$10$FPaFd/K9b1E1vtaQC8Zxq.zFMcwBQOyIFXhyZt3TUTA2ryPi9ISNW	\N
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alinatrukhina
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alinatrukhina
--

SELECT pg_catalog.setval('public.images_id_seq', 10, true);


--
-- Name: pins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alinatrukhina
--

SELECT pg_catalog.setval('public.pins_id_seq', 20, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alinatrukhina
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: comments comments_pk; Type: CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pk PRIMARY KEY (id);


--
-- Name: images images_pk; Type: CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pk PRIMARY KEY (id);


--
-- Name: pins pins_pk; Type: CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.pins
    ADD CONSTRAINT pins_pk PRIMARY KEY (id);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk0 FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: comments comments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk1 FOREIGN KEY (pin_id) REFERENCES public.pins(id);


--
-- Name: pins pins_fk0; Type: FK CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.pins
    ADD CONSTRAINT pins_fk0 FOREIGN KEY (image_id) REFERENCES public.images(id);


--
-- Name: pins pins_fk1; Type: FK CONSTRAINT; Schema: public; Owner: alinatrukhina
--

ALTER TABLE ONLY public.pins
    ADD CONSTRAINT pins_fk1 FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

 