import unittest
# import subprocess
# import time
from flask import Flask
from NewsAPI_manager import NewsManager

class NewsApiManagerTests(unittest.TestCase):
    news_manager = NewsManager()
    @classmethod
    def setUpClass(cls):
        # Starte den Docker-Container
        # cls.docker_process = subprocess.Popen(["docker", "run", "--name", "news_api_container", "-d", "news_api_dock:1.0"])
        # time.sleep(5)  # Warte kurz, um sicherzustellen, dass der Container vollständig gestartet ist

        # Initialisiere die Flask-Anwendung
        cls.app = Flask(__name__)
        cls.app_context = cls.app.app_context()
        cls.app_context.push()  # Push den Kontext

    @classmethod
    def tearDownClass(cls):
        # Stoppe den Docker-Container
        # subprocess.run(["docker", "stop", "news_api_container"])
        # subprocess.run(["docker", "rm", "news_api_container"])
        cls.app_context.pop()  # Pop den Kontext

    def test_sport(self):
        try:
            self.news_manager.get_news('sport')
            print("Sport Success")
        except Exception as e:
            print(f"Error for Sport: {e}")

    def test_inland(self):
        try:
            self.news_manager.get_news('inland')
            print("Inland Success")
        except Exception as e:
            print(f"Error for Inland: {e}")

    def test_ausland(self):
        try:
            self.news_manager.get_news('ausland')
            print("Ausland Success")
        except Exception as e:
            print(f"Error for Ausland: {e}")

    def test_wirtschaft(self):
        try:
            self.news_manager.get_news('wirtschaft')
            print("Wirtschaft Success")
        except Exception as e:
            print(f"Error for Wirtschaft: {e}")

    def test_video(self):
        try:
            self.news_manager.get_news('video')
            print("Video Success")
        except Exception as e:
            print(f"Error for Video: {e}")

    def test_investigativ(self):
        try:
            self.news_manager.get_news('investigativ')
            print("Investigativ Success")
        except Exception as e:
            print(f"Error for Investigativ: {e}")

    def test_wissen(self):
        try:
            self.news_manager.get_news('wissen')
            print("Wissen Success")
        except Exception as e:
            print(f"Error for Wissen: {e}")

if __name__ == '__main__':
    unittest.main()
