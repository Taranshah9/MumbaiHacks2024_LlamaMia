import { forwardRef, useState } from 'react';
import { Search, Send, Mic, MicOff, Loader } from 'lucide-react';

// Voice Input Component
export const VoiceInput = ({ onVoiceInput, disabled }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [currentText, setCurrentText] = useState('');

  const startVoiceInput = () => {
    setError(null);
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice input is not supported in your browser');
      return;
    }

    try {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-US';

      newRecognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setCurrentText('');
      };

      newRecognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const newText = (currentText + ' ' + finalTranscript).trim();
        setCurrentText(newText);
        
        // Show both final and interim results
        const displayText = (newText + ' ' + interimTranscript).trim();
        onVoiceInput(displayText, false); // false indicates this is interim
      };

      newRecognition.onerror = (event) => {
        setError(`Voice input error: ${event.error}`);
        stopVoiceInput();
      };

      newRecognition.onend = () => {
        if (isListening) {
          newRecognition.start();
        } else if (currentText) {
          onVoiceInput(currentText, true); // true indicates this is final
        }
      };

      newRecognition.start();
      setRecognition(newRecognition);
    } catch (err) {
      setError('Failed to start voice input');
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    setIsListening(false);
    if (currentText) {
      onVoiceInput(currentText, true); // Send final text when stopping
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleVoiceInput}
        disabled={disabled}
        className={`p-2 rounded-full transition-all duration-200
                  ${isListening 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
                  disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      >
        {isListening ? (
          <MicOff size={20} className="animate-pulse" />
        ) : (
          <Mic size={20} />
        )}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {isListening && (
        <p className="text-xs text-red-500 animate-pulse ml-2">
          Listening... Click the mic icon to stop
        </p>
      )}
    </>
  );
};
