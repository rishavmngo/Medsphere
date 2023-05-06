-- public.prescribed_medicine definition

-- Drop table

-- DROP TABLE public.prescribed_medicine;

CREATE TABLE public.prescribed_medicine (
	id serial4 NOT NULL,
	prescription_id int4 NOT NULL,
	medicine_id int4 NOT NULL,
	dosage text NULL,
	duration text NULL,
	CONSTRAINT prescribed_medicine_pkey PRIMARY KEY (id)
);


-- public.prescribed_medicine foreign keys

ALTER TABLE public.prescribed_medicine ADD CONSTRAINT prescribed_medicine_medicine_id_constraint FOREIGN KEY (medicine_id) REFERENCES public.medicine(id) ON DELETE CASCADE;
ALTER TABLE public.prescribed_medicine ADD CONSTRAINT prescribed_medicine_prescription_id_constraint FOREIGN KEY (prescription_id) REFERENCES public.prescription(id) ON DELETE CASCADE;
