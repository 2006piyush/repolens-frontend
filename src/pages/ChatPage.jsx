import { useParams } from "react-router-dom";
import { ChatView } from "../components/chat/ChatView.jsx";
import { RequireAuth } from "../components/providers/RequireAuth.jsx";

export default function ChatPage() {
  const { repoId } = useParams();
  return (
    <RequireAuth>
      <ChatView repoId={repoId} />
    </RequireAuth>
  );
}
