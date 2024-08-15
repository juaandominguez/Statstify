FROM ubuntu:24.10

WORKDIR /app

COPY . .

RUN apt-get update && apt-get --no-install-recommends install -y \
    curl \
    unzip \
    bash \
    git

RUN curl --proto "=https" -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

RUN bun install

RUN bun run build

CMD ["bun", "start"]