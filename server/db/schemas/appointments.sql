-- public.appointments definition

-- Drop table

-- DROP TABLE public.appointments;

CREATE TABLE public.appointments (
	id serial4 NOT NULL,
	patients_id int4 NOT NULL,
	doctors_id int4 NOT NULL,
	"timestamp" timestamp NOT NULL,
	org_id int4 NOT NULL,
	status varchar(100) NULL,
	CONSTRAINT appointments_pkey PRIMARY KEY (id)
);


-- public.appointments foreign keys

ALTER TABLE public.appointments ADD CONSTRAINT fk_doctors_doctors_id FOREIGN KEY (doctors_id) REFERENCES public.users(uid);
ALTER TABLE public.appointments ADD CONSTRAINT fk_patients_patients_id FOREIGN KEY (patients_id) REFERENCES public.patients(id);
ALTER TABLE public.appointments ADD CONSTRAINT fk_users_org_id FOREIGN KEY (org_id) REFERENCES public.users(uid);
