# Cadastro de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro.

**Regras de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário admnistrador.

# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome.
Deve ser possível listar todos os carros disponíveis pela marca.
Deve ser possível listar todos os carros disponíveis pela categoria.


**Regras de negócio**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação dos carros

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**Regras de negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário admnistrador.

# Cadastro de imagens dos carros
**Requisitos Funcionais**
Deve ser possível cadastrar imagens para os carros.

**Requisitos Não Funcionais**
Utilizar o multer para upload de arquivo.

**Regras de negócio**
O usuário deve poder cadastrar  mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário admnistrador.

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regras de negócio**
O aluguel deve ter duração mínima de 24h.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.

## Obs: Rodar a seed para criar usuário admin (yarn seed:admin) (com o host do orm.config = localhost)
