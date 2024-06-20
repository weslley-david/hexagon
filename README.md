# **Acompanhar Backend - Hexagon**
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=Em%20Desenvolvimento&color=green&style=for-the-badge)
---

Olá,

O presente repositório faz parte de uma suíte de código aberto que visa promover a implementação de um sistema capaz de analisar a similaridade do resultado dos testes entre usuários e através disso sugerir tópicos para intervenção no tratamento do transtorno do espectro autista (TEA). 

Este projeto ainda está em fase de desenvolvimento e **não deve ser colocado em produção** até que sejam assegurados o sigilo dos dados dos eventuais utilizadores. 

---

## Deploy
Clonar o repositório e dentro do diretório do projeto
Adicionar o arquivo **.env** com as seguintes informações:
```
DATABASE_URL="sua-url"
SECRET_JWT="sua-secret-key"
```
implementar os comandos:
```
npm install
```
```
npm ci && npm install @prisma/client && npm install typescript && npx prisma migrate deploy
```
```
npm run dev
```
