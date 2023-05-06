-- public.prescribed_advice definition

-- Drop table

-- DROP TABLE public.prescribed_advice;

CREATE TABLE public.prescribed_advice (
	id serial4 NOT NULL,
	prescription_id int4 NOT NULL,
	advice text NOT NULL,
	CONSTRAINT prescribed_advice_pkey PRIMARY KEY (id)
);


-- public.prescribed_advice foreign keys

ALTER TABLE public.prescribed_advice ADD CONSTRAINT prescribed_advice_prescription_id_constraint FOREIGN KEY (prescription_id) REFERENCES public.prescription(id) ON DELETE CASCADE;
