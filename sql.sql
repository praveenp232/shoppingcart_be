
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    role character varying(20) COLLATE pg_catalog."default" DEFAULT 'admin'::character varying,
    facebookid character varying(50) COLLATE pg_catalog."default",
    twitterid character varying(50) COLLATE pg_catalog."default",
    googleid character varying(50) COLLATE pg_catalog."default",
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    mobileno character varying(100) COLLATE pg_catalog."default",
    count integer,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.category
(
    id integer NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    slug character varying(50) COLLATE pg_catalog."default",
    parentid integer,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone,
    createdby integer,
    updatedby integer,
    deletedby integer,
    status integer,
    categoryimage character varying(250) COLLATE pg_catalog."default",
    bannerimage character varying(250) COLLATE pg_catalog."default",
    sort integer,
    metadescription character varying(200) COLLATE pg_catalog."default",
    description character varying(200) COLLATE pg_catalog."default",
    metakeywords character varying(200) COLLATE pg_catalog."default",
    metatitle character varying(200) COLLATE pg_catalog."default",
    promoted integer DEFAULT 1,
    CONSTRAINT category_pkey PRIMARY KEY (id),
    CONSTRAINT category_createdby_fkey FOREIGN KEY (createdby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT category_deletedby_fkey FOREIGN KEY (deletedby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT category_updatedby_fkey FOREIGN KEY (updatedby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;
-- Index: category_name_idx

-- DROP INDEX public.category_name_idx;

CREATE UNIQUE INDEX category_name_idx
    ON public.category USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;



CREATE TABLE IF NOT EXISTS public.product
(
    id integer NOT NULL DEFAULT nextval('product_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    slug character varying(50) COLLATE pg_catalog."default",
    code integer,
    sort integer,
    categoryid integer,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone,
    createdby integer,
    updatedby integer,
    deletedby integer,
    firstbox boolean,
    secondbox boolean,
    thirdbox boolean,
    description character varying(200) COLLATE pg_catalog."default",
    metadesc character varying(200) COLLATE pg_catalog."default",
    metatitle character varying(200) COLLATE pg_catalog."default",
    metakeywords character varying(200) COLLATE pg_catalog."default",
    status boolean DEFAULT true,
    addon boolean,
    CONSTRAINT product_pkey PRIMARY KEY (id),
    CONSTRAINT product_categoryid_fkey FOREIGN KEY (categoryid)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT product_createdby_fkey FOREIGN KEY (createdby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT product_deletedby_fkey FOREIGN KEY (deletedby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT product_updatedby_fkey FOREIGN KEY (updatedby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.product
    OWNER to postgres;