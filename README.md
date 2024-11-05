# Atemporal - Front End Project

**Atemporal** is a digital e-commerce platform that redefines the online shopping experience.  
Our platform, developed with React and Material UI, offers a unique shopping experience where fashion meets innovation. Every aspect of our website has been designed with our customers in mind

> This project is a web application offering inventory management, user login and registration, product reviews, cart functionality, payment options, and category-based product filtering. Built with React and Material UI, it runs in a Docker container to ensure a consistent and isolated environment..

---

## Table of Contents

1. [Installation](##installation)
2. [Usage](##usage)

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Pablo-1306/first-project.git
   cd first-project
   ```
2. **Prerequisites**
   Docker installed and running.

## Usage

### Docker Setup

1. **Build the Docker image from the project directory:**

```bash
  docker build -t atemporal-ui:v1.0.0 .
```

2. **Run the Docker Container:**

```bash
  docker run --name atemporal-ui -d -p 3000:3000 atemporal-ui:v1.0.0
```

3. **Access the Application**
   Once the container is running, open a web browser and navigate to http://localhost:3000 to access the application.
