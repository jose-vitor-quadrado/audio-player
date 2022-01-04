import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
    audioData: audios,
    currentAudio: {},
    currentTrack: 0,
    isPlaying: false,
    start() { 
        elements.get.call(this); 
        this.update();
    },
    play() {
        this.isPlaying = true;
        this.audio.play();
        this.playPause.innerText = "pause";
    },
    pause() {
        this.isPlaying = false;
        this.audio.pause();
        this.playPause.innerText = "play_arrow";
    },
    togglePlayPause() {
        if (this.isPlaying) this.pause();
        else this.play();
    },
    toggleMute() {
        this.audio.muted = !this.audio.muted;
        this.mute.innerText = this.audio.muted ? "volume_mute" : "volume_up";
    },
    next() {
        this.currentTrack++;
        if (this.currentTrack == this.audioData.length) this.restart();
        this.update();
        this.play();
    },
    setVolume(value) {
        this.audio.volume = value / 100;
        if (!this.audio.muted) this.mute.innerText = this.audio.volume > 0.49 ? "volume_up" : "volume_down";
    },
    setSeek(value) {
        this.audio.currentTime = value;
    },
    timeUpdate() {
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
        this.seekbar.value = this.audio.currentTime;
    },
    update() {
        this.currentAudio = this.audioData[this.currentTrack];
        this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        elements.createAudioElement.call(this, path(this.currentAudio.file));
        this.audio.onloadeddata = () => {
            elements.actions.call(this);
        };
    },
    restart() {
        this.currentTrack = 0;
        this.update();
    }
}