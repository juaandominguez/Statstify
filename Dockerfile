FROM node:22.6.0

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    git \
    unzip

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

RUN bun install

ENV SPOTIFY_BASE_API_URL=""
ENV SPOTIFY_CLIENT_ID=""
ENV SPOTIFY_CLIENT_SECRET=""
ENV NEXTAUTH_SECRET=""
ENV NEXTAUTH_URL=""
ENV NEXT_PUBLIC_URL=""

CMD ["bun", "run", "build", "&&", "bun", "start"]