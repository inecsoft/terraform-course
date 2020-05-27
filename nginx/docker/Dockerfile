From centos
MAINTAINER inecsoft inecsoft@inecsoft.co.uk

RUN dnf -y install nginx \
                      git \
                      gcc \
                      make \
                      automake \
                      curl \
                      curl-devel \
                      httpd-devel \
                      autoconf \
                      libtool \
                      pcre \
                      pcre-devel \
                      libxml2 \
                      libxml2-devel

#Compiling ModSecurity code
RUN git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity

RUN cd ModSecurity 
RUN ./build.sh 
RUN ./configure 
RUN make 
RUN make install

#Compile ModSecurity connector for NGINX as a dynamic module
RUN git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git

RUN echo "server { \
    listen 80;\
    location / {\
        proxy_pass http://localhost:8080;\
        proxy_set_header Host $host;\
    }\
}" >> /etc/nginx/conf.d/proxy.conf

#reload nginx config
RUN sudo nginx -s reload

#test version
RUN nginx -v

RUN sed -ie "4 a load_module modules/ngx_http_modsecurity_module.so;" /etc/nginx/nginx.conf

EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]