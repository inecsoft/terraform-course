FROM docker.elastic.co/beats/metricbeat:7.13.2
COPY ./metricbeat/config/metricbeat.yml /usr/share/metricbeat/metricbeat.yml
USER root
RUN chown root:metricbeat /usr/share/metricbeat/metricbeat.yml
USER metricbeat