FROM node:lts-alpine

RUN apk update && \
	apk add --no-cache wget curl

RUN	LATEST_VERSION=$(wget -O - "https://api.github.com/repos/open-policy-agent/conftest/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/' | cut -c 2-) && \
	ARCH=x86_64 && \
	SYSTEM=linux && \
	wget "https://github.com/open-policy-agent/conftest/releases/download/v${LATEST_VERSION}/conftest_${LATEST_VERSION}_${SYSTEM}_${ARCH}.tar.gz" && \
	tar xz -C /usr/local/bin -f conftest_${LATEST_VERSION}_${SYSTEM}_${ARCH}.tar.gz

RUN curl -L -o /usr/local/bin/opa https://openpolicyagent.org/downloads/latest/opa_linux_amd64_static

