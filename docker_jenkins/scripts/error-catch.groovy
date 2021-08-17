
#!/usr/bin/groovy
set JAVA_HOME=/usr/lib/jvm/java-1.11.0-openjdk-amd64

environment = [1, 2 ,3]

try {
    def y = 1/0;
    println (y);
    println (environment[0]);
}
catch (ex) {
    println (ex)
}