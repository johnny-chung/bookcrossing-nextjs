import ConversationBox from "@/app/_components/features/messages/ConversationBox";
import PostSummaryPopover from "@/app/_components/features/messages/PostSummaryPopover";
import { auth } from "@/app/_lib/authentication/auth";
import { mockGetPaginatedConversation } from "@/app/_modules/message/__mocks__/message.mocks";
import { mockPost } from "@/app/_modules/post/__mocks__/post.mocks";
import { fetchPostById } from "@/app/_modules/post/post.services";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";

export default async function MessagesPage({
  params,
  searchParams,
}: {
  params: { lang: LangType; postId: string; participantId: string };
  searchParams: {
    [key: string]: string | string[] | undefined | number;
    page?: number;
    nextMsgId?: string;
  };
}) {
  const session = await auth();
  const { lang, postId, participantId } = await params;

  const { page, nextMsgId } = await searchParams;

  const langPack = await getLanguage(lang);

  //const post = await getPostById(postId);
  const post = mockPost; // Mocking the post detail for testing purposes
  const conversation = await mockGetPaginatedConversation(
    postId,
    participantId,
    page ?? 1,
    10,
    nextMsgId ?? undefined
  );

  if (!post) {
    return <div>{langPack.postNotFound}</div>;
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
  if (session && post.postBy.auth0Id === session.user.id) {
    receiverName = post.postBy.name;
  } else {
    receiverName = post.orderRef?.orderBy.name || "Unknown User";
  }

  return (
    <div className="w-full flex flex-col justify-center max-w-6xl mx-auto gap-2 p-4">
      <div className="flex flex-row justify-center gap-6 mb-2">
        <PostSummaryPopover post={post} />
        <p className="text-xl font-semibold">
          {langPack.messagesWith.replace("...", receiverName)}
        </p>
      </div>
      <ConversationBox
        senderId="user1"
        receiverId="user2"
        postId="post1"
        participantId="user2"
        paginatedConversation={conversation}
      />
    </div>
  );
}
