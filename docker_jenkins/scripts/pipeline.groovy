#!/usr/local/groovy-3.0.8/bin/groovy

pipeline {
    agent any
    stages {
        stage('Build shell with multiple commands') {
            timeout(time: 3, unit: 'MINUTES') {
            }

            steps {
                sh 'echo "Hello World"'
                sh '''
                    echo "Multiline shell steps works too"
                    ls -lah
                    which groovy
                    groovy -version
                    java -version
                '''
            }
        }
    }

    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
    
}