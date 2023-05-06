-- public.prescription definition

-- Drop table

-- DROP TABLE public.prescription;

CREATE TABLE public.prescription (
	id serial4 NOT NULL,
	appointment_id int4 NOT NULL,
	CONSTRAINT prescription_pkey PRIMARY KEY (id)
);


-- public.prescription foreign keys

ALTER TABLE public.prescription ADD CONSTRAINT prescription_appointment_id_constraint FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE;
