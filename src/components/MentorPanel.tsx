import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { GREETING, mentorReply, type MentorTurn } from "@/lib/mentor-brain";
import { useVoiceMentor } from "@/lib/useVoiceMentor";
import { cn } from "@/lib/utils";

export function MentorPanel({ pendingPrompt }: { pendingPrompt?: string | null }) {
  const [turns, setTurns] = useState<MentorTurn[]>([{ role: "mentor", text: GREETING }]);
  const [input, setInput] = useState("");
  const [greeted, setGreeted] = useState(false);
  const { supported, speaking, listening, transcript, speak, stopSpeaking, startListening, stopListening } =
    useVoiceMentor();
  const scrollRef = useRef<HTMLDivElement>(null);

  const respond = (text: string) => {
    if (!text.trim()) return;
    const answer = mentorReply(text);
    setTurns((t) => [...t, { role: "you", text }, { role: "mentor", text: answer }]);
    speak(answer);
    setGreeted(true);
  };

  useEffect(() => {
    if (pendingPrompt) respond(pendingPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPrompt]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  // Browsers block autoplay speech; greet on the first user gesture.
  useEffect(() => {
    if (greeted) return;
    const onGesture = () => {
      setGreeted(true);
      speak(GREETING);
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    return () => window.removeEventListener("pointerdown", onGesture);
  }, [greeted, speak]);

  return (
    <section
      aria-label="AI mentor"
      className="relative rounded-3xl border border-primary/70 bg-card/70 p-6 shadow-brand-soft backdrop-blur"
    >
      <h2 className="text-center text-sm font-semibold tracking-wide">Ask your AI mentor anything</h2>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => (listening ? stopListening() : startListening((t) => respond(t)))}
          aria-label={listening ? "Stop listening" : "Start speaking"}
          className={cn(
            "flex size-16 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-secondary/70",
            listening && "bg-brand-gradient animate-pulse-ring border-transparent text-primary-foreground",
          )}
        >
          {listening ? <MicOff className="size-6" /> : <Mic className="size-6" />}
        </button>
        <button
          type="button"
          onClick={() => (speaking ? stopSpeaking() : speak(turns.filter((t) => t.role === "mentor").at(-1)!.text))}
          aria-label={speaking ? "Stop speaking" : "Replay answer"}
          className={cn(
            "flex size-11 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground",
            speaking && "text-primary",
          )}
        >
          {speaking ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </div>

      {speaking && (
        <div className="mt-4 flex items-end justify-center gap-1" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="animate-bar bg-brand-gradient h-5 w-1 origin-bottom rounded-full"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      )}

      <div ref={scrollRef} className="mt-5 max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
        {turns.map((turn, i) => (
          <p
            key={i}
            className={cn(
              "w-fit max-w-[85%] rounded-2xl px-4 py-2 leading-relaxed",
              turn.role === "mentor"
                ? "bg-secondary text-foreground"
                : "bg-brand-gradient ml-auto text-primary-foreground",
            )}
          >
            {turn.text}
          </p>
        ))}
        {listening && (
          <p className="ml-auto w-fit max-w-[85%] rounded-2xl border border-primary/50 px-4 py-2 text-muted-foreground">
            {transcript || "Listening…"}
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          respond(input);
          setInput("");
        }}
        className="mt-5 flex items-center gap-2 rounded-full border border-border bg-input px-4 py-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your mentor..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Send"
          className="bg-brand-gradient flex size-8 items-center justify-center rounded-full text-primary-foreground"
        >
          <ArrowUp className="size-4" />
        </button>
      </form>

      {!supported.recognition && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Voice input needs Chrome or Edge — typing works everywhere.
        </p>
      )}
    </section>
  );
}
