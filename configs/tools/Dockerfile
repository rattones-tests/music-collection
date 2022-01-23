FROM phpdockerio/php:8.1-fpm
WORKDIR "/application"

RUN apt-get update && \
    apt-get -y --no-install-recommends install \
        git \ 
        curl \
        php8.1-intl \ 
        php8.1-mysql \ 
        php8.1-ssh2 \ 
        php8.1-xdebug && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get update && \
    apt-get -y install nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
