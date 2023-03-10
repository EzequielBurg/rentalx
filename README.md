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
Ao realizar um aluguel, o status do carro deverá ficar insiponível.


# Devolução do carro

**Requisitos Funcionais**
Deve ser possível realizar a devolução do carro.

**Regras de negócio**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrada a diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias atrasados.
Caso haja multa, deverá ser somada ao total do aluguel.

## Obs: Rodar a seed para criar usuário admin (yarn seed:admin) (com o host do orm.config = localhost)
