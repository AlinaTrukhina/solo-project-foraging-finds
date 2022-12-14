-- create database 'foraging-finds'

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"avatar" varchar(255),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "pins" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"latin_name" TEXT,
	"date" DATE NOT NULL,
	"image_id" int NOT NULL,
	"text_entry" varchar(1024) NOT NULL,
	"user_id" int NOT NULL,
	"permalink" varchar(255),
	"cap_features" TEXT,
	"cap_color" TEXT,
	"stipe_color" TEXT,
	"growing_on" TEXT,
	"lat" varchar(255) NOT NULL,
	"lng" varchar(255) NOT NULL,
	"private" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "pins_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"comment" varchar(1024) NOT NULL,
	"date" DATE NOT NULL,
	"user_id" int NOT NULL,
	"pin_id" int NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "images" (
	"id" serial NOT NULL,
	"img_url" varchar(255) NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "pins" ADD CONSTRAINT "pins_fk0" FOREIGN KEY ("image_id") REFERENCES "images"("id");
ALTER TABLE "pins" ADD CONSTRAINT "pins_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("pin_id") REFERENCES "pins"("id");


INSERT INTO "images" ("img_url")
VALUES ('https://live.staticflickr.com/65535/52499112900_5463c4e832_b.jpg'),
		('https://www.mushroomexpert.com/images/kuo4/boletus_edulis_01.jpg'),
		('https://www.mushroomexpert.com/images/kuo/morchella_prava_01_thumb.jpg'),
		('https://www.mushroomexpert.com/images/kuo3/cantharellus_cf_cibarius_01.jpg'),
		('https://mushrooms.bigbadmole.com/wp-content/uploads/2014/11/1011a-106.jpg'),
		('https://www.mushroomexpert.com/images/nadon/nadon_pholiota_alnicola_01.jpg'),
		('https://www.mushroomexpert.com/images/kuo6/calvatia_gigantea_01.jpg'),
		('https://www.mushroomexpert.com/images/kuo6/armillaria_mellea_01.jpg'),
		('https://www.mushroomexpert.com/images/kuo6/pleurotus_ostreatus_03.jpg'),
		('https://www.mushroomexpert.com/images/kuo2/amanita_muscaria_muscaria_06.jpg')
		;

INSERT INTO "pins" ("title", "latin_name", "date", "image_id", "text_entry", "user_id", "lat", "lng")
VALUES ('White Mushroom', 'unknown', '2021-08-14', 1, 'mushroom found in BWCA', 1, 44.9572739, -93.2561296),
('King Bolete', 'Boletus Edulis', '2022-08-14', 2, 'A large King Bolete', 1, 44.985, -93.33),
('Morel', 'Morchella esculenta', '2022-04-10', 3, 'baby morel', 1, 44.94852, -93.260536),
('Golden Chanterelle', 'Cantharellus cibarius', 4, '2021-07-29', 'beautiful golden chanterelle, delicious on their own', 1, 44.94306991431049, -93.30413328554685),
('Hat-food Russula', 'Russula vesca', '2021-08-13', 5, 'good to fry up in a stir fry', 1, 44.93164745184415, -93.29795347597654),
('Nameko', 'Pholiota malicola', '2021-08-11', 6, 'delicious when marinated', 1, 44.920365382428464, -93.24230798984377),
('Giant puffball', 'Calvatia gigantea', '2021-08-12', 7, 'put this one on the grill!', 1, 45.00878674174073, -93.21827539707033),
('Honey Mushroom', 'Armillaria mellea', '2021-08-15', 8, 'aka "opyata"', 1, 44.92356361764407, -93.37002405429689),
('Oyster Mushroom', 'Pleurotus ostreatus', '2021-08-16', 9, 'has a distinct oyster mushroom smell', 1, 44.83914963537265, -93.36659082675783),
('Fly Agairc', 'Amanita muscaria', '2021-08-17', 10, 'most recognizable mushroom in the world', 1, 44.87273544742319, -93.2938064029297)
;