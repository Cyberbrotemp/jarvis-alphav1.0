import t1 from "@/assets/tool1.jpg";
import t2 from "@/assets/tool-2.jpg";
import t3 from "@/assets/tool-3.jpg";
import t4 from "@/assets/tool-4.jpg";
import t5 from "@/assets/tool-5.jpg";
import t6 from "@/assets/tool-6.jpg";

// Edit this URL to set your global looping intro video.
// Leave empty string "" to fall back to the thumbnail image.
export const INTRO_VIDEO_URL = "https://github.com/Cyberbrotemp/videos/raw/refs/heads/main/ironman.mp4";
export const INTRO_FALLBACK_IMAGE = t1;

export type Tool = {
  id: string;
  name: string;
  short: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  exeUrl: string;        // unique GitHub URL for .exe
  sourceUrl: string;     // unique GitHub URL for source code
  sourcePassword: string;
  hardware: string[];
  packages: string[];
  duration: string;
  views: string;
};

export const TOOLS: Tool[] = [
  {
    id: "LockUnlockSound",
    name: "LockUnlockSound For Windows 10/11",
    short: "This is the lock unlock sound voice notifier windows 10/11",
    description:
      "This is the lock unlock sound voice notifier windows 10/11 . Educational purposes only.",
    thumbnail: t1,
    videoUrl: "https://cdn.coverr.co/videos/coverr-a-developer-typing-on-a-laptop-9070/1080p.mp4",
    exeUrl: "https://github.com/Tony-stark-Naveen/LockUnclokSound/releases/tag/jarvislockunlocksound",
    sourceUrl: "#",
    sourcePassword: "avenger",
    hardware: ["Windows 10/11 64-bit", "4GB RAM minimum", "speaker(Inbuild or External)", "Intel i3(Goverment-Laptop) or AMD PRO A4-3350B APU with Radeon R4 Graphics (4 CPUs),2.0GHz"],
    packages: ["pywin32, pystray, pillow, requests"],
    duration: "12:45",
    views: "",
  },
  {
    id: "voice-assistant",
    name: "Jarvis Voice Assistant",
    short: "Talk to your own AI assistant",
    description:
      "A voice-controlled assistant inspired by JARVIS. Recognizes speech, responds with TTS, and runs commands. Educational purposes only.",
    thumbnail: t2,
    videoUrl: "https://cdn.coverr.co/videos/coverr-a-glowing-microphone-on-a-stand-2629/1080p.mp4",
    exeUrl: "https://github.com/jarvis-hub/voice-assistant-bin/releases/download/v2.1/JarvisVoice.exe",
    sourceUrl: "https://github.com/jarvis-hub/voice-assistant-code",
    sourcePassword: "voice@jarvis99",
    hardware: ["Windows 10/11", "Microphone", "Speakers / Headphones", "8GB RAM"],
    packages: ["speechrecognition", "pyttsx3", "pyaudio", "openai", "requests"],
    duration: "08:12",
    views: "890K",
  },
  {
    id: "object-detection",
    name: "AI Object Detection",
    short: "YOLO-based real-time object detector",
    description:
      "Real-time object detection using YOLOv8. Draws bounding boxes around detected objects with confidence scores. Educational purposes only.",
    thumbnail: t3,
    videoUrl: "",
    exeUrl: "https://github.com/jarvis-hub/object-detect-release/releases/download/v3.0/ObjectDetect.exe",
    sourceUrl: "https://github.com/jarvis-hub/object-detect-src",
    sourcePassword: "yolo#detect7",
    hardware: ["Windows 10/11", "NVIDIA GPU recommended", "8GB RAM", "4GB VRAM"],
    packages: ["ultralytics", "opencv-python", "torch", "torchvision", "pillow"],
    duration: "15:30",
    views: "2.4M",
  },
  {
    id: "ocr-scanner",
    name: "OCR Text Scanner",
    short: "Extract text from any image instantly",
    description:
      "Optical character recognition tool that extracts text from images using Tesseract. Supports 100+ languages. Educational purposes only.",
    thumbnail: t4,
    videoUrl: "https://cdn.coverr.co/videos/coverr-typing-on-the-keyboard-of-a-laptop-7376/1080p.mp4",
    exeUrl: "https://github.com/jarvis-hub/ocr-scanner-exe/releases/download/v1.5/OCRScanner.exe",
    sourceUrl: "https://github.com/jarvis-hub/ocr-scanner-source",
    sourcePassword: "ocr@scan42",
    hardware: ["Windows 10/11", "2GB RAM", "Any CPU", "100MB disk"],
    packages: ["pytesseract", "pillow", "opencv-python", "numpy"],
    duration: "06:50",
    views: "540K",
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot Engine",
    short: "Build your own GPT-powered chatbot",
    description:
      "Conversational AI chatbot powered by language models. Customize personality and deploy locally. Educational purposes only.",
    thumbnail: t5,
    videoUrl: "",
    exeUrl: "https://github.com/jarvis-hub/chatbot-installer/releases/download/v4.2/ChatBot.exe",
    sourceUrl: "https://github.com/jarvis-hub/chatbot-engine-src",
    sourcePassword: "chat$bot88",
    hardware: ["Windows 10/11", "8GB RAM", "Internet connection", "GPU optional"],
    packages: ["openai", "transformers", "torch", "flask", "pillow"],
    duration: "18:22",
    views: "3.1M",
  },
  {
    id: "image-generator",
    name: "AI Image Generator",
    short: "Generate stunning art from text prompts",
    description:
      "Stable Diffusion-based image generator. Create AI art from text prompts locally. Educational purposes only.",
    thumbnail: t6,
    videoUrl: "https://cdn.coverr.co/videos/coverr-a-painters-hand-with-a-brush-7517/1080p.mp4",
    exeUrl: "https://github.com/jarvis-hub/imagegen-exe/releases/download/v2.0/ImageGen.exe",
    sourceUrl: "https://github.com/jarvis-hub/imagegen-source",
    sourcePassword: "image@gen21",
    hardware: ["Windows 10/11", "16GB RAM", "NVIDIA GPU 6GB+ VRAM", "20GB disk"],
    packages: ["diffusers", "torch", "transformers", "accelerate", "pillow"],
    duration: "22:10",
    views: "5.7M",
  },
];

export const getTool = (id: string) => TOOLS.find((t) => t.id === id);

export const DEVELOPER = {
  name: "Stark Naveen Prime",
  title: "Creator  of JARVIS AI Hub Tube",
  bio: "Commander of intelligent systems, full-stack tinkerer using chatgpt, Prompt by Stark Naveen Prime.",
  socials: [
    { name: "Instagram", url: "https://instagram.com/jarvisv1.0", handle: "@Stark_Naveen_Prime" },
    { name: "GitHub", url: "https://github.com/tony-stark-Naveen", handle: "tony-stark-Naveen" },
    { name: "YouTube", url: "https://youtube.com/@Stark_Naveen_Prime", handle: "@Stark_Naveen_Prime" },
    { name: "X / Twitter", url: "#", handle: "@None" },
  ],
  instagramAdmin: "https://instagram.com/jarvisv1.0",
};
