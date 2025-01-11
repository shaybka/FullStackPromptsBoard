# PromptBoard

This project is a Prompt Management API built with Node.js, Express, and MongoDB. It allows users to register, log in, create prompts, update prompts, delete prompts, and search for prompts by title. Users can also retrieve all prompts created by a specific user.

## Features

- User registration and login
- Create, update, delete prompts
- Search prompts by title
- Retrieve all prompts created by a specific user

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Multer for file uploads 
- Cloudinary for image storage 

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/prompt-management-api.git
    cd prompt-management-api
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following environment variables:

    ```env
    MONGODB_URI=mongodb://localhost:27017/prompt-management
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the server:

    ```sh
    npm start
    ```

    The server will start on `http://localhost:8000`.

## API Endpoints

### User Registration

- **URL**: `/api/user/register-user`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:

    ```json
    {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "Test@1234"
    }
    ```

### User Login

- **URL**: `/api/user/login-user`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:

    ```json
    {
        "email": "testuser@example.com",
        "password": "Test@1234"
    }
    ```

### Create a Prompt

- **URL**: `/api/prompt/create-prompt`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your-token>`
    - `Content-Type: application/json`
- **Body**:

    ```json
    {
        "title": "Sample Prompt",
        "content": "This is a sample prompt content.",
        "tags": "sample, prompt"
    }
    ```

### Get All Prompts

- **URL**: `/api/prompt/all-prompts`
- **Method**: `GET`
- **Headers**: `Content-Type: application/json`

### Update a Prompt

- **URL**: `/api/prompt/update-prompt/:id`
- **Method**: `PUT`
- **Headers**:
    - `Authorization: Bearer <your-token>`
    - `Content-Type: application/json`
- **Body**:

    ```json
    {
        "title": "Updated Prompt Title",
        "content": "This is the updated content of the prompt.",
        "tags": "updated, prompt"
    }
    ```

### Delete a Prompt

- **URL**: `/api/prompt/delete-prompt/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <your-token>`

### Search Prompts by Title

- **URL**: `/api/prompt/search-prompts?title=<keyword>`
- **Method**: `GET`
- **Headers**: `Content-Type: application/json`

### Get Prompts by User

- **URL**: `/api/prompt/user-prompts/:userId`
- **Method**: `GET`
- **Headers**: `Content-Type: application/json`

## Testing with Postman

1. **User Registration**:
    - **Request Type**: `POST`
    - **URL**: `http://localhost:8000/api/user/register-user`
    - **Headers**: `Content-Type: application/json`
    - **Body**:

        ```json
        {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "Test@1234"
        }
        ```

2. **User Login**:
    - **Request Type**: `POST`
    - **URL**: `http://localhost:8000/api/user/login-user`
    - **Headers**: `Content-Type: application/json`
    - **Body**:

        ```json
        {
            "email": "testuser@example.com",
            "password": "Test@1234"
        }
        ```

    - **Response**: Copy the token from the response.

3. **Create a Prompt**:
    - **Request Type**: `POST`
    - **URL**: `http://localhost:8000/api/prompt/create-prompt`
    - **Headers**:
        - `Authorization: Bearer <your-token>`
        - `Content-Type: application/json`
    - **Body**:

        ```json
        {
            "title": "Sample Prompt",
            "content": "This is a sample prompt content.",
            "tags": "sample, prompt"
        }
        ```

4. **Get All Prompts**:
    - **Request Type**: `GET`
    - **URL**: `http://localhost:8000/api/prompt/all-prompts`
    - **Headers**: `Content-Type: application/json`

5. **Update a Prompt**:
    - **Request Type**: `PUT`
    - **URL**: `http://localhost:8000/api/prompt/update-prompt/:id`
    - **Headers**:
        - `Authorization: Bearer <your-token>`
        - `Content-Type: application/json`
    - **Body**:

        ```json
        {
            "title": "Updated Prompt Title",
            "content": "This is the updated content of the prompt.",
            "tags": "updated, prompt"
        }
        ```

6. **Delete a Prompt**:
    - **Request Type**: `DELETE`
    - **URL**: `http://localhost:8000/api/prompt/delete-prompt/:id`
    - **Headers**: `Authorization: Bearer <your-token>`

7. **Search Prompts by Title**:
    - **Request Type**: `GET`
    - **URL**: `http://localhost:8000/api/prompt/search-prompts?title=<keyword>`
    - **Headers**: `Content-Type: application/json`

8. **Get Prompts by User**:
    - **Request Type**: `GET`
    - **URL**: `http://localhost:8000/api/prompt/user-prompts/:userId`
    - **Headers**: `Content-Type: application/json`

