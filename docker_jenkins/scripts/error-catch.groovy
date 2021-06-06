
#!/usr/local/groovy-3.0.8/bin/groovy

environment = [1, 2 ,3]

try {
    def y = 1/0;
    println (y);
    println (environment[0]);
}
catch (ex) {
    println (ex)
}