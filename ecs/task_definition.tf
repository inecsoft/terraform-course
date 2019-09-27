data "aws_ecr_repository" "ecr_repository" {
  name = "myapp"
}

resource "aws_ecs_task_definition" "mywebsite" {
  family = "myapp"

  container_definitions = <<DEFINITION
[
  {
    "image": "${data.aws_ecr_repository.ecr_repository.repository_url}:1",
    "cpu": 128,
    "memory": 128,
    "memoryReservation": 64,
    "name": "website",
    "workingDirectory": "/app",
    "command": ["npm", "start"],
    "portMappings": [
        {
            "containerPort": 3000,
            "hostPort": 3000
        }
    ]
  }
]
DEFINITION

}
