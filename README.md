docker build -t brudiubo/iot --build-arg HTTP_PROXY=%HTTP_PROXY% --build-arg HTTPS_PROXY=%HTTPS_PROXY% .
docker run --rm -p 8080:8080 brudiubo/iot
