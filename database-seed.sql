
CREATE TABLE public.users (
	uid serial4 NOT NULL,
	displayname varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(300) NOT NULL,
	organisation_id int4 NULL,
	is_organisation bool NULL DEFAULT false,
	department_id int4 NULL,
	profile_picture text NULL,
	signature text NULL,
	age int4 NULL,
	address text NULL,
	phone_number text NULL,
	qualifications text NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (uid)
);

CREATE TABLE public.patients (
	id serial4 NOT NULL,
	"name" varchar(130) NOT NULL,
	age int4 NOT NULL,
	gender varchar(50) NULL,
	org_id int4 NULL,
	address text NULL,
	blood_group text NULL,
	CONSTRAINT patients_pkey PRIMARY KEY (id)
);




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


CREATE TABLE public.department (
	id serial4 NOT NULL,
	"name" varchar(200) NOT NULL,
	org_id int4 NOT NULL,
	CONSTRAINT department_pkey PRIMARY KEY (id)
);


CREATE TABLE public.prescription (
	id serial4 NOT NULL,
	appointment_id int4 NOT NULL,
	CONSTRAINT prescription_pkey PRIMARY KEY (id)
);

CREATE TABLE public.appointments (
	id serial4 NOT NULL,
	patients_id int4 NOT NULL,
	doctors_id int4 NOT NULL,
	"timestamp" timestamp NOT NULL,
	org_id int4 NOT NULL,
	status varchar(100) NULL,
	CONSTRAINT appointments_pkey PRIMARY KEY (id)
);

CREATE TABLE public.prescribed_advice (
	id serial4 NOT NULL,
	prescription_id int4 NOT NULL,
	advice text NOT NULL,
	CONSTRAINT prescribed_advice_pkey PRIMARY KEY (id)
);


CREATE TABLE public.prescribed_medicine (
	id serial4 NOT NULL,
	prescription_id int4 NOT NULL,
	medicine_id int4 NOT NULL,
	dosage text NULL,
	duration text NULL,
	CONSTRAINT prescribed_medicine_pkey PRIMARY KEY (id)
);



ALTER TABLE public.users ADD CONSTRAINT user_department_fk_department_id FOREIGN KEY (department_id) REFERENCES public.department(id);
ALTER TABLE public.users ADD CONSTRAINT users_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.users(uid);

ALTER TABLE public.patients ADD CONSTRAINT fk_organisation FOREIGN KEY (org_id) REFERENCES public.users(uid) on delete cascade;


ALTER TABLE public.medicine ADD CONSTRAINT medicine_org_id_constraint FOREIGN KEY (org_id) REFERENCES public.users(uid) ON DELETE CASCADE;


ALTER TABLE public.department ADD CONSTRAINT department_users_org_id FOREIGN KEY (org_id) REFERENCES public.users(uid) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE public.appointments ADD CONSTRAINT fk_doctors_doctors_id FOREIGN KEY (doctors_id) REFERENCES public.users(uid)  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.appointments ADD CONSTRAINT fk_patients_patients_id FOREIGN KEY (patients_id) REFERENCES public.patients(id)  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.appointments ADD CONSTRAINT fk_users_org_id FOREIGN KEY (org_id) REFERENCES public.users(uid)  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.prescription ADD CONSTRAINT prescription_appointment_id_constraint FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE;

ALTER TABLE public.prescribed_medicine ADD CONSTRAINT prescribed_medicine_medicine_id_constraint FOREIGN KEY (medicine_id) REFERENCES public.medicine(id) ON DELETE CASCADE;
ALTER TABLE public.prescribed_medicine ADD CONSTRAINT prescribed_medicine_prescription_id_constraint FOREIGN KEY (prescription_id) REFERENCES public.prescription(id) ON DELETE CASCADE;

ALTER TABLE public.prescribed_advice ADD CONSTRAINT prescribed_advice_prescription_id_constraint FOREIGN KEY (prescription_id) REFERENCES public.prescription(id) ON DELETE CASCADE;
