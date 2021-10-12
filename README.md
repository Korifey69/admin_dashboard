## Installation and launch

Clone repository
    ```
        git@github.com:Korifey69/admin_dashboard.git
    ```
Install npm modules
    ```
        npm install && npm install --dev
    ```
Run docker mongodb
    ```
        docker-compose up
    ```
Run app
    front-end
        ```
            npm run start
        ```
    back-end
        ```
            npm run start
        ```
You need to go to the docker container and insert data
    ```
        db.roles.insertMany([{value: "ADMIN"}, {value: "USER"}]);
    ```
Go to
    ```
        http://localhost:3000/login
    ```