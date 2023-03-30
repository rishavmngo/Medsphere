-- public.patients definition

-- Drop table

-- DROP TABLE public.patients;

CREATE TABLE public.patients (
	id serial4 NOT NULL,
	"name" varchar(130) NOT NULL,
	age int4 NOT NULL,
	gender varchar(50) NULL,
	org_id int4 NULL,
	CONSTRAINT patients_pkey PRIMARY KEY (id)
);


-- public.patients foreign keys

ALTER TABLE public.patients ADD CONSTRAINT fk_organisation FOREIGN KEY (org_id) REFERENCES public.users(uid);
