# Controle de Plantão

![imagem](./assets/controleplantao.png)

## Descrição

Controle de Plantão é um aplicativo móvel desenvolvido com React Native e Expo para gerenciar funcionários de plantão e seus respectivos pagamentos. O aplicativo permite cadastrar funcionários, registrar plantões, gerenciar adiantamentos e exportar relatórios em formato CSV.

## Funcionalidades Principais

### Gerenciamento de Funcionários
- Cadastro de funcionários com nome, diária, tipo de plantão (Diurno/Noturno) e categoria (Fixo/Folguista)
- Visualização dos funcionários cadastrados
- Registro de datas de pagamento

### Gerenciamento de Adiantamentos
- Registro de adiantamentos para os funcionários
- Acompanhamento dos valores adiantados
- Associação dos adiantamentos com funcionários específicos

### Relatórios e Exportação
- Exportação de dados em formato CSV
- Geração de três tipos de relatórios:
  - Relatório detalhado de plantões
  - Resumo com balanço entre plantões e adiantamentos
  - Relatório de adiantamentos

## Tecnologias Utilizadas

- React Native
- TypeScript
- Expo
- Expo File System (para exportação de arquivos)

## Estrutura do Projeto

```
ControlePlantao/
├── assets/                 # Imagens e recursos estáticos
├── pages/                  # Componentes de páginas
│   ├── ShiftControl.tsx    # Tela de controle de plantões/funcionários
│   └── AdvancePayment.tsx  # Tela de gerenciamento de adiantamentos
├── styles/                 # Estilos do aplicativo
│   ├── appStyles.ts        # Estilos do componente principal
│   ├── colors.ts           # Definição de cores
│   ├── shiftControlStyles.ts
│   └── advancePaymentStyles.ts
├── types/                  # Definições de tipos TypeScript
│   ├── employee.ts         # Tipo para funcionários
│   ├── advance.ts          # Tipo para adiantamentos
│   └── props.ts            # Tipos para props de componentes
├── App.tsx                 # Componente principal
└── index.ts                # Ponto de entrada
```

## Requisitos do Sistema

- Node.js 14 ou superior
- Expo CLI
- iOS 15.1+ ou Android 5.0+

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ControlePlantao.git
```

2. Navegue até o diretório do projeto:
```bash
cd ControlePlantao
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o projeto:
```bash
npm start
```

5. Use o Expo Go para abrir o aplicativo ou execute em um emulador:
```bash
npm run android
# ou
npm run ios
```

## Guia de Uso

### Adicionar um Funcionário

1. Na tela "Funcionários", preencha o nome, valor da diária, data de pagamento
2. Selecione o tipo de plantão (Diurno/Noturno)
3. Selecione a categoria (Fixo/Folguista)
4. Clique em "Salvar Entrada"

### Registrar um Adiantamento

1. Navegue para a tela "Adiantamentos"
2. Selecione o funcionário na lista
3. Informe o valor do adiantamento
4. Confirme a data (pré-preenchida com a data atual)
5. Clique em "Registrar Adiantamento"

### Exportar Relatórios

1. Na tela "Funcionários", clique em "Exportar CSV"
2. Escolha qual relatório deseja compartilhar:
   - Plantões: relatório detalhado de todos os plantões
   - Resumo: balanço entre plantões e adiantamentos por funcionário
   - Adiantamentos: registro detalhado de todos os adiantamentos

## Funcionalidades Futuras

- Persistência de dados locais com AsyncStorage
- Sincronização com serviços de nuvem
- Cálculo automático de horas extras
- Suporte a múltiplos perfis de usuário
- Notificações para lembretes de pagamento

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato e Suporte

Para suporte ou dúvidas, entre em contato:
- GitHub: [Sergio Bonatto](https://github.com/sergiobonatto)

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ por Sergio Bonatto
