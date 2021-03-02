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

### __Create test table on test database__
```
mysql> create table test_database.test_table (id int, name varchar(50), address varchar(50), primary key (id)); 
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

***