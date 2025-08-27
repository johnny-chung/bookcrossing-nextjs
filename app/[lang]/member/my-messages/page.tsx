import ConversationBox from "@/app/_components/features/messages/ConversationBox";
import PostSummaryPopover from "@/app/_components/features/messages/PostSummaryPopover";
import { auth } from "@/app/_lib/authentication/auth";
import {
  mockGetPaginatedConversation,
  mockGetParticipantListByAuth0Id,
  mockGetParticipantListResponse,
} from "@/app/_modules/message/__mocks__/message.mocks";
import { mockPost } from "@/app/_modules/post/__mocks__/post.mocks";
import { fetchPostById } from "@/app/_modules/post/post.services";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import ParticipantListByPost from "@/app/_components/features/messages/ParticipantListByPost";
import ParticipantListByAuth0Id from "@/app/_components/features/messages/ParticipantListByAuth0Id";
import { Sidebar } from "lucide-react";
import { SidebarProvider } from "@/app/_components/ui/sidebar";
import {
  getPaginatedConversation,
  getParticipantListByAuth0Id,
} from "@/app/_modules/message/message.services";

export default async function MyMessagesPage({
  params,
  searchParams,
}: {
  params: { lang: LangType; postId: string };
  searchParams: {
    [key: string]: string | string[] | undefined | number;
    postId: string;
    participantId: string;
    page?: number;
    nextMsgId?: string;
  };
}) {
  const session = await auth();
  const { lang } = await params;

  const { page, nextMsgId, postId, participantId } = await searchParams;

  const langPack = await getLanguage(lang);

  //const post = mockPost; // Mocking the post detail for testing purposes
  //const participantList = mockGetParticipantListByAuth0Id;

  // const conversation = await mockGetPaginatedConversation(
  //   postId,
  //   participantId,
  //   page ?? 1,
  //   10,
  //   nextMsgId ?? undefined
  // );
  const participantList = await getParticipantListByAuth0Id();
  let post, conversation;
  if (participantList?.length > 0) {
    post = await fetchPostById(postId ?? participantList?.[0]?.postId);
    conversation = await getPaginatedConversation(
      postId,
      participantId ?? participantList?.[0]?.participants[0]?.id ?? "",
      page ?? 1
    );
  }

  // comment out for testing purposes

  // Check if the user is authorized to view the messages
  //   if (
  //     !session ||
  //     session.user.id !== post.postBy ||
  //     session.user.id !== participantId
  //   ) {
  //     return <div>{langPack.unauthorized}</div>;
  //   }

  // check name
  let receiverName = "";
  let receiverId = "";
  let senderId = "";
  if (session && participantId && post) {
    if (session.user.id === participantId) {
      senderId = session.user.id;
      receiverId = post.postBy.id;
      receiverName = post.postBy.name;
    } else {
      senderId = post.postBy.id;
      receiverId = participantId;
      receiverName = post.orderRef?.orderBy.name ?? "";
    }
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto w-full h-[80vh]">
        {/* Participant List: left on desktop, top sidebar on mobile */}
        <div className="md:col-span-1 flex flex-col border p-2">
          <ParticipantListByAuth0Id participants={participantList} />
        </div>
        {/* Conversation Box: right on desktop, below on mobile */}
        <div className="md:col-span-3 flex">
          {conversation ? (
            <ConversationBox
              receiverName={receiverName}
              senderId={senderId}
              receiverId={receiverId}
              postId={postId}
              participantId={
                participantId ?? participantList?.[0]?.participants[0]?.id
              }
              paginatedConversation={conversation}
            />
          ) : (
            <p>{langPack.noMessages}</p>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
