### **How to create a lambda layer**

```
mkdir packages
cd packages
python3 -m venv venv
source venv/bin/activate

mkdir python
cd python
pip install redis -t .

rm -rf *dist-info
cd..
zip -r requirements-package.zip python
```

### **Dissecting the time taken to complete a single request**

```
$ echo ping | nc elasticache-redis-7.znqxo6.0001.euw1.cache.amazonaws.com 6379
+PONG
```

```
echo ping | strace -f -tttt -r -e trace=execve,socket,open,recvfrom,sendto nc elasticache-redis-7.znqxo6.0001.euw1.cache.amazonaws.com 6379

```

### **In parallel to the command above, tcpdump was in execution and returned:**

```
sudo tcpdump -i any -nn port 6379 -tt
```

```
echo ping | strace -f -tttt -r -e trace=execve,socket,open,recvfrom,sendto nc elasticache-redis-7.znqxo6.0001.euw1.cache.amazonaws.com 6379
```

```
1708621747.765232 (+     0.000000) execve("/usr/bin/nc", ["nc", "elasticache-redis-7.znqxo6.0001."..., "6379"], 0x7fff47e726d8 /* 59 vars */) = 0
1708621747.767477 (+     0.002215) socket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC|SOCK_NONBLOCK, 0) = 3
1708621747.767662 (+     0.000180) socket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC|SOCK_NONBLOCK, 0) = 3
1708621747.770346 (+     0.002685) socket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC|SOCK_NONBLOCK, 0) = 3
1708621747.770486 (+     0.000137) socket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC|SOCK_NONBLOCK, 0) = 3
1708621747.770909 (+     0.000424) socket(AF_INET, SOCK_DGRAM|SOCK_CLOEXEC|SOCK_NONBLOCK, IPPROTO_IP) = 3
1708621747.784468 (+     0.013561) recvfrom(3, "h=\201\200\0\1\0\1\0\0\0\1\23elasticache-redis-7"..., 2048, 0, {sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("127.0.0.53")}, [28 => 16]) = 101
1708621747.798493 (+     0.014025) recvfrom(3, "\207 \201\200\0\1\0\0\0\1\0\1\23elasticache-redis-7"..., 65536, 0, {sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("127.0.0.53")}, [28 => 16]) = 163
1708621747.798723 (+     0.000227) socket(AF_INET, SOCK_STREAM|SOCK_NONBLOCK, IPPROTO_TCP) = 3
1708621750.879022 (+     3.080309) +++ exited with 1 +++

```
