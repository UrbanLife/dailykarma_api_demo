FROM python:3.8.1-slim as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VERSION=1.0.9 \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/usr/src/app/"

ENV PATH="$POETRY_HOME/bin:$PATH"
#---------- [ BASE STAGE ] ----------
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential

RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
WORKDIR $PYSETUP_PATH

COPY ./poetry.lock ./pyproject.toml $PYSETUP_PATH
RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-dev --no-interaction --no-ansi

#---------- [ DEVELOPMENT STAGE ] ----------
FROM builder-base as development

COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH

WORKDIR $PYSETUP_PATH
RUN poetry install --no-interaction

EXPOSE $SERVER_PORT
CMD ["./docker-entrypoint.sh"]

#---------- [ PRODUCTION STAGE ] ----------
FROM python-base as production

COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH

WORKDIR $PYSETUP_PATH
COPY ./ ./

RUN chmod +x ./docker-entrypoint.sh

EXPOSE $SERVER_PORT
ENTRYPOINT ["./docker-entrypoint.sh"]
