# -*- coding: utf-8 -*-

import socket

def discover(configuration_endpoint, time_to_timeout=None):
    host, port = configuration_endpoint.split(':')
    configs = []
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    if time_to_timeout is not None:
        sock.settimeout(time_to_timeout)

    try:
        sock.connect((host, int(port)))
        sock.sendall(b'config get cluster\r\n')
        data = b''
        while True:
            buf = sock.recv(1024);
            data += buf
            if data[-5:] == b'END\r\n':
                break

        lines = data.split(b'\n')

        # 0: CONFIG cluster 0 134
        # 1: configversion\r\n
        # 2: hostname|ip-address|port hostname|ip-address|port ...\r\n
        # 3:
        # 4: END
        # 5: blank
        configs = [conf.split(b'|') for conf in lines[2].split(b' ')]

        sock.sendall(b'quit\r\n')
    finally:
        sock.close()

    return configs


if __name__ == '__main__':
    import sys

    memcache_servers = discover(sys.argv[1])
    print(memcache_servers)
