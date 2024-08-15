FROM ubuntu:24.10

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    bash \
    git

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

RUN bun install

RUN bun run build

CMD ["bun", "start"]