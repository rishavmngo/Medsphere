-- public.department definition

-- Drop table

-- DROP TABLE public.department;

CREATE TABLE public.department (
	id serial4 NOT NULL,
	"name" varchar(200) NOT NULL,
	org_id int4 NOT NULL,
	CONSTRAINT department_pkey PRIMARY KEY (id)
);


-- public.department foreign keys

ALTER TABLE public.department ADD CONSTRAINT department_users_org_id FOREIGN KEY (org_id) REFERENCES public.users(uid) ON DELETE CASCADE ON UPDATE CASCADE;
