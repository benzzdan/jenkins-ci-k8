podTemplate(
    label: 'mypod', 
    inheritFrom: 'default',
    containers: [
        containerTemplate(
            name: 'node', 
            image: 'node:lts-alpine',
            ttyEnabled: true,
            command: 'cat'
        ),
        containerTemplate(
            name: 'docker', 
            image: 'docker:18.02',
            ttyEnabled: true,
            command: 'cat'
        ),
        containerTemplate(
            name: 'helm', 
            image: 'ibmcom/k8s-helm:v2.6.0',
            ttyEnabled: true,
            command: 'cat'
        )
    ],
    volumes: [
        hostPathVolume(
            hostPath: '/var/run/docker.sock',
            mountPath: '/var/run/docker.sock'
        )
    ]
) 

{
    node('mypod') {
        def commitId
        stage ('Extract') {
            checkout scm 
            commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        }
        stage ('Build') {
            //TODO: Figure out more steps for building a more complex nodejs app
            container ('node') {
                sh 'npm install'
            }
        }
        def repository
        stage ('Docker') {
            container('docker') {
                sh "docker login -u wlobeos -p bd948155"
                sh "docker build -t wlobeos/nodehello-v2:${commitId} ."
                sh "docker push wlobeos/nodehello-v2:${commitId}" 
            }
        }

         stage ('Deploy') {
            container ('helm') {
                sh "/helm init --client-only --skip-refresh"
                sh "/helm upgrade --install --wait --set image.repository=wlobeos/nodehello-${commitId},image.tag=latest nodehello nodehello"
            }
        }

    }
}