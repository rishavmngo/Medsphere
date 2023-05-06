-- public.medicine definition

-- Drop table

-- DROP TABLE public.medicine;

CREATE TABLE public.medicine (
	id serial4 NOT NULL,
	brand_name varchar(50) NULL,
	"type" varchar(50) NULL,
	generic varchar(70) NULL,
	dosageform text NULL,
	manufacturer varchar(100) NULL,
	org_id int4 NULL,
	quantity int4 NULL,
	CONSTRAINT medicine_pkey PRIMARY KEY (id)
);


-- public.medicine foreign keys

ALTER TABLE public.medicine ADD CONSTRAINT medicine_org_id_constraint FOREIGN KEY (org_id) REFERENCES public.users(uid) ON DELETE CASCADE;
