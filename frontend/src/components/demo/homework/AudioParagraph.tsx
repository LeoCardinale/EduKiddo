// En src/components/demo/homework/AudioParagraph.tsx
import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

interface AudioParagraphProps {
    text: string;
    audioSrc: string;
    className?: string;
}

const AudioParagraph: React.FC<AudioParagraphProps> = ({ text, audioSrc, className = '' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            // Manejar errores de carga
            const handleError = (e: ErrorEvent) => {
                console.error('Error loading audio:', e);
                setHasError(true);
                setIsPlaying(false);
            };

            audioRef.current.addEventListener('error', handleError);
            return () => {
                audioRef.current?.removeEventListener('error', handleError);
            };
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current && !hasError) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // Intentar cargar y reproducir
                audioRef.current.load();
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error('Error playing audio:', error);
                        setHasError(true);
                        setIsPlaying(false);
                    });
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    return (
        <div className={`flex items-start gap-2 ${className}`}>
            {!hasError && (
                <button
                    onClick={togglePlay}
                    className="mt-1 text-blue-500 hover:text-blue-600 transition-colors"
                    title={isPlaying ? "Pausar audio" : "Reproducir audio"}
                >
                    {isPlaying ? (
                        <PauseCircle className="w-5 h-5" />
                    ) : (
                        <PlayCircle className="w-5 h-5" />
                    )}
                </button>
            )}
            <p>{text}</p>
            <audio
                ref={audioRef}
                onEnded={handleAudioEnd}
                className="hidden"
            >
                <source src={audioSrc} type="audio/mp3" />
                <source src={audioSrc} type="audio/wav" />
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};

export default AudioParagraph;