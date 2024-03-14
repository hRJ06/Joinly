import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
/* https://liveblocks.io/docs/rooms/authentication/access-token-permissions/nextjs */
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret:
    "sk_dev_3bvkZMi1Fm7nfMpzpSA0OmFKpE9Vdl7zaC1JJxjX4PMK9TAKkCRo91BueJnCPL-j",
});

export async function POST(request: Request) {
  // CHECK IF USER IS VALID TO ACCESS A BOARD
  const authorization = await auth();
  const user = await currentUser();
  if (!authorization || !user) {
    return new Response("Unauthenticated", { status: 403 });
  }
  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });
  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }
  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl!,
  };
  const session = liveblocks.prepareSession(user.id, {
    userInfo: userInfo,
  });
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
