FROM golang:alpine
RUN apk add --no-cache git

WORKDIR /app
COPY ./app/. .
CMD go run main.go
#ENTRYPOINT ["./app"]
EXPOSE 8080
