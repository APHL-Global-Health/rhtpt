
## Dependencies

- PHP >= 5.6.4
- Composer
- Laravel Framework 5.3
- Maria DB / MySQL
- Web server

## Setup Guide

1. Maria DB / MySQL
  - Create a new blank database
  - Create a database user with full permissions over the database
2. Clone this repository (*where HIV_RAPID_PT_HOME represents the folder you are cloning to*).
  ```
  git clone git@github.com:APHL-Global-Health/HIV-Rapid-PT.git HIV_RAPID_PT_HOME
  ```
3. Install Laravel and other PHP dependencies
  ```
   cd HIV_RAPID_PT_HOME
   composer dumpautoload
   composer update
  ```
4. Create a configuration file (.env) and update the relevant details
  ```
   cd HIV_RAPID_PT_HOME
   cp .env.example .env
  ```
  - make the requisite changes to this file such as database and email details: host, port, name, access credentials
  - create the application key
    ```
    php artisan key:generate
    ```
  - create and seed the database
    ```
    php artisan migrate --seed
    ```
  - Point your web server to the `HIV_RAPID_PT_HOME/public' folder.
    - Ensure that the webserver user has write permissions to:
      - `HIV_RAPID_PT_HOME/storage`s
      - `HIV_RAPID_PT_HOME/bootstrap/cache`

## Contributing

Thank you for considering contributing to the HIV Rapid PT system! Send a pull request and we'll check it out. A detailed contribution guide should be out soon!

## License

The HIV Rapid PT system is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
