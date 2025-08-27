import ConversationBox from "@/app/_components/features/messages/ConversationBox";
import PostSummaryPopover from "@/app/_components/features/messages/PostSummaryPopover";
import { auth } from "@/app/_lib/authentication/auth";
import {
  mockGetPaginatedConversation,
  mockGetParticipantListResponse,
} from "@/app/_modules/message/__mocks__/message.mocks";
import { mockPost } from "@/app/_modules/post/__mocks__/post.mocks";
import { fetchPostById } from "@/app/_modules/post/post.services";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import ParticipantListByPost from "@/app/_components/features/messages/ParticipantListByPost";
import { SidebarProvider } from "@/app/_components/ui/sidebar";
import {
  getPaginatedConversation,
  getParticipantListByPost,
} from "@/app/_modules/message/message.services";

export default async function MessagesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: LangType; postId: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined | number;
    participantId: string;
    page?: number;
    nextMsgId?: string;
  }>;
}) {
  const session = await auth();
  const { lang, postId } = await params;

  const { page, nextMsgId, participantId } = await searchParams;

  const langPack = await getLanguage(lang);

  const post = await fetchPostById(postId);
  //const post = mockPost; // Mocking the post detail for testing purposes

  // const participantList = mockGetParticipantListResponse;

  // const conversation = await mockGetPaginatedConversation(
  //   postId,
  //   participantId,
  //   page ?? 1,
  //   10,
  //   nextMsgId ?? undefined
  // );

  const participantList = await getParticipantListByPost({ postId });

  const conversation = await getPaginatedConversation(
    postId,
    participantId ?? participantList?.participants[0]?.id ?? "",
    page ?? 1
  );

  if (!post) {
    return <div>{langPack.postNotFound}</div>;
  }

  if (!participantList) {
    return <div>{langPack.noMessages}</div>;
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
  let receiverId = participantList?.participants[0]?.id ?? "";
  const senderId = session?.user.id ?? "";
  if (session && participantId) {
    if (session.user.id === participantId) {
      receiverId = post.postBy.id;
      receiverName = post.postBy.name;
    } else {
      receiverId = participantId;
      receiverName = post.orderRef?.orderBy.name ?? "";
    }
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto w-full h-[80vh]">
        {/* Participant List: left on desktop, top sidebar on mobile */}
        <div className="md:col-span-1 flex flex-col border p-2">
          <PostSummaryPopover post={post} />
          <ParticipantListByPost
            participants={participantList.participants}
            participantId={participantId}
          />
        </div>
        {/* Conversation Box: right on desktop, below on mobile */}
        <div className="md:col-span-3 flex">
          <ConversationBox
            receiverName={receiverName}
            senderId={senderId}
            receiverId={receiverId}
            postId={postId}
            participantId={
              participantId ?? participantList?.participants[0]?.id
            }
            paginatedConversation={conversation}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
