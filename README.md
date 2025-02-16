# Project: CoderCo Assignment 1 - Open Source App Hosted on Azure with Terraform

## Overview

This project mirrors the AWS ECS-based setup, but we will now deploy the open-source app on Azure using Azure Container Apps (or alternatively, AKS for greater flexibility).

The goal is to package, build, and deploy an application using Terraform and CI/CD pipelines, ensuring best practices in infrastructure as code, security, and scalability.

## Task/Assignment

- Create a repository for your work.
- Containerize the app and push it to Azure Container Registry (ACR).
- Use a CI/CD pipeline (GitHub Actions, Azure DevOps, or another) to build, test, and push the container image.
- Deploy the app on Azure using Terraform:
  - Azure Container Apps
- Expose the application via HTTPS using Azure Application Gateway or Azure Front Door.
- Ensure the app is available at:
  - https://tm.<your-domain>.co.uk or
  - https://tm.labs.<your-domain>.co.uk
- Add screenshots of the live app to the README.md.
- Include an architecture diagram of your infrastructure (Lucidchart, draw.io, or Mermaid).

## Guidance & Hints

### Directory Structure

- `terraform/` - Terraform configuration for Azure resources. Use modules for reusable components.
- `app/` -  App code and Dockerfile.
- `.github/workflows/` - CI/CD pipeline configuration (GitHub Actions). Or any other CI/CD tool you want to use.
- `docs/` - Documentation for the project. Diagrams/Architectures.
- `README.md` - Project documentation.

### Local app

```bash
cd app

### create a virtual environment
python3 -m venv .venv

source .venv/bin/activate
pip3 install -r requirements.txt
### run the app
python3 app.py ## python3 app.py

## Build Dockerfile

docker build -t coderco-task-manager .

docker run -p 3000:3000 coderco-task-manager
```
