#!/usr/bin/python
import psycopg2

db_host = "lambdapgconnect.ctxoyiwkbtuq.us-east-1.rds.amazonaws.com"
db_port = 5432
db_name = "LambdaPGConnectDB"
db_user = "lambdapgconnect"
db_pass = "lambdapgconnect1234"
db_table = "estabs_tbl"

def create_conn():
    conn = None
    try:
        conn = psycopg2.connect("dbname={} user={} host={} password={}".format(db_name,db_user,db_host,db_pass))
    except:
        print("Cannot connect.")
    return conn
def fetch(conn, query):
    result = []
    print("Now executing: {}".format(query))
    cursor = conn.cursor()
    cursor.execute(query)
    raw = cursor.fetchall()
    for line in raw:
        result.append(line)
    return result
def lambda_handler(event, context):
    query_cmd = "select count(\*) from estabs_tbl"
    print(query_cmd)
    # get a connection, if a connect cannot be made an exception will be raised here
    conn = create_conn()
    result = fetch(conn, query_cmd)
    conn.close()
    return result
