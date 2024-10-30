from flask import Blueprint, request, jsonify
from speech_to_text_manager import SpeechToTextManager
from auth_valid_manager import AuthorizationValidationManager

import os

import soundfile as sf

# Define this file as a Blueprint for flask
routes = Blueprint('routes', __name__)
# Instantiate managers
speechtotext_manager = SpeechToTextManager()
authorization_validation_manager = AuthorizationValidationManager()

# Converts the input_file into a .wav file
def convert_wav(input_file, output_file, new_sample_rate=16000):
    # Read the input WAV file
    data, sample_rate = sf.read(input_file)

    # If the sample rate is different, resample the audio
    if sample_rate != new_sample_rate:
        # Resampling
        import scipy.signal
        number_of_samples = int(len(data) * new_sample_rate / sample_rate)
        resampled_data = scipy.signal.resample(data, number_of_samples)
    else:
        resampled_data = data

    # Write to the output WAV file
    sf.write(output_file, resampled_data, new_sample_rate)
    return output_file

# Route to start recording speech from mic and respond with text
@routes.route('/speech-to-text-mic', methods=['GET'])
def get_text_from_speech_mic():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
    )
    if not message == None:
        return jsonify(message), status
    try:
        stt_text = speechtotext_manager.speechtotext_from_mic()
        return jsonify(stt_text), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong", "error": stt_text}), 500

# Route to start recording speech from mic until stop key is pressed and respond with text
@routes.route('/speech-to-text-mic-continuous', methods=['GET'])
def get_text_from_speech_mic_continuous():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        stop_key = request.json['stop_key']
    )
    if not message == None:
        return jsonify(message), status
    try:
        stt_text = speechtotext_manager.speechtotext_from_mic_continuous(request.json['stop_key'])
        return jsonify(stt_text), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong"}), 500
    
# Route to transform audio file into text spoken in the file
@routes.route('/speech-to-text-file', methods=['POST'])
def get_text_from_speech_file():
    message, status = authorization_validation_manager.check_all(
       auth = request.headers.get('Auth'),
       user_agent = request.headers.get('User-Agent'),
       input_file = request.files['file']
    )
    if not message == None:
       return jsonify(message), status
    
    # Check if the request has the file part
    if 'file' not in request.files:
       return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Save the file if needed (optional)

    file.save(f"./{file.filename}")

    converted_file = convert_wav(f"./{file.filename}", f"./converted_{file.filename}")

    try:
        stt_text = speechtotext_manager.speechtotext_from_file(os.path.abspath(converted_file))
        return jsonify({"text": stt_text}), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong"}), 500
    
# Route to transform audio file into text spoken in the file
@routes.route('/speech-to-text-file-continuous', methods=['POST'])
def get_text_from_speech_file_continuous():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        input_file = request.json['input_file']
    )
    if not message == None:
        return jsonify(message), status
    try:
        stt_text = speechtotext_manager.speechtotext_from_file_continuous(request.json['input_file'])
        return jsonify(stt_text), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong"}), 500