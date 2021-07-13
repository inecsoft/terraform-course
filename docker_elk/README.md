apt-get install openjdk-8 -y
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.13.2-linux-x86_64.tar.gz
dpkg -i .deb

curl localhost:9200/_cat/indices?v

curl -X GET "localhost:9200/_cat/nodes?v&pretty"
docker-compose build
docker-compose up -d
docker-compose down --remove-orphans
curl -XPOST -H 'Content-Type: application/json' http://localhost:9200/_template/metricbeat-7.13.3 -d@metricbeat.template.json
./metricbeat setup --index-management -E output.logstash.enabled=false -E 'output.elasticsearch.hosts=["es01:9200"]'