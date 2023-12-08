import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../../services/shared-service';
@Component({
  selector: 'app-audio-processor',
  templateUrl: './audio-processor.component.html',
  styleUrls: ['./audio-processor.component.scss'],
})
export class AudioProcessorComponent implements OnInit, OnDestroy {
  private context?: AudioContext;
  private source?: MediaStreamAudioSourceNode;
  private processor?: ScriptProcessorNode;
  private streamLocal?: MediaStream;
  private webSocket?: WebSocket;
  private initComplete: boolean = false;
  private readonly bufferSize: number = 8192;
  private readonly sampleRate: number = 16000;
  private readonly wsURL: string = 'ws://localhost:2700';
  public inputText: string = '';
  public isRecording: boolean = false;
  @ViewChild('recordButton') recordButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('audioBar') audioBar!: ElementRef<HTMLDivElement>;
  constructor(private sharedService: SharedService) {}

  UpdateTextEditor(newText: string) {
    this.sharedService.updateText(newText);
  }
  ngOnInit(): void {
  }

  toggleRecording(): void {
    this.isRecording = !this.isRecording;
    console.log("i am recording");
    if (this.isRecording) {
      this.startListening();
    } else {
      this.stopListening();
      console.log("i stopped recording");
    }
  
    this.updateUI();
  }

  private startListening(): void {
    const listenButton = this.recordButton.nativeElement;
    // listenButton.disabled = true;

    this.initWebSocket();
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
          sampleRate: this.sampleRate,
        },
        video: false,
      })
      .then((stream) => this.handleSuccess(stream))
      .catch((error) => console.error('Error accessing media devices:', error));

    listenButton.style.color = '#E93A13';
    this.initComplete = true;
  }

  private stopListening(): void {
    console.log("i am stopping");
    const listenButton = this.recordButton.nativeElement;
    if (this.initComplete && this.webSocket) {
      listenButton.style.color = 'black';
      // listenButton.disabled = false;
      this.initComplete = false;
      this.webSocket.send(JSON.stringify({ eof: 1 }));
      this.webSocket.close();

      if (this.source && this.processor && this.context) {
        this.source.disconnect(this.processor);
        this.processor.disconnect(this.context.destination);
      }

      if (this.streamLocal && this.streamLocal.active) {
        this.streamLocal.getTracks().forEach((track) => track.stop());
      }

    }
  }

  private handleSuccess(stream: MediaStream): void {
    this.streamLocal = stream;
    this.context = new AudioContext({ sampleRate: this.sampleRate });
    this.source = this.context.createMediaStreamSource(stream);
    this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1);

    if (this.source && this.processor && this.context) {
      this.source.connect(this.processor);
      this.processor.connect(this.context.destination);

      this.processor.onaudioprocess = (
        audioDataChunk: AudioProcessingEvent
      ) => {
        this.sendAudio(audioDataChunk);
      };
    }
  }

  private sendAudio(audioDataChunk: AudioProcessingEvent): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      const inputData =
        audioDataChunk.inputBuffer.getChannelData(0) ||
        new Float32Array(this.bufferSize);
      const targetBuffer = new Int16Array(inputData.length);
      for (let index = inputData.length; index > 0; index--) {
        targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
      }
      this.webSocket.send(targetBuffer.buffer);
      const volume = this.calculateVolume(inputData);
      this.updateAudioVisualizer(volume);
    }
  }
  private calculateVolume(inputData: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < inputData.length; i++) {
      sum += inputData[i] * inputData[i];
    }
    return Math.sqrt(sum / inputData.length);
  }
  
  private updateAudioVisualizer(volume: number): void {
    const audioBarElem = this.audioBar.nativeElement;
    const newWidth = Math.min(100, volume * 1000); // Scale volume to a percentage
    audioBarElem.style.width = newWidth + '%';
  }

  private initWebSocket(): void {
    this.webSocket = new WebSocket(this.wsURL);
    this.webSocket.binaryType = 'arraybuffer';

    this.webSocket.onopen = () => {
      console.log('New connection established');
    };

    this.webSocket.onerror = (event) => {
      console.error('WebSocket Error:', event);
    };

    this.webSocket.onmessage = (event) => {
      if (event.data) {
        let parsed = JSON.parse(event.data);
        if (parsed.text) {
          console.log(parsed.text);
          this.inputText += ' ' + parsed.text;
          this.UpdateTextEditor(this.inputText);
        }
      }
    };
  }
  private updateUI(): void {
    const audioTimer = document.getElementById('audioTimer');
    const audioVisualizer = document.getElementById('audioVisualizer');

    if (this.isRecording) {
      // Update UI for recording state
      audioTimer!.innerText = 'Recording...'; // Update as needed
      // audioVisualizer!.style.width = '100%'; // Example, adjust as needed
    } else {
      // Update UI for non-recording state
      audioTimer!.innerText = '00:00'; // Reset timer
      // audioVisualizer!.style.width = '0'; // Reset visualizer
    }
  }
  ngOnDestroy(): void {
    if (this.isRecording) {
      this.stopListening();
    }
    if (this.context) {
      this.context.close();
    }
  }
  
}
