import wave
from pydub import AudioSegment

def convert_to_wav(input_file, output_file):
    # Load audio file and export it as WAV
    audio = AudioSegment.from_file(input_file)
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    audio.export(output_file, format='wav')
    return output_file

print(convert_to_wav('recording.wav', 'recording_converted.wav'))

def validate_wav_file(file_path):
    try:
        with wave.open(file_path, 'rb') as wav_file:
            params = wav_file.getparams()
            print(f"Channels: {params.nchannels}, Sample Width: {params.sampwidth}, Frame Rate: {params.framerate}, Number of Frames: {params.nframes}, Compression Type: {params.comptype}")
            if params.nchannels != 1:
                print("Error: Audio file must be mono.")
            if params.sampwidth != 2:  # 16-bit
                print("Error: Audio file must be 16-bit.")
            if params.framerate not in (16000, 44100):
                print("Error: Audio file must have a sample rate of 16000 Hz or 44100 Hz.")
    except Exception as e:
        print(f"Failed to open the WAV file: {e}")

# Example usage
validate_wav_file('./recording_converted.wav')

