# Knowlegde test Widya Informasi Nusantara

## Deployment

- Front end = [https://fe-test-w-idya.vercel.app/](https://fe-test-w-idya.vercel.app/)
- Back end = [https://be-testwidya-production.up.railway.app/](https://be-testwidya-production.up.railway.app/)

## Source Code

- Front end = [https://github.com/Wrendra57/FE-testWIdya](https://be-testwidya-production.up.railway.app/)
- Back end = [https://github.com/Wrendra57/BE-testWidya](https://github.com/Wrendra57/BE-testWidya)

## Endpoint

- Register

```http
  POST /auth/register
```

      Body = {name, email, password, gender}

- Login

```http
  POST /auth/login
```

      Body = {email, password}

- Autentifikasi

```http
  GET /auth/me
```

      Authorization : Bearer Token

- Create Product

```http
  POST /product
```

      Request Body: {productName, category, price, description,file}
      Authorization : Bearer Token

- GET Product

```http
  GET /product
```

- GET Product By ID

```http
  GET /product/:id
```

- GET Product By ID User

```http
  GET /productbyseller
```

      Authorization : Bearer Token

- UPDATE Product By ID

```http
  PUT /product/:id
```

      Request Body : {productName, category, price, description}
      Authorization : Bearer Token

- UPDATE status Product By ID

```http
  PUT /product/status/:id
```

      Authorization : Bearer Token

- DELETE Product By ID

```http
  DELETE /product/:id
```

      Authorization : Bearer Token
