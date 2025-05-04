pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = 'rayenabd'
        DOCKERHUB_PASSWORD = credentials('docker_password') // Jenkins credentials ID
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    def lastCommit = sh(script: "git rev-parse HEAD^", returnStdout: true).trim()
                    def currentCommit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()

                    def diff = sh(script: "git diff --name-only ${lastCommit} ${currentCommit}", returnStdout: true).trim()
                    env.FRONTEND_CHANGED = diff.contains('frontend/')
                    env.BACKEND_CHANGED = diff.contains('backend/')
                }
            }
        }

        stage('Build and Push Frontend') {
            when {
                expression { env.FRONTEND_CHANGED == 'true' }
            }
            steps {
                script {
                    def tag = sh(script: "date +%Y%m%d%H%M%S", returnStdout: true).trim()
                    sh """
                        echo "${DOCKERHUB_PASSWORD}" | docker login -u "${DOCKERHUB_USERNAME}" --password-stdin
                        docker build -t rayenabd/frontend:${tag} ./frontend
                        docker push rayenabd/frontend:${tag}
                    """
                }
            }
        }

        stage('Build and Push Backend') {
            when {
                expression { env.BACKEND_CHANGED == 'true' }
            }
            steps {
                script {
                    def tag = sh(script: "date +%Y%m%d%H%M%S", returnStdout: true).trim()
                    sh """
                        echo "${DOCKERHUB_PASSWORD}" | docker login -u "${DOCKERHUB_USERNAME}" --password-stdin
                        docker build -t rayenabd/backend:${tag} ./backend
                        docker push rayenabd/backend:${tag}
                    """
                }
            }
        }
    }
}
