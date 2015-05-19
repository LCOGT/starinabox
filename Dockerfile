# Build with
# docker build -t registry.lcogt.net/starinabox:latest .
#
# Push to Registry with
# docker push registry.lcogt.net/starinabox:latest
#
# Pull from Registry with (i.e. on a docknode)
# docker pull registry.lcogt.net/starinabox:latest
#
# To Start on docknode
# docker run -d -p 8300:80 -m="64m" --name=starinabox registry.lcogt.net/starinabox:latest

FROM centos:centos7
MAINTAINER Ira W. Snyder <isnyder@lcogt.net>

# install packages
RUN yum -y install epel-release \
        && yum -y install nginx supervisor \
        && yum -y update

# webserver configuration
COPY docker/processes.ini /etc/supervisord.d/processes.ini
COPY docker/nginx/* /etc/nginx/

# nginx on port 80
EXPOSE 80

# run under supervisord
ENTRYPOINT [ "/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf" ]

# copy webapp files
COPY . /var/www/html/
