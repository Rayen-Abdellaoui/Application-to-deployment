pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = 'dockerhub-credentials'  // Jenkins credential ID for Docker Hub
        FRONTEND_IMAGE_NAME = 'rayenabd/frontend'
        BACKEND_IMAGE_NAME = 'rayenabd/backend'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Build Frontend Docker Image') {
            when {
                changeset "frontend/**"  // Trigger this stage if any file in the frontend directory changes
            }
            steps {
                script {
                    echo 'Building Frontend Docker Image...'
                    // Build the Frontend Docker image
                    sh "docker build -t ${FRONTEND_IMAGE_NAME}:${DOCKER_TAG} ./frontend"
                }
            }
        }

        stage('Push Frontend Docker Image') {
            when {
                changeset "frontend/**"  // Trigger this stage if any file in the frontend directory changes
            }
            steps {
                script {
                    echo 'Pushing Frontend Docker Image to Docker Hub...'
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }
                    // Push the Frontend Docker image to Docker Hub
                    sh "docker push ${FRONTEND_IMAGE_NAME}:${DOCKER_TAG}"
                }
            }
        }

        stage('Build Backend Docker Image') {
            when {
                changeset "backend/**"  // Trigger this stage if any file in the backend directory changes
            }
            steps {
                script {
                    echo 'Building Backend Docker Image...'
                    // Build the Backend Docker image
                    sh "docker build -t ${BACKEND_IMAGE_NAME}:${DOCKER_TAG} ./backend"
                }
            }
        }

        stage('Push Backend Docker Image') {
            when {
                changeset "backend/**"  // Trigger this stage if any file in the backend directory changes
            }
            steps {
                script {
                    echo 'Pushing Backend Docker Image to Docker Hub...'
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }
                    // Push the Backend Docker image to Docker Hub
                    sh "docker push ${BACKEND_IMAGE_NAME}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        always {
            // Clean up
            sh "docker logout"
        }
    }
}
