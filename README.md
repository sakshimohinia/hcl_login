# Auth Project – Java Backend + Angular Frontend

Simple login / signup / profile application.

## Project structure

```
auth-projects/
├── auth-backend/                 # Spring Boot (Java 17)
│   └── src/main/java/com/example/auth/
│       ├── AuthApplication.java
│       ├── controller/
│       │   └── AuthController.java
│       ├── model/
│       │   └── User.java
│       └── repository/
│           └── UserRepository.java
├── angular-auth/                 # Angular 17 standalone
│   └── src/app/
│       ├── login/
│       ├── signup/
│       ├── profile/
│       └── auth.service.ts
└── database/
    └── schema.sql                # optional (auto-created by JPA)
```

## 1. Backend

```bash
cd auth-backend
# Set MySQL username/password in src/main/resources/application.properties
mvn spring-boot:run
```

Runs on **http://localhost:8080**

| Method | Endpoint          | Body                          |
|--------|-------------------|-------------------------------|
| POST   | /api/signup       | `{ name, email, password }`   |
| POST   | /api/login        | `{ email, password }`         |
| GET    | /api/users/{id}   | —                             |
| GET    | /api/users        | —                             |

Passwords are stored with BCrypt. Database and table are created automatically.

## 2. Frontend

```bash
cd angular-auth
npm install
npm start
```

Open **http://localhost:4200** → Sign up → Login → Profile.

Start the backend first, then the frontend.
