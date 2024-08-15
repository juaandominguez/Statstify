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

RUN --mount=type=secret,id=SPOTIFY_BASE_API_URL \
    --mount=type=secret,id=SPOTIFY_CLIENT_ID \
    --mount=type=secret,id=SPOTIFY_CLIENT_SECRET \
    --mount=type=secret,id=NEXTAUTH_SECRET \
    --mount=type=secret,id=NEXTAUTH_URL \
    --mount=type=secret,id=NEXT_PUBLIC_URL \
    bun run build

CMD ["bun", "start"]