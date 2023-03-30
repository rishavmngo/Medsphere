-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	uid serial4 NOT NULL,
	displayname varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(300) NOT NULL,
	organisation_id int4 NULL,
	is_organisation bool NULL DEFAULT false,
	department_id int4 NULL,
	age int4 NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (uid)
);


-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT user_department_fk_department_id FOREIGN KEY (department_id) REFERENCES public.department(id);
ALTER TABLE public.users ADD CONSTRAINT users_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.users(uid);
