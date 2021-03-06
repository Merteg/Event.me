from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application."""

    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('cornice')
    config.include('pyramid_mailer')
    config.include('.models')
    config.include('.security')
    config.scan()
    return config.make_wsgi_app()
