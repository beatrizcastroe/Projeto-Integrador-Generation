tb_usuariocreate database db_exerciciopi;
use db_exerciciopi;

create table tb_usuario (
	id_usuario bigint primary key auto_increment,
	nome_completo varchar(255) not null,
    cpf  CHAR (11) UNIQUE not null,
    datanasc date not null,
    email varchar (255) not null,
	senha varchar (30) not null,
	endereco varchar (255) not null,
	cep varchar (30)not null,
	estado varchar (30)not null,
	cidade varchar (30)not null
);

SELECT * FROM tb_usuario;

create table tb_categoria (
	id_categoria bigint primary key auto_increment,
	categoria varchar (255) not null, -- (PARA VOCÊ, SUA CASA)
	nome_categoria varchar (255) not null, -- ( MODA, CUIDADOS PESSOAIS)
	nome_subCategoria varchar (255) not null-- (BOLSAS....)
);

create table tb_produto (
	id_produto bigint primary key auto_increment,
	nome varchar (255),
	descricao varchar (255),
	marca varchar (255),
	preco decimal (20,2),
	fk_categoria bigint,
    foreign key (fk_categoria) references tb_categoria (id_categoria)
);

