# Proje Adı: E-Commerce Backend

Bu proje, basit bir e-ticaret uygulaması için backend servisidir. Kullanıcı kayıt ve giriş işlemlerini, kullanıcı profilini yönetmeyi, bakiye eklemeyi ve sipariş oluşturmayı sağlar. Ayrıca, admin kullanıcıları tüm hizmetleri görüntüleyebilir. Tüm hizmetlerden kastedilen ise müşterilerin tüm siparişleridir.

- Gereksinimler
- Node.js
- NPM
- NestJS
- Sequelize (SQLite)

## Kurulum

1. Bu projeyi klonlayın:

`git clone https://github.com/Burakkepuc/Rising-ecommerce.git`  
 `cd ecommerce-backend`

2. Gerekli bağımlılıkları yükleyin:
   `npm install`

## API Dökümantasyonu

### Auth

#### Kayıt Ol (Register)

- URL: localhost:3000/auth/register
- Method: POST
- Body:

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "test123"
}
```

#### Giriş Yap (Login)

- URL: localhost:3000/auth/login
- Method: POST
- Body:

```
{
  "email": "john.doe@example.com",
  "password": "test123"
}
```

#### Rol Belirle (Describe Role)

- URL: localhost:3000/auth/role/1
- Method: PUT
- Headers :
  `Authorization: Bearer <token>`
- Body:

```
{
  "role": "ADMIN" // ADMIN | USER
}
```

### Kullanıcı(User)

#### Kullanıcı Profil Bilgilerini Al (Get user profile info)

- URL: localhost:3000/user/profile
- Method: GET
- Headers :
  `Authorization: Bearer <token>`

### Bakiye(Balance)

#### Kullanıcıya bakiye yükle(Add balance to user)

- URL: localhost:3000/user/update-balance
- Method: PUT
- Headers :
  `Authorization: Bearer <token>`
- Body:

```
 {
  "amount": 5000
 }
```

### Siparişler (Orders)

#### Sipariş Oluştur (Create order)

- URL: localhost:3000/order/create
- Method: POST
- Headers :
  `Authorization: Bearer <token>`
- Body:

```
{
  "productName": "Phone",
  "quantity": 1,
  "price": 500,
  "address": "302 New York"
}
```

### Siparişleri Getir (Get orders)

- URL: localhost:3000/order/get-orders
- Method: GET
- Headers :
  `Authorization: Bearer <token>`

### Hizmetler (Services)

#### Tüm Hizmetleri/Siparişleri Al (Get all services - Admin Guard)

- URL: localhost:3000/services/get-all-services
- Method: GET
- Headers :
  `Authorization: Bearer <token>`

## Test

Temel testleri gerçekleştirmek için aşağıdaki komutu çalıştırabilirsiniz:

```
npm run test auth.service.spec.ts
```
