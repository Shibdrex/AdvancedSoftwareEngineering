# healthcheck.py
import sys
import http.client

try:
    conn = http.client.HTTPConnection("localhost", 5000)
    conn.request("GET", "/")
    response = conn.getresponse()
    if response.status == 200:
        sys.exit(0)  # success
    else:
        sys.exit(1)  # fail if response is not 200
except Exception:
    sys.exit(1)  # fail on exception
