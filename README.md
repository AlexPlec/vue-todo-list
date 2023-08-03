# Vue.js + ASP.NET Todo list

Simple learning project to get started with Vue.js and ASP.NET Core.

# How to start

## Prerequisites

- Node.js
- .NET 7.0
- MySQL
- set your uid and pwd in
[TodoListAPI/Data/AppDbContext.cs](TodoListAPI/Data/AppDbContext.cs)

## Client

``` bash
cd toDo-list
npm ci
npm run dev
```

## Server

``` bash
cd TodoListAPI
dotnet ef database update
dotnet run
```
