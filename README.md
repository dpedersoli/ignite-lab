# Criando aplicação para gerenciar notificações de chamaos, em React Native com base no Ignite-lab

## Tecnologias ⚛️
# Projeto com uso de

- React Native
- Typescript
- Native-base (style)
- Expo (build)
- Firebase (Firestore)
- React-navigation (native-stack)
- Phosphor-react-native (icons), etc.

## Instalação 🛠️

Para iniciar o projeto e visualizá-lo em seu navegador é necessário seguir os passos a seguir:

1. Fazer o download e instalar o Node
2. Fazer o download e instalar o Visual Studio Code para utilização de extensões
3. Fazer o "clone" do repositório com o comando: `git clone https://github.com/dpedersoli/ignite-lab.git` (HTTPS) ou `git clone git@github.com:dpedersoli/ignite-lab.git` (SSH)
4. Abrir o terminal no diretório do projeto e instalar as suas dependências com o comando: `npm install` + `npm install -g expo-cli`
5. Instale o app da 'Expo Go' no seu dispositivo mobile
6. Rode o comando `expo start` para iniciar o projeto e siga o passo a passo

## Mais sobre mim

[Daniel Pedersoli](https://github.com/dpedersoli)
<br/>

### Estrutura do repositório

```
/
├─ src/
│  ├─ @types/            # arquivos de importação para tipagem de Typescript
|  |
|  ├─ DTOs/              # configuração firestore 
|  |
|  ├─ assets/            # mídia
|  |
|  ├─ components/        # arquivos React.tsx que renderizam os componentes
|  |
|  ├─ routes             # esquema de rotas
|  |
|  ├─ screens/           # arquivos React.tsx que renderizam as páginas
|  |
|  ├─ styles/            # arquivos de estilização
│  |
|  └─ utils/             # configuração de data formatada do firestore
|
├─ .gitignore            # lista de arquivos e pastas que não são rastreados pelo Git
├─ package.json          # manifesto do projeto
└─ README.md             # esse arquivo
```
