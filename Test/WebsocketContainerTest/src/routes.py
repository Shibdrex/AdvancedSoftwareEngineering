from flask import Blueprint, request, jsonify
import requests
import httpx


# Flask blueprint to define endpoints of our service
routes = Blueprint('routes', __name__)
url = "http://assistantstt-module:5000/speech-to-text-file"


@routes.route("/", methods=["GET"])
def root_response():
    request = request
    return jsonify({"message": "Request went through", "request": request}), 200




@routes.route("/upload", methods=["POST"])
async def upload_audio():
    if "file" not in request.files:
        return "No audio file uploaded", 400
    audio_file = request.files["file"]
    audio_file.save(audio_file.filename)
    file_path = f"{audio_file.filename}"
    async with httpx.AsyncClient() as client:
        with open(file_path, 'rb') as audio_file:
            files = {
                "file": ("audio.wav", audio_file, "audio/wav")
            }
            headers = {
                "User-Agent": "insomnia/10.1.0",
                "Auth": "testkey"
            }

            response = await client.post(url, headers=headers, files=files)
            print(response)
            if response.status_code == 200:
                print("File upload successfully!")
            else:
                print(f"Failed to upload file. Status code: {response.status_code}")
                print("Response:", response.text)
            return response.text, 200