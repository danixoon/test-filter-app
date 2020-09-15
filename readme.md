# Приложение тестового задания

Собирается через docker: 
```
docker build -t test-app .
```

Запускается через него же:
```
docker run -p 8080:8080 test-app
```

Просмотреть можно локально http://localhost:8080

Также, можно запустить dev-версию через команду:
```
yarn && yarn dev
```