FROM python:3.8

WORKDIR /hub_api

COPY services/hub_server/Pipfile .
COPY services/hub_server/hub ./hub
COPY services/hub_server/hub_tests ./hub_tests
COPY services/hub_server/Makefile .
COPY services/hub_server/.pylintrc .
COPY services/hub_server/.env .

RUN ls -la

RUN pip install pipenv
RUN pipenv install --dev --skip-lock
EXPOSE 5001

ENV FLASK_APP=hub.webapp:app
ENV FLASK_ENV=development
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["make","run_hub"]