server
======

Getting Started
---------------

- Change directory into your newly created project.

    cd server

- Create a Python virtual environment.

    python3 -m venv env

- Upgrade packaging tools.

    env/bin/pip install --upgrade pip setuptools

- Install the project in editable mode with its testing requirements.

    env/bin/pip install -e ".[testing]"

- Run your project's tests.

    env/bin/pytest

- Copy development.ini.sample to development.ini and fill credentails before first deployment:
    mail.host = smtp.gmail.com
    mail.username = "your email address"
    mail.password = "your password"
    mail.port = 465
    mail.ssl = True

    server/development.ini

- Run your project.

    env/bin/pserve development.ini
