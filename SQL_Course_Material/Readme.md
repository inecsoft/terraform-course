***
# __Mysql administrator Course__

***

### __Inicialise the db__
```
docker-compose up -d
```

### __Distroy the db__
```
docker-compose up -d
```

### __Connect to the container__
```
docker exec -it sql_course_material_mysql-db-course_1 bash
```
```
mysql -u root -p
```
### __autentication method of root user is [auth_socket]__
```
mysql> select user,host,plugin from mysql.user; 
```

### __Show database list__
```
mysql> show databases; 
```

### __Create test database__
```
mysql> create database test_database;
```
### __Select database__
```
mysql> USE test_database;
```
### __Create test table on test database__
```
mysql> create table test_database.test_table (id int, name varchar(50), address varchar(50), primary key (id)); 
```
### __Show tables on test database__
```
mysql> show tables;
```
### __Insert data to test table__
```
mysql> insert into test_database.test_table(id, name, address) values("001", "CentOS", "Hiroshima"); 
```

### __Show test table__
```
mysql> select * from test_database.test_table;
```
### __Delete test database__
```
mysql> drop database test_database; 
```

### __Sample Clause order__
```
use sql_store;

select * 
from customers
-- where customer_id = 1
order by first_name;
```
### __How to create an alias with AS__
```
SELECT 
    last_name,
    first_name,
    points,
    (points + 10) * 100 AS 'discount factor'
FROM customers
ORDER BY first_name;
```
### __How to DISTINCT statement__
```
SELECT DISTINCT state 
FROM sql_store.customers;
```
### __How to WHERE statement AND & OR OPERATORS__
```
select * 
from customers
where birth_date > '1990-01-01' AND state != 'CA'
order by first_name;
```

```
select * 
from customers
where birth_date > '1990-01-01' or 
    points > 1000 and state = 'VA';
```

### __How to WHERE statement AND & NOT OPERATORS__
```
select * 
from customers
where not (birth_date > '1990-01-01'
     OR points > 1000);
```
```
select * 
from customers
where birth_date <= '1990-01-01'
    and points <= 1000;
```
### __How to use the IN, not IN vs OR statement__
```
select *
from customers
where state = 'VA' or state = 'FL' or state = 'GA';
```
```
select *
from customers
where state IN ('VA', 'FL', 'GA');
```
```
select *
from customers
where state not IN ('VA', 'FL', 'GA');
```
### __How to use Between statement__
```
select *
from customers
where birth_date between '1990-1-1' and '2000-1-1'; 
```
### __How to use LIKE statement__
```
select *
from customers
where last_name LIKE '%b%';  

-- % any amount of chars
-- _ any single char

```
```
select *
from customers
where address LIKE '%trial%' OR
      address LIKE '%avenue%';
```
```     
select *
from customers
where phone LIKE '%9'; 

```

### __How to use REGEXP statement__
```
select *
from customers
where last_name regexp '[gim]e';
-- match ge, ie, me
```
```
select *
from customers
where last_name regexp 'field$|mac|^rose';
-- match end with field or mac or start with rose
```

***
### __Local Port Forwarding__

note: ssh -L [LOCAL_IP:]LOCAL_PORT:DESTINATION:DESTINATION_PORT [USER@]SSH_SERVER
```
ssh -L 3336:db001.host:3306 user@pub001.host
mysql localhost -P 3336 -u username -p
```
***
### __Database tunning__

```
SELECT @@innodb_buffer_pool_size/1024/1024/1024;
select @@innodb_buffer_pool_chunk_size;
select @@innodb_buffer_pool_instances;

```

***