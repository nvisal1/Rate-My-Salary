# Rate My Salary

Rate My Salary is a web application that predicts a person's salary. It does this by passing a person's number of years of experience to a simple linear regression model.

## Development Environment

Simply run `docker-compose up` to start the development environment.
The source code for the client and REST API are attached as volumes for development ease.

This environment uses `./client/Dockerfile.dev` to build the client, not  `./client/Dockerfile`.
`./client/Dockerfile` uses NGINX and is used only in the production environment seen below.

## Retrain The Simple Linear Regression Model

To retrain the model, run 
`./Simple_Linear_Regression/simple_linear_regression.py <path-to-dataset>`.
This script will save the trained model to `./REST-API/model.sav`.

The original dataset can be found at `/Simple_Linear_Regression/Salary_Data.csv`.

## Production Environment

Although the app is not hosted, there is Kubernetes configuration for building a production environment. Follow the steps below to run the application with Minikube.

### Step 1: Install Minikube & Kubectl

kubectl docs: [https://kubernetes.io/docs/tasks/tools/install-kubectl/]

Minikube docs: [https://kubernetes.io/docs/tasks/tools/install-minikube/]

### Step 2: Start & Configure Minikube

Run `minikube start` to start Minikube

The production environment uses the Kubernetes Ingress found at [https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx).

In order to configure this Ingress with Minikube

run 
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml`

followed by 
`minikube addons enable ingress`

### Step 3: Apply K8s Objects Using Kubectl

Apply the entire `./K8S-Objects` directory by running 
`kubectl apply -f ./K8S-Objects`

Run `kubectl get pods` to ensure that the entire application is running

### Step 4: Visit The Application

Run `minikube ip` to get the IP of the VM.
To access the application, open your browser and paste the IP in the address bar.

## Docker Images

The production client image can be found at [https://hub.docker.com/repository/docker/nvisal1/rate-my-salary-client](https://hub.docker.com/repository/docker/nvisal1/rate-my-salary-client)

The prediction service image can be found at
[https://hub.docker.com/repository/docker/nvisal1/rate-my-salary-prediction-service](https://hub.docker.com/repository/docker/nvisal1/rate-my-salary-prediction-service)

A push to the master branch will trigger a Github Actions workflow to automatically update both of these images.

