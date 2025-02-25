import requests
from requests.exceptions import RequestException
import re

def is_valid_url(url):
    # Simple regex to check if the URL is valid
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def check_url(url):
    if not is_valid_url(url):
        print(f"Invalid URL: {url}")
        return

    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f"URL is accessible: {url}")
        else:
            print(f"Failed to access URL: {url}, Status Code: {response.status_code}")
    except RequestException as e:
        print(f"Error accessing URL: {url}, Error: {e}")

if __name__ == "__main__":
    url = " http://127.0.0.1:8000/"  # Replace with the URL you want to check
    check_url(url)
