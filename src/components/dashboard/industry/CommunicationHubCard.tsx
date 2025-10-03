import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: number;
  sender: "hr" | "student";
  text: string;
  time: string;
}

const CommunicationHubCard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "student",
      text: "Hello! I have a query regarding the Frontend Developer internship.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "hr",
      text: "Hi! Sure, I'd be happy to help. What would you like to know?",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "student",
      text: "What are the timings for the internship?",
      time: "10:33 AM",
    },
    {
      id: 4,
      sender: "hr",
      text: "The internship follows flexible timings, typically 9 AM to 6 PM with work-from-home options.",
      time: "10:35 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "hr",
          text: newMessage,
          time,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Communication Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[500px]">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.sender === "hr" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={msg.sender === "hr" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                    {msg.sender === "hr" ? "HR" : "ST"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "hr"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === "hr" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="hover:scale-110 transition-transform"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationHubCard;
