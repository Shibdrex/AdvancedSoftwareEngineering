from flask import Blueprint, request, jsonify, send_file
from eleven_labs_manager import ElevenLabsManager
from auth_valid_manager import AuthorizationValidationManager

# Define this file as a Blueprint for flask
routes = Blueprint('routes', __name__)
# Instantiate managers
elevenlabs_manager = ElevenLabsManager()
authorization_validation_manager = AuthorizationValidationManager()

# Route to generate audio and then play it in request source
@routes.route('/text-to-sound-file-play', methods=['POST'])
def generate_sound_file_play():
    # Get text and voice from request body
    input_text, voice = request.json['input_text'], request.json['voice']
    # Get request headers and perform check
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        input_text = input_text,
        voice = voice
    )
    if not message == None:
        return jsonify(message), status
    try:
        # Give text and voice to elevenlabs and save audio
        tts_file = elevenlabs_manager.text_to_audio(
            input_text = input_text,
            voice = voice,
            save_as_wave = True
        )
        # Send audio file as a response, will play automaticly
        return send_file(tts_file, mimetype = 'audio/wav'), 200
    except RuntimeError:
        return jsonify({"message": "Something went wrong"}), 500

# Route to generate audio and then play it via elevenlabs
@RuntimeWarning
@routes.route('/text-to-sound-played', methods=['POST'])
def generate_sound_played():
    # Get text and voice from request body
    input_text, voice = request.json['input_text'], request.json['voice']
    # Get request headers and perform check
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        input_text = input_text,
        voice = voice
    )
    if not message == None:
        return jsonify(message), status
    try:
        # Give text and voice to elevenlabs, which after generating audio plays it
        elevenlabs_manager.text_to_audio_played(
            input_text = input_text,
            voice = voice
        )
        # Inform request source about success
        return jsonify({"message": "Request successful, voice being played"}), 200
    except NotImplementedError:
        return jsonify({"message": "Not implemented function"}), 501

# Route to generate audio and then stream it via elevenlabs
@RuntimeWarning
@routes.route('/text-to-sound-streamed', methods=['POST'])
def generate_sound_streamed():
    # Get text and voice from request body
    input_text, voice = request.json['input_text'], request.json['voice']
    # Get request headers and perform check
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        input_text = input_text,
        voice = voice
    )
    if not message == None:
        return jsonify(message), status
    try:
        # Give text and voice to elevenlabs, which after generating audio streams it
        elevenlabs_manager.text_to_audio_streamed(
            input_text = input_text,
            voice = voice
        )
        # Inform request source about success
        return jsonify({"message": "Request successful, voice being streamed"}), 200
    except NotImplementedError:
        return jsonify({"message": "Not implemented function"}), 501

# Route to generate audio and return it as file to request source
@routes.route('/text-to-sound-file', methods=['GET'])
def generate_sound_file():
    # Get text and voice from request body
    input_text, voice = request.json['input_text'], request.json['voice']
    # Get request headers and perform check
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        input_text = input_text,
        voice = voice
    )
    if not message == None:
        return jsonify(message), status
    save_as_wave = request.json['save_as_wave']
    # Set mimetype for http-response
    if save_as_wave:
        mimetype = 'audio/wav'
    else:
        mimetype = 'audio/mp3'
    # Generate file and send as wav
    # No need to specify save_as_wave as default is true
    if save_as_wave == None or not save_as_wave == bool:
        tts_file = elevenlabs_manager.text_to_audio(
            input_text = input_text,
            voice = voice
        )
        return send_file(tts_file, as_attachment=True, mimetype = mimetype), 200
    # Generate file and send as mp3
    tts_file = elevenlabs_manager.text_to_audio(
        input_text = input_text,
        voice = voice,
        save_as_wave = save_as_wave
    )
    return send_file(tts_file, as_attachment=True ,mimetype = mimetype), 200

