PGDMP                            z         
   repertorio    13.6    13.6 
    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    41358 
   repertorio    DATABASE     f   CREATE DATABASE repertorio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE repertorio;
                felipe    false            ?            1259    41367 
   repertorio    TABLE     ?   CREATE TABLE public.repertorio (
    id integer NOT NULL,
    cancion character varying(50),
    artista character varying(50),
    tono character varying(10)
);
    DROP TABLE public.repertorio;
       public         heap    postgres    false            ?            1259    41365    repertorio_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.repertorio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.repertorio_id_seq;
       public          postgres    false    201            ?           0    0    repertorio_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.repertorio_id_seq OWNED BY public.repertorio.id;
          public          postgres    false    200            "           2604    41370    repertorio id    DEFAULT     n   ALTER TABLE ONLY public.repertorio ALTER COLUMN id SET DEFAULT nextval('public.repertorio_id_seq'::regclass);
 <   ALTER TABLE public.repertorio ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            ?          0    41367 
   repertorio 
   TABLE DATA           @   COPY public.repertorio (id, cancion, artista, tono) FROM stdin;
    public          postgres    false    201   ?	       ?           0    0    repertorio_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.repertorio_id_seq', 1, false);
          public          postgres    false    200            ?      \.


     