## ERC 721 Capped

ERC721 é o padrão de código seguido pelos desenvolvedores para criar NFTs. Em diversas coleções é dito que um número máximo de tokens será emitido, contudo, nada disso é colocado em contrato. Seu objetivo é desenvolver uma solução para tal problema.

|Functions   |      Explicação      |
|----------|:--------------------:|
| construtor() |Chamada no deploy, recebe o nome, simbolo e máxima quantidade de tokens|
| getTotalSupply() | devolve a quantidade de tokens já feita |
| getBalance() | devolve a quantidade de ether depositada no contrato |
| _createNFT() |interna, checa se o número atual de tokens não atingiu o limite máximo e cria um novo token|
| ownerMint() | Função que apenas pode ser chamada pelo dono, chama _createNFT() |
| publicMint() | Função que pode ser chamada por todos, checa se o valor mandado ao contrato é maior que o preço para mintar um NFT, e se a venda esta aberta, chama _createNFT() |
| setMintPrice() | Troca o preço do token a ser criado |
| openSales() | Possibilita a venda de tokens (mint), chama setMintPrice() com o novo preço|
| closeSales() | Impossibilita a venda de tokens (mint) |
| withdraw() | transfere todo ether no contrato pro dono, só pode ser chamada pelo dono|


### Repositório para inicializar um projeto com truffle e react

Baixe o repositorio e rode 
````
npm install
````
Para instalar todos os pacotes.

Rode
````
truffle migrate
````
Para dar deploy dos contratos

Para testar rode:
````
truffle test
````
## Dependencias
* [Node.js](https://nodejs.org/en/)
* [Ganache](https://trufflesuite.com/ganache/)
* [Truffle](https://trufflesuite.com/truffle/)
