import BackBtn from "@/app/_components/common/BackBtn";
import ConversationBox from "@/app/_components/features/messages/ConversationBox";
import PostSummaryPopover from "@/app/_components/features/messages/PostSummaryPopover";
import { auth } from "@/app/_lib/authentication/auth";
import { mockGetPaginatedConversation } from "@/app/_modules/message/__mocks__/message.mocks";
import { getPaginatedConversation } from "@/app/_modules/message/message.services";

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
  // const post = mockPost; // Mocking the post detail for testing purposes
  // const conversation = await mockGetPaginatedConversation(
  //   postId,
  //   participantId,
  //   page ?? 1,
  //   10,
  //   nextMsgId ?? undefined
  // );
  const post = await fetchPostById(postId);
  const conversation = await getPaginatedConversation(
    postId,
    participantId,
    page ?? 1
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
  if (session && post.postBy.auth0Id === session.user.sub) {
    receiverName = post.postBy.name;
  } else {
    receiverName = post.orderRef?.orderBy.name || "Unknown User";
  }
  let receiverId = "";
  let senderId = "";
  if (session && session.user.id === participantId) {
    senderId = session.user.id;
    receiverId = post.postBy.id;
  } else {
    senderId = post.postBy.id;
    receiverId = participantId;
  }

  return (
    <div className="w-full flex flex-col justify-center max-w-6xl mx-auto gap-2 p-4">
      <div className="flex flex-row justify-center gap-6 mb-2">
        <PostSummaryPopover post={post} />
      </div>
      <ConversationBox
        senderId={senderId}
        receiverId={receiverId}
        receiverName={receiverName}
        postId={postId}
        participantId={participantId}
        paginatedConversation={conversation}
      />
      <BackBtn />
    </div>
  );
}
