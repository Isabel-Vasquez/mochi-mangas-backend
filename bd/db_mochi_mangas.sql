BEGIN;

CREATE TABLE IF NOT EXISTS carrito
(
    id serial NOT NULL,
    usuario_id integer NOT NULL,
    total numeric(10, 2) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT carrito_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS carrito_items
(
    id serial NOT NULL,
    carrito_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer NOT NULL,
    precio numeric(10, 2) NOT NULL,
    CONSTRAINT carrito_items_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categorias
(
    id serial NOT NULL,
    nombre character varying(100) NOT NULL,
    CONSTRAINT categorias_pkey PRIMARY KEY (id),
    CONSTRAINT categorias_nombre_key UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS favoritos
(
    id serial NOT NULL,
    usuario_id integer NOT NULL,
    producto_id integer NOT NULL,
    fecha_agregado timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT favoritos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pagos
(
    id serial NOT NULL,
    usuario_id integer NOT NULL,
    carrito_id integer NOT NULL,
    metodo_pago character varying(50) NOT NULL,
    fecha_pago timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    direccion_envio character varying(255),
    tipo_envio character varying(50),
    pais character varying(50),
    comuna character varying(50),
    region character varying(50),
    CONSTRAINT pagos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS productos
(
    id serial NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion character varying(2000) NOT NULL,
    precio numeric(10, 2) NOT NULL,
    categoria_id integer NOT NULL,
    usuario_id integer NOT NULL,
    fecha_publicacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    url_img character varying(2000),
    CONSTRAINT productos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usuarios
(
    id serial NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    direccion character varying(255),
    telefono character varying(20),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    rut character varying(20),
    CONSTRAINT usuarios_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_email_key UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS valoraciones
(
    id serial NOT NULL,
    producto_id integer NOT NULL,
    usuario_id integer NOT NULL,
    valoracion integer,
    comentario character varying(1000),
    fecha_valoracion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario character varying(255),
    CONSTRAINT valoraciones_pkey PRIMARY KEY (id)
);

ALTER TABLE carrito
    ADD CONSTRAINT carrito_usuario_id_fkey FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE carrito_items
    ADD CONSTRAINT carrito_items_carrito_id_fkey FOREIGN KEY (carrito_id)
    REFERENCES carrito (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE carrito_items
    ADD CONSTRAINT carrito_items_producto_id_fkey FOREIGN KEY (producto_id)
    REFERENCES productos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE favoritos
    ADD CONSTRAINT favoritos_producto_id_fkey FOREIGN KEY (producto_id)
    REFERENCES productos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE favoritos
    ADD CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE pagos
    ADD CONSTRAINT pagos_carrito_id_fkey FOREIGN KEY (carrito_id)
    REFERENCES carrito (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE pagos
    ADD CONSTRAINT pagos_usuario_id_fkey FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE productos
    ADD CONSTRAINT productos_categoria_id_fkey FOREIGN KEY (categoria_id)
    REFERENCES categorias (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE productos
    ADD CONSTRAINT productos_usuario_id_fkey FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE valoraciones
    ADD CONSTRAINT valoraciones_producto_id_fkey FOREIGN KEY (producto_id)
    REFERENCES productos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE valoraciones
    ADD CONSTRAINT valoraciones_usuario_id_fkey FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

INSERT INTO categorias (id, nombre) VALUES
(1, 'Shonen'),
(2, 'Josei'),
(3, 'Thriller'),
(4, 'Seinen'),
(5, 'Terror'),
(6, 'Yuri'),
(7, 'Shojo');

END;

SELECT * from usuarios;
