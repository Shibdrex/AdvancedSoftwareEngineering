from elevenlabs import generate, stream, set_api_key, voices, play, save
import time
import os

# Set API-Key for elevenlabs, get value from environment variable
try:
    set_api_key(os.getenv('ELEVENLABS_API_KEY'))
except TypeError:
    exit("ELEVENLABS_API_KEY is not set as environment variable!")

# Class to manage the elevenlabs API, which is used to generate TTS voice
class ElevenLabsManager:

    # Initialize class and request all voices available in elevenlabs,
    # the request is necessary for unknown reason
    def __init__(self):
        all_voices = voices()
        print(f"\nAll ElevenLabs voices: \n{all_voices}\n")

    # Pass text to elevenlabs, specify voice (optional),
    # specify file format (optional), specify subdirectory for file saving (optional)
    # Elevenlabs returns audio, we then create a file to save it, return file reference
    def text_to_audio(self, input_text, voice="Aria", save_as_wave=True, subdirectory=""):
        audio_saved = generate(
            text = input_text,
            voice = voice,
            model = "eleven_multilingual_v2"
        )
        if save_as_wave:
            file_name = f"___Msg{str(hash(input_text))}.wav"
        else:
            file_name = f"___Msg{str(hash(input_text))}.mp3"
        tts_file = os.path.join(os.path.abspath(os.curdir), subdirectory, file_name)
        save(audio_saved, tts_file)
        return tts_file
    
    # Pass text to elevenlabs, specify voice (optional)
    # Call play method from elevenlabs-sdk to play audio
    # Will likely cause error, because it requires ffmpeg
    # which is not natively installed in system (container too)
    def text_to_audio_played(self, input_text, voice="Aria"):
        audio = generate(
            text = input_text,
            voice = voice,
            model = "eleven_multilingual_v2"
        )
        play(audio)
    
    # Pass text to elevenlabs, specify voice (optional)
    # Call stream method from elevenlabs-sdk to stream audio
    # Will likely cause error, because it requires mpv
    # which is not natively installed in system (container too)
    def text_to_audio_streamed(self, input_text, voice="Aria"):
        audio_stream = generate(
            text = input_text,
            voice = voice,
            model = "eleven_multilingual_v2",
            stream = True
        )
        stream(audio_stream)

# TESTS
if __name__ == '__main__':
    elevenlabs_manager = ElevenLabsManager()
    
    elevenlabs_manager.text_to_audio_streamed("This is test text for the audio streaming function", "Aria")
    time.sleep(2)
    elevenlabs_manager.text_to_audio_played("This is test text for the audio play function", "Aria")
    time.sleep(2)
    elevenlabs_manager.text_to_audio("This is test text for the audiofile saving function", "Aria")
    print("Tests: <finished>")

    time.sleep(5)