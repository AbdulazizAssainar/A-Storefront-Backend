# Storefront Backend Project

## 1. Test: to test the project by jasmine
#### TERMINAL: `npm run test`
- Order 
- Product
- Ordered Products
- User

## 2. Clean Code: to clean the code using eslint and prettier
#### TERMINAL: `npm run clean`

## 3. Build & Run: to build project and run server 
#### TERMINAL: `npm run start`
- Build Project
- Migrate up
- Run Server



## 1. Index route: home page
#### URL: /

## 2. Register route: Create new account
#### URL: /register?username=`YOUR Username`&firstname=`Your firstname`&lastname=`Your lastname`&password=`Your Password`
- username
- first name
- last name
- password (will be hashed)

## 2. Login route: if you already have account
#### URL: /login?username=`YOUR Username`&password=`Your Password`
- username
- password

## 3. Store route: Store page (view only)
#### URL: /store
- products json list

## 4. Add Catagory route: 
#### URL: /store/addcatagory?name=`Catagory Name`
- name

## 5. Add Product route: 
#### URL: /store/addproduct?name=`Product Name`&price=`Product Price`&category=`Catagory id`
- name
- price
- category (related to Catagory Data Table using ID)

      console.log('name is undefined');
    if (price == 'undefined') {
    if (category == 'undefined') {

## 6. Cart route: 
#### URL: /store/cart?products=[`product1_id, product2_id`]&amounts[`product1_amount, product2_amount`]
- Products id (related to Products Data Table using ID)
- Amounts
