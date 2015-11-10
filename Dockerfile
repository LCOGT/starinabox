FROM centos:7
MAINTAINER LCOGT Webmaster <webmaster@lcogt.net>

EXPOSE 80
ENTRYPOINT [ "/init" ]

# default prefix
ENV PREFIX /siab

# install packages
RUN yum -y install epel-release \
        && yum -y install nginx supervisor \
        && yum -y update \
        && yum -y clean all

# webserver configuration
COPY docker/processes.ini /etc/supervisord.d/processes.ini
COPY docker/nginx/* /etc/nginx/
COPY docker/init /init

# copy webapp files
COPY . /var/www/siab/
