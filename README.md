# SCRYPTS

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

## 4. Build & Run: to build project 
#### TERMINAL: `npm run build`
- Build Project

## 5. Build & Run: to run jasmine test 
#### TERMINAL: `npm run jasmine`
- Run Test

## 5. Build & Run: to run jasmine test 
#### TERMINAL: `npm run test`
- Run Full Test

## 5. Build & Run: to run eslint 
#### TERMINAL: `npm run lint`
- Clean Codes

## 5. Build & Run: to run prettier 
#### TERMINAL: `npm run prettier`
- Clean Codes

## 5. Build & Run: to clean codes 
#### TERMINAL: `npm run clean`
- Clean Codes 

## 5. Build & Run: to clear test result
#### TERMINAL: `npm run clear_test`
- Clear Test Result

## 5. Build & Run: 
#### TERMINAL: `npm run watch`


# Routes

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

## 2. Users route: veiw all users account (view only)
#### URL: /users

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

## 6. Cart route: 
#### URL: /store/cart?products=[`product1_id, product2_id`]&amounts[`product1_amount, product2_amount`]
- Products id (related to Products Data Table using ID)
- Amounts

# Setup db and server instructions

## Server Port: 3000
## Databast Port: 5432

